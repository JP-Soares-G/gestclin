import React, { useState } from 'react'
import OneSignal from 'react-native-onesignal'
import Input from '../../components/Input'
import Button from '../../components/Button'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { BackButton, Container, Header, Title, Wrapper } from './styles'
import axios from 'axios'
import { ScrollView } from 'react-native'
import Succeed from '../Succeed'

const Maintenance = (props) => {

    const [message, setMessage] = useState("")
    const [title, setTitle] = useState("")
    
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
                    <Input value={title} onChangeText={setTitle} label="Nome" placeholder='Adicione seu nome.' />
                    <Input 
                        // style={{marginBottom: 32}} 
                        value={message} 
                        onChangeText={setMessage} 
                        label="Telefone"  
                        keyboardType='phone-pad' 
                        placeholder='Adicione seu numero de telefone' />
                    <Input label="Situação" placeholder="Ativo" />
                    <Input label="Email" keyboardType='email-address' placeholder="Digite seu email" />
                    <Input label="Numero OS" placeholder="123456" />
                    <Input label="Hospital" placeholder="HU-UFS" />
                    <Input multiline={true} numberOfLines={4} style={{marginBottom: 32}}  label="Descrição" placeholder="Digite a descrição do problema" />

                    <Button title='Enviar' onPress={() => {props.navigation.navigate("Succeed")}} />
                </Wrapper>
            </ScrollView>
        </Container>
    )
}

export default Maintenance