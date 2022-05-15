import React, { useState } from 'react'
import OneSignal from 'react-native-onesignal'
import Input from '../../components/Input'
import Button from '../../components/Button'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { BackButton, Container, Header, Title, Wrapper } from './styles'
import axios from 'axios'
import {BASE_URL, REST_API_KEY, APP_ID} from '@env'

const AlertForm = (props) => {

    const [message, setMessage] = useState("Teste 10:46")
    const [title, setTitle] = useState("Admin")
    

    const sendNewNotification = () => {
        const header = {
            headers: {
                Authorization: `Basic ${REST_API_KEY}`
            }
        }

        const msgSettings = {
            app_id: `${APP_ID}`,
            contents: {en: message},
            headings: {en: title},
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

        axios.post(`${BASE_URL}`, 
            msgSettings,
            header
        )
        .then(res => {
            alert("Alerta cadastrado com sucesso. Aguarde alguns segundos até que a mensagem seja disparada.")
            props.navigation.goBack()
        })
        .catch(res => alert("Algo deu errado... Tente novamente mais tarde."))
        
    }

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
                    style={{marginBottom: 32}} 
                    value={message} 
                    onChangeText={setMessage} 
                    label="Descrição" 
                    placeholder='Adicione uma descrição' />
                <Button onPress={sendNewNotification} title='Criar' />
            </Wrapper>
        </Container>
    )
}

export default AlertForm