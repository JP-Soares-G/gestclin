import React, { useEffect, useState } from 'react'
import OneSignal from 'react-native-onesignal'
import Input from '../../components/Input'
import Button from '../../components/Button'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { BackButton, Container, Header, Title, Wrapper } from './styles'
import axios from 'axios'
import { BASE_URL, REST_API_KEY, APP_ID } from '@env'
import { Alert, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { Text } from '../Login/styles'
import api from '../../services/api'
import KeyChain, { SharedWebCredentials, UserCredentials } from "react-native-keychain"
import { ButtonContainer } from '../Dashboard/styles'
import CheckBox from '@react-native-community/checkbox';

const AlertForm = (props) => {

    const [message, setMessage] = useState("Teste")
    const [title, setTitle] = useState("Admin")
    const [timeoutID, setTimeoutID] = useState(null)
    const [filterBankList, setFilterBankList] = useState([]);
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const sendNewNotification = async () => {
        setIsLoading(true)
        const dt = new Date();
        const envio = dt.toJSON().split("-")
        .reverse().map((x,i) => i == 0 ? x.substring(0,2) : x)
        .join('/') +" "+ dt.toLocaleTimeString('pt-BR');
        const {username} = await KeyChain.getGenericPassword() as {username: string};
        const msg = { 
            titulo: title,
            descricao: message, 
            envio: envio,
            cadastradoPor: username,
            usuariosRecebem: filterBankList
        }
        console.log(msg)
        try { 
            await api.post("/alertas", msg)
            Alert.alert('Sucesso', "O alerta foi cadastrado na base de dados!")
            props.navigation.goBack()
        }
        catch(errors) { 
            console.log(JSON.stringify(errors))
            let { error, message } = errors.response.data || {error:"Erro", message:"Erro inesperado"}
            Alert.alert(error, message)
        }

        const header = {
            headers: {
                Authorization: `Basic ${REST_API_KEY}`
            }
        }

         const msgSettings = {
             app_id: `${APP_ID}`,
             contents: { en: message },
             headings: { en: title },
             data: {
                 sec: new Date().getSeconds(),
                 day: new Date().getDay(),
                 month: new Date().getMonth(),
                 year: new Date().getFullYear(),
                 hour: new Date().getHours(),
                 min: new Date().getMinutes(),
                 succeed: false
             },
             included_segments: ["Subscribed Users"]
         }

          await axios.post(`${BASE_URL}`,
              msgSettings,
              header
          )
              .then(res => {
                  alert("Alerta cadastrado com sucesso. Aguarde alguns segundos até que a mensagem seja disparada.")
                  props.navigation.goBack()
              })
            //   .catch(res => alert("Algo deu errado... Tente novamente mais tarde."))
          setIsLoading(false)



    }

    const [clicou, setClicou] = useState(false)

    useEffect(() => {
        if(clicou == true) return;
        clearTimeout(timeoutID);
        setTimeoutID(setTimeout(() => {
            filterBanks(name);
        }, 500));
        return () => clearTimeout(timeoutID);
    }, [name])

    const filterBanks = async value => {
        if(value === "") return;
        try {
            const { password } = await KeyChain.getInternetCredentials("Cookie") as {password:string}
            const { data } = await api.get(`/consulta/solicitante?nome=${value}`,
           {
               headers: { Cookie: password }
           })
           setFilterBankList(data);
        } catch(errors) { 
            console.log(errors.response.data)
          let { error, msg } = errors.response.data
          Alert.alert("Erro!", msg + "\n Tente novamente")
          if(msg == "Cookie inválido") {
              const {username, password} = await KeyChain.getGenericPassword() as UserCredentials;
 
              const {headers} = await api.post("/login", {email: username, senha:password}, {withCredentials:true})

              await KeyChain.setInternetCredentials("Cookie", "Cookie", headers.cookie)
          }
        }
        
    }

    const onBankSelected = value => {
        setName(value);
        setFilterBankList([]); 
    };

    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    return (
        <Container>
            <Header>
                <BackButton onPress={() => props.navigation.goBack()}>
                    <SimpleLineIcons name="arrow-left" size={20} color="#000" />
                </BackButton>
                <Title>Criar Alerta</Title>
            </Header>
            <Wrapper>
                <Input value={title} onChangeText={setTitle} label="Titulo" placeholder='Adicione um titulo. Ex.: Administrador' />
                <Input
                    multiline={true}
                    numberOfLines={4}
                    style={{ marginBottom:0 }}
                    value={message}
                    onChangeText={setMessage}
                    label="Descrição"
                    placeholder='Adicione uma descrição' />

                <Input autoCapitalize={"characters"}
                    value={name}
                    label="Nome completo de quem recebe"
                    placeholder="Iniciais do nome (completa automático)"
                    onChangeText={(v) => { setName(v) ; setClicou(false)}}
                />
                <FlatList
                    data={filterBankList}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity 
                            onPress={() => { onBankSelected(item), setClicou(true); setFilterBankList([item])}}>
                            <Text style={{marginLeft: 25, paddingBottom:30, fontSize:14, backfaceVisibility: 'visible'}}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                />


                <Button isLoading={isLoading} 
                style={{marginTop:30}} onPress={sendNewNotification} title='Criar' />
            </Wrapper>
        </Container>
    )
}

export default AlertForm