import React, { useState } from 'react'
import { Alert, ScrollView } from 'react-native'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { Container, Subtitle, Title, Wrapper } from './styles'


import api from '../../services/api'

import KeyChain, { UserCredentials } from "react-native-keychain"

async function save(key, value) {
}

const Login = props => {
  const [email, setEmail] = useState("juanbomfim22@academico.ufs.br")
  const [senha, setSenha] = useState("pjJr&fnhCopq") 
  const [isLoading, setIsLoading] = useState(false);

  const onLoginPressed = async () => {
    if (email.length == 0 || senha.length == 0) {
      return Alert.alert("Erro", "Preencha os campos")
    };
    setIsLoading(true)

    try {
      console.log(`Logging with: ${email} ${senha} `)
      const { headers } = await api.post("/login", { email, senha })

      await KeyChain.setInternetCredentials("Cookie", "Cookie", headers.cookie)
      await KeyChain.setGenericPassword(email, senha)

      async function run() {
        const { username } = await KeyChain.getGenericPassword() as UserCredentials; 
        const { data } = await api.get(`/usuarios/busca?email=${username}`)
        console.log("DATA:", data)
        await KeyChain.setInternetCredentials("NOME", "NOME", data.nome)
        await KeyChain.setInternetCredentials("INFOS", "INFOS", JSON.stringify(
          {
            id: data.id,
            nome: data.nome,
            telefone: data.telefone,
            perfis: data.perfis,
          }))
      }
      await run();
      props.navigation.navigate("Home");

    } catch (errors) {
      let { error, message } = errors.response.data
      console.log(errors.response)
      // Alert.alert(error, message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ScrollView horizontal={false} style={{ flex: 1 }} keyboardDismissMode='interactive' keyboardShouldPersistTaps='handled'
      contentContainerStyle={{ flexGrow: 1 }}>
      <Container>
        <Wrapper>
          <Title>Login</Title>
          <Subtitle>Seja bem-vindo!</Subtitle>
          <Input value={email} onChangeText={text => setEmail(text.trim())} label="email" placeholder="Digite seu Email" />
          <Input value={senha} onChangeText={text => setSenha(text)} label="senha" placeholder="Digite sua Senha" />
          <Button disabled={isLoading} isLoading={isLoading} onPress={onLoginPressed} style={{ marginTop: 32, marginBottom: 32 }} title="Entrar" />
        </Wrapper>
      </Container>
    </ScrollView>
  )
}

export default Login