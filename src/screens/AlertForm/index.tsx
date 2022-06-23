import React, { useEffect, useState } from 'react'
import OneSignal from 'react-native-onesignal'
import Input from '../../components/Input'
import Button from '../../components/Button'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { BackButton, Container, Header, Title, Wrapper } from './styles'
import axios from 'axios'
import { BASE_URL, REST_API_KEY, APP_ID } from '@env'
import { Alert, FlatList, TextInput, TouchableOpacity, View } from 'react-native'
import { Text } from '../Login/styles'
import api from '../../services/api'
import KeyChain, { SharedWebCredentials, UserCredentials } from "react-native-keychain"
import { ButtonContainer } from '../Dashboard/styles'
import { PickerLabel } from '../Maintenance/styles'
import { Checkbox } from 'react-native-paper'
import { Selection } from '../../components/SelectionBox/style'
import SelectionBox from '../../components/SelectionBox'



const AlertForm = (props) => {

    const [title, setTitle] = useState("Atenção")
    const [message, setMessage] = useState("O aparelho crítico COLONOSCOPIO foi consertado")
    const [name, setName] = useState('Usuário');
    const [timeoutID, setTimeoutID] = useState(undefined)
    const [receptores, setReceptores] = useState(new Set<string>());
    const [isLoading, setIsLoading] = useState(false)

    const tryNotification = async () => {
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
                alert("Aguarde alguns segundos até que a mensagem seja disparada.")
                props.navigation.goBack()
            })
            .catch(res => alert("Algo deu errado... Tente novamente mais tarde."))

    }
    const sendNewNotification = async () => {
        setIsLoading(true)
        const dt = new Date();
        const envio = dt.toJSON().split("-")
            .reverse().map((x, i) => i == 0 ? x.substring(0, 2) : x)
            .join('/') + " " + dt.toLocaleTimeString('pt-BR');
        const { username } = await KeyChain.getGenericPassword() as { username: string };
 

        const msg = {
            titulo: title,
            descricao: message,
            envio: envio,
            cadastradoPor: username,
            usuariosRecebem: [...receptores],
            critico: checked
        }
 


        let mensagem = "", titulo = "";
        try {
            await api.post("/alertas", msg)
            titulo = "Sucesso!"
            mensagem = "O alerta foi cadastrado na base de dados!"
        }
        catch (errors) {
            console.log(JSON.stringify(errors))
            let { error, message } = errors.response.data || { error: "Erro", message: "Erro inesperado" }
            titulo = error;
            mensagem = message;
        }
        Alert.alert(mensagem, titulo)
        props.navigation.goBack()
        await tryNotification();
        setIsLoading(false)
    }



    const [checked, setChecked] = useState(false)

    const [items, setItems] = useState([] as { nome: string, value: string }[])


    const handlePress = (value) => {
        setName(value);
        setReceptores(receptores.add(value));
    }

    const [isLoadingSolicitantes, setIsLoadingSolicitantes] = useState(false)

    useEffect(() => {
        async function render() {
            try {
                setIsLoadingSolicitantes(true)
                const { data } = await api.get('/consulta/solicitante')
                const { query } = data;
                setItems(query)
                setIsLoadingSolicitantes(false)
            } catch {

            }
        }
        render();
    }, [])


    const handlePressX = (item, remove) => { 
        if(remove){
            setReceptores((receptores.delete(item.nome), receptores))
        } else {
            setReceptores(receptores.add(item.nome)) 
        } 
    }


    return (
        <Container>
            <Header style={{ zIndex: 99999 }}>
                <BackButton onPress={() => props.navigation.goBack()}>
                    <SimpleLineIcons name="arrow-left" size={20} color="#000" />
                </BackButton>
                <Title>Criar Alerta</Title>
            </Header>
            <View style={{}}>
                <Wrapper>
                    <Input value={title} onChangeText={setTitle} label="Titulo" placeholder='Adicione um titulo. Ex.: Administrador' />
                    <Input
                        multiline={true}
                        numberOfLines={4}
                        style={{ marginBottom: 0 }}
                        value={message}
                        onChangeText={setMessage}
                        label="Descrição"
                        placeholder='Adicione uma descrição' />

                    <SelectionBox handlePress={handlePressX} loading={isLoadingSolicitantes} label="Usuários para envio" items={items} multiselect={true} setItems={setItems} />


                    <PickerLabel style={{ paddingTop: 16 }}>Alerta crítico</PickerLabel>
                    <Checkbox uncheckedColor='#e50000'
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                        color={"#e50000"}
                    />



                    <Button isLoading={isLoading}
                        style={{ marginTop: 30 }} onPress={sendNewNotification} title='Criar' />
                </Wrapper>
            </View>
        </Container>
    )
}

export default AlertForm