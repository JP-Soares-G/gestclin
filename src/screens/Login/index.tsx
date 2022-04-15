import React from 'react'
import { Container, Subtitle, Text, Title, Wrapper } from './styles'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { ScrollView } from 'react-native'

const Login = props => {
    return (
        <ScrollView horizontal={false} style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
            <Container>
                <Wrapper>
                    <Title>Login</Title>
                    <Subtitle>Bem-Vindo de volta!</Subtitle>
                    <Input label="Email" placeholder="Digite seu Email" />
                    <Input label="Senha" placeholder="Digite sua Senha" />
                    <Button onPress={() => props.navigation.navigate("Home")} style={{marginTop: 32, marginBottom: 32}} title="Entrar" />
                </Wrapper>
            </Container>
        </ScrollView>
    )
}

export default Login