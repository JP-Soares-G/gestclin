import React, { useState } from 'react'
import { Container, Subtitle, Text, Title, Wrapper } from './styles'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { View, Alert, ScrollView, ActivityIndicator } from 'react-native'

import HomeTab from '../../routes/HomeTab'

import api from '../../services/api'
import axios from 'axios'

import KeyChain from "react-native-keychain"

async function save(key, value) { 
}

const Login = props => {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const onLoginPressed = async () => { 
        if(email.length == 0 || senha.length == 0) {
            return Alert.alert("Erro", "Preencha os campos")
        }; 
        setIsLoading(true)

        try {
          const {headers} = await api.post("/login", {email, senha}, {withCredentials:true})

          await KeyChain.setInternetCredentials("Cookie", "Cookie", headers.cookie)
          await KeyChain.setGenericPassword(email, senha)
          
          props.navigation.navigate("Home");

        } catch(errors) { 
          let { error, message } = errors.response.data
          Alert.alert(error, message)
        } finally {
          setIsLoading(false)
        }
      }

    return (
        <ScrollView horizontal={false} style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
            <Container>
                <Wrapper>
                    <Title>Login</Title>
                    <Subtitle>Bem-Vindo de volta!</Subtitle>
                    <Input value={email} onChangeText={text => setEmail(text)} label="Email" placeholder="Digite seu Email" />
                    <Input value={senha} onChangeText={text => setSenha(text)} secureTextEntry={true} label="Senha" placeholder="Digite sua Senha" />
                    <Button isLoading={isLoading} onPress={onLoginPressed} style={{marginTop: 32, marginBottom: 32}} title="Entrar" />
                </Wrapper>
            </Container>
        </ScrollView>
    )
}

export default Login