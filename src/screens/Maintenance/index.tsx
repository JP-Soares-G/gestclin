import React, { useState } from 'react'
import OneSignal from 'react-native-onesignal'
import Input from '../../components/Input'
import Button from '../../components/Button'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { BackButton, Container, Header, PickerContainer, PickerLabel, Title, Wrapper } from './styles'
import { ScrollView } from 'react-native'
import { Picker } from '@react-native-picker/picker'

const Maintenance = (props) => {

    const [message, setMessage] = useState("")
    const [title, setTitle] = useState("")
    const [selectedSituation, setSelectedSituation] = useState()
    const [equipLocation, setEquipLocation] = useState()
    const [priority, setPriority] = useState()
    const [symptoms, setSymptoms] = useState()
    
    
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

    return (
        <Container>
            <Header>
                <BackButton onPress={() => props.navigation.goBack()}>
                    <SimpleLineIcons name="arrow-left" size={20} color="#000" />
                </BackButton>
                <Title>Manutenção Corretiva</Title>
            </Header>
            <ScrollView>
                <Wrapper>
                    <Input value={title} onChangeText={setTitle} label="Solicitante" placeholder='Adicione seu nome.' />
                    <Input 
                        // style={{marginBottom: 32}} 
                        value={message} 
                        onChangeText={setMessage} 
                        label="Telefone"  
                        keyboardType='phone-pad' 
                        placeholder='Adicione seu numero de telefone' />
                    <Input label="Equipamento" placeholder="Informe o número de serie" />
                    <PickerContainer >
                        <PickerLabel>Localização do Equipamento</PickerLabel>
                        <Picker selectedValue={equipLocation} onValueChange={setEquipLocation} style={{backgroundColor: "#E5E5E5"}}>
                            <Picker.Item label="US (Unidade de Saúde)" value="US (Unidade de Saúde)Ativo" />
                            <Picker.Item label="NEC (Núcleo de Engenharia Clínica)" value="NEC (Núcleo de Engenharia Clínica)" />
                        </Picker>
                    </PickerContainer>
                    <PickerContainer>
                        <PickerLabel>Situação do Equipamento</PickerLabel>
                        <Picker selectedValue={selectedSituation} onValueChange={setSelectedSituation} style={{backgroundColor: "#E5E5E5"}}>
                            <Picker.Item label="Parado" value="Parado" />
                            <Picker.Item label="Em Uso Parcial/Normal" value="Em Uso Parcial/Normal" />
                        </Picker>
                    </PickerContainer>
                    <Input label="Localização Física" placeholder="Localização Física (obrigatório se estiver na US)" />
                    <PickerContainer>
                        <PickerLabel>Prioridade</PickerLabel>
                        <Picker selectedValue={priority} onValueChange={setPriority} style={{backgroundColor: "#E5E5E5"}}>
                            <Picker.Item label="Normal" value="Normal" />
                            <Picker.Item label="Baixa" value="Baixa" />
                            <Picker.Item label="Urgente" value="Urgente" />
                        </Picker>
                    </PickerContainer>
                    <Input label="Responsável" placeholder="Informe o responsável" />
                    <PickerContainer>
                        <PickerLabel>Sintomas</PickerLabel>
                        <Picker selectedValue={symptoms} onValueChange={setSymptoms} style={{backgroundColor: "#E5E5E5"}}>
                            {sintomas.map(sintoma => {
                                return (
                                    <Picker.Item key={sintoma} label={sintoma.toUpperCase()} value={sintoma} />
                                )
                            })}
                        </Picker>
                    </PickerContainer>
                    <Input multiline={true} numberOfLines={4} style={{marginBottom: 32}}  label="Informações Adicionais" placeholder="Digite a descrição do problema" />

                    <Button title='Enviar' onPress={() => {props.navigation.navigate("Succeed")}} />
                </Wrapper>
            </ScrollView>
        </Container>
    )
}

export default Maintenance