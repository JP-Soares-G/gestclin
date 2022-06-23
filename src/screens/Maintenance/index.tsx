import React, { useEffect, useState } from 'react'
import OneSignal from 'react-native-onesignal'
import Input from '../../components/Input'
import Button from '../../components/Button'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { BackButton, BaseToastCustom, ButtonContainer, ButtonText, Container, Header, PickerContainer, PickerLabel, Title, Wrapper } from './styles'
import { Alert, FlatList, Platform, ScrollView, StyleSheet, Text, TextProps, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { RadioButton } from 'react-native-paper';
import { InputText } from '../../components/Input/style'
import api from '../../services/api'
import KeyChain, { UserCredentials } from 'react-native-keychain'
import Autocomplete from 'react-native-autocomplete-input'
import SelectionBox from '../../components/SelectionBox'
import Toast, { BaseToast, BaseToastProps, ErrorToast, ToastConfig, ToastConfigParams, ToastProps } from 'react-native-toast-message';
import { useToast } from "react-native-toast-notifications";
import { Obj } from '../../components/Input'

import MatCommIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Maintenance = (props) => {
    const [solicitante, setSolicitante] = useState("")
    const [telefone, setMessage] = useState("")
    const [comOuSem, setComOuSem] = useState('first');
    const [selectedSituation, setSelectedSituation] = useState("0")
    const [equipLocation, setEquipLocation] = useState("0")
    const [priority, setPriority] = useState("0")
    const [symptoms, setSymptoms] = useState("0")
    const [responsavel, setResponsavel] = useState('')
    const [semIdentificacao, setSemIdentificacao] = useState("")
    const [localizacao, setLocalizacao] = useState('')
    const [descricao, setDescricao] = useState('')
    const [equipamento, setEquipamento] = useState('')
    const [orgao, setOrgao] = useState('')
    const [quantidade, setQuantidade] = useState("")

    const [queryEquipamento, setQueryEquipamento] = useState([] as string[])
    const [queryOrgao, setQueryOrgao] = useState([] as string[])
    const [querySolicitante, setQuerySolicitante] = useState([] as string[])

    const [objChanges, setObjChanges] = useState({
        messages: {
            errors: [],
            infos: []
        },
        acOrgao: "",
        txtQtd: "",
        txtLocal: ""
    } as Obj)

    const equipamentoSemIdentificacao = [
        "BRACADEIRA",
        "CABO-TERMINAL ECG",
        "CABO-TERMINAL EEG",
        "CABO-TERMINAL EMG",
        "CABO-TERMINAL TENS",
        "CANETA UEC",
        "CARRO EQUIPAMENTO",
        "CIRCUITO RESPIRATORIO ANESTESIA",
        "CIRCUITO RESPIRATORIO VENTILADOR",
        "ELETRODO",
        "ESTETOSCOPIO MECANICO",
        "MANGUEIRA INTERMEDIARIA PNI",
        "NOBREAK",
        "PLACA UEC",
        "PRENDEDOR-FIXADOR PARTE MOVEL MESA",
        "RECIPIENTE COLETOR-ASPIRADOR",
        "SENSOR CO2 EXALADO",
        "SENSOR OXIMETRO PULSO",
        "SENSOR TEMPERATURA",
        "SUPORTE",
        "TERMOMETRO ELETRONICO",
        "TRANSDUTOR US",
        "VALVULA REGULADORA"
    ]

    const sintomas = ["abaixo ou acima do nível",
        "alarme",
        "bateria",
        "cabo",
        "cheiro de queimado",
        "descalibrado / desregulado",
        "desencaixado",
        "enroscando / emperrando",
        "entupido / emperrando",
        "funcionamento irregular",
        "furado / rasgado",
        "lâmpada / luz",
        "mau contato",
        "mensagem",
        "molhado",
        "não abre / não fecha",
        "não aquece / não resfria",
        "não aspira",
        "não cicla",
        "não comunica / não conecta",
        "não controla",
        "não fixa",
        "não funciona",
        "não liga",
        "não movimenta",
        "não registra",
        "não veda",
        "obsoleto / para desativação",
        "oscilando",
        "oxidado / enferrujado, descascado",
        "passagem direta",
        "peça / parte danificada",
        "peça / parte faltando",
        "peça / parte solta",
        "quebrado",
        "reinstalação / mudança de local",
        "ruído / interferência",
        "sem fluxo / vazão",
        "sem foco",
        "sem imagem / sinal / som / impressão",
        "sem pressão",
        "sensor",
        "sinal / imagem / registro incorreto",
        "temperatura",
        "travado",
        "vazamento"
    ]

    const setTelefone = (x) => {
        x = x.replace(/\D/g, "");
        x = x.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
        x = x.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
        setMessage(x)
    }

    const toast = useToast();

    const sendForm = async () => {
        const msg = {
            "tipoOS": 2,
            "prioridade": (priority),
            "estadoOS": (selectedSituation),
            "localizacao": localizacao,
            "localizacaoFisica": equipLocation,
            "nomeEquipamento": equipamento,
            "responsavel": responsavel,
            "telefone": telefone,
            "equipamento": semIdentificacao,
            "sintomas": symptoms,
            "informacoesAdicionais": descricao,
            "solicitante": solicitante
        }
        console.log(msg)


        try {
            const { username } = await KeyChain.getGenericPassword() as UserCredentials;
            const { data } = await api.post("/os?email=" + username, msg)
            console.log(data)
            props.navigation.navigate("Succeed");

        } catch (e) {
            console.log(JSON.stringify(e))
            Alert.alert("Algum erro ocorreu", "Tente novamente mais tarde")
        }
    }

    useEffect(() => {
        const run = async () => {
            const { password: obj } = await KeyChain.getInternetCredentials("INFOS") as UserCredentials
            const { nome, telefone } = JSON.parse(obj)
            setSolicitante(nome)
            setTelefone(telefone)
            setIsEnabledSoli(false)
        }
        run();
    }, [])

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    useEffect(()=>{
        if(priority === "2") {
            toast.show("Justificar urgência no último campo", {
                icon: <MatCommIcons name="alert-box" size={18} style={{ color: "#bec055" }} />,
                type: "warning",
                warningColor: "#faf6e2",
                placement: "bottom",
                duration: 5000,
                animationType: "slide-in",
                textStyle: {
                    fontFamily: "Roboto-Medium",
                    color: "#bec055"
                }
            })
        }

    }, [priority]);

    useEffect(()=>{
        if(equipLocation === "1") {
            setSelectedSituation("0")
        }
    }, [equipLocation])

    useEffect(() => {
        async function showToasts() {

            const { acOrgao, txtQtd, txtLocal, messages } = objChanges;
            const { errors, infos } = messages;
            if (acOrgao !== "") {
                setOrgao(acOrgao)
                setIsEnabledOrg(false)
            }
            if (txtQtd !== "") {
                setQuantidade(txtQtd) 
            }
            if (txtLocal !== "") {
                setEquipLocation(txtLocal)
            }
            for (let error of errors) {
                toast.show(error, {
                    icon: <MaterialIcons name="dangerous" size={18} style={{ color: "#bc5351" }} />,
                    type: "danger",
                    placement: "bottom",
                    duration: 5000,
                    animationType: "slide-in",
                    textStyle: {
                        fontFamily: "Roboto-Medium",
                        color: "#bc5351"
                    }
                })
                await wait(600)

            }
            for (let info of infos) {
                toast.show(info, {
                    icon: <FontAwesome5 name={"info-circle"} size={18} style={{ color: "#408bb0" }} />,
                    type: "normal",
                    placement: "bottom",
                    duration: 5000,
                    animationType: "slide-in",
                    textStyle: {
                        fontFamily: "Roboto-Medium",
                        color: "#408bb0"
                    }
                })
                await wait(600)
            }
        }
        showToasts();
    }, [objChanges])


    const [isEnabledSoli, setIsEnabledSoli] = useState(true)
    const [isEnabledOrg, setIsEnabledOrg] = useState(true)
    const [isEnabledEquip, setIsEnabledEquip] = useState(true)


    return (
        <>
            <Container>
                <Header>
                    <BackButton onPress={() => props.navigation.goBack()}>
                        <SimpleLineIcons name="arrow-left" size={20} color="#000" />
                    </BackButton>
                    <Title>Manutenção Corretiva</Title>

                </Header>

                <ScrollView nestedScrollEnabled
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="interactive"
                >

                    <Wrapper >
                        <Input value={solicitante} onChangeText={setSolicitante}
                            setIsEnabled={setIsEnabledSoli}
                            isEnabled={isEnabledSoli}
                            items={querySolicitante} setItems={setQuerySolicitante}
                            label="solicitante" procurePor="solicitante" placeholder='Adicione seu nome' />


                        <Input value={telefone}
                            onChangeText={setTelefone}
                            label="Telefone*"
                            keyboardType='phone-pad'
                            maxLength={15}
                            placeholder='Adicione seu numero de telefone' />


                        <PickerLabel>Equipamento</PickerLabel>
                        <RadioButton.Group onValueChange={setComOuSem} value={comOuSem}>
                            <RadioButton.Item style={{ paddingRight: 180, paddingLeft: 0 }} color='rgba(0,0,0,0.8)' position='leading' label="COM identificação " value="first" />
                            <RadioButton.Item style={{ paddingRight: 180, paddingLeft: 0 }} color='rgba(0,0,0,0.8)' position='leading' label="SEM identificação*" value="second" />
                        </RadioButton.Group>

                        <Input multiline={true} style={{ display: comOuSem == "first" ? undefined : 'none' }}
                            label="equipamento" 
                            procurePor="equipamento"
                            value={equipamento} onChangeText={setEquipamento}
                            items={queryEquipamento} setItems={setQueryEquipamento}
                            isEnabled={isEnabledEquip} setIsEnabled={setIsEnabledEquip}
                            setObjChanges={setObjChanges}
                            placeholder="Identificador (Patrimônio, ID, TAG)"
                        />

                        <PickerContainer style={{ marginTop: -18, display: comOuSem != "first" ? undefined : 'none' }} >
                            <Picker mode="dropdown" selectedValue={semIdentificacao} onValueChange={setSemIdentificacao} style={{ backgroundColor: "#E5E5E5" }}>
                                {equipamentoSemIdentificacao.map(eq => {
                                    return (
                                        <Picker.Item key={eq} label={eq} value={eq} />
                                    )
                                })}
                            </Picker>
                        </PickerContainer>

                        <Input maxLength={5} editable={comOuSem !== "first"}
                            value={comOuSem !== "first" ? quantidade : ""} onChangeText={setQuantidade} keyboardType='numeric'
                            label="quantidade*" placeholder="Quantidade (para equip. s/ identificação)" />
                        <PickerContainer>
                            <PickerLabel>Localização do Equipamento</PickerLabel>
                            <Picker mode="dropdown" selectedValue={equipLocation} onValueChange={setEquipLocation} style={{ backgroundColor: "#E5E5E5" }}>
                                <Picker.Item label="US (Unidade de Saúde)" value="0" />
                                <Picker.Item label="NEC (Núcleo de Engenharia Clínica)" value="1" />
                            </Picker>
                        </PickerContainer>

                        <PickerContainer>
                            <PickerLabel>Situação do Equipamento*</PickerLabel>
                            <Picker mode="dropdown" selectedValue={selectedSituation} onValueChange={setSelectedSituation} style={{ backgroundColor: "#E5E5E5" }}>
                                <Picker.Item label="Parado" value="0" />
                                <Picker.Item label="Em Uso Parcial/Normal" value="1" />
                            </Picker>
                        </PickerContainer>
                        <Input value={orgao} onChangeText={setOrgao} items={queryOrgao} setItems={setQueryOrgao}
                            label="órgão" procurePor="orgao" placeholder="US / Órgão"
                            setIsEnabled={setIsEnabledOrg} isEnabled={isEnabledOrg} />



                        <Input value={localizacao}
                            label="localização" placeholder="Localização (Obrigatório se estiver na US)" onChangeText={setLocalizacao} />
                        <PickerContainer>
                            <PickerLabel>Prioridade</PickerLabel>
                            <Picker mode="dropdown" selectedValue={priority} onValueChange={setPriority} style={{ backgroundColor: "#E5E5E5" }}>
                                <Picker.Item label="Baixa" value="0" />
                                <Picker.Item label="Normal" value="1" />
                                <Picker.Item label="Urgente" value="2" />
                            </Picker>
                        </PickerContainer>
                        <Input
                            value={responsavel}
                            onChangeText={setResponsavel}
                            label="Responsável*"
                            placeholder="Informe o responsável" />
                        <PickerContainer>
                            <PickerLabel>Sintomas*</PickerLabel>
                            <Picker mode="dropdown" selectedValue={symptoms} onValueChange={setSymptoms} style={{ backgroundColor: "#E5E5E5" }}>
                                {sintomas.map(sintoma => {
                                    return (
                                        <Picker.Item key={sintoma} label={sintoma.toUpperCase()} value={sintoma} />
                                    )
                                })}
                            </Picker>
                        </PickerContainer>
                        <Input textAlignVertical='top'
                            maxLength={128} value={descricao} multiline={true} onChangeText={setDescricao} numberOfLines={3} label="Informações Adicionais" placeholder="Digite a descrição do problema" />

                        <Button style={{ marginTop: 20, marginBottom: 20 }} title='Enviar' onPress={sendForm} />
                    </Wrapper>
                </ScrollView>
            </Container>
            {/* <Toast type="error" config={toastConfig} /> */}
            <Toast config={toastConfig} position="bottom" bottomOffset={10} />
        </>
    )
}

const toastConfig: ToastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    error: (props) => (
        <BaseToastCustom
            {...props}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 16,
                fontFamily: "Roboto-Regular",
                fontWeight: '400'
            }}
            text2NumberOfLines={3}
            text2Style={{
                fontSize: 14,
                fontFamily: "Roboto-Regular",
                fontWeight: '400',

            }}
        />
    ),
}

export default Maintenance