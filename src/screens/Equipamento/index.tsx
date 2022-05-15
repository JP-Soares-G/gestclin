import React, { useState } from 'react'
import OneSignal from 'react-native-onesignal'
import Input from '../../components/Input'
import Button from '../../components/Button'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { BackButton, Container, Header, Title, Wrapper } from './styles'
import axios from 'axios'

const AlertForm = (props) => {

    return (
        <Container>
            <Header>
                <BackButton 
                   // onPress={() => props.navigation.goBack()}
                >
                    <SimpleLineIcons name="arrow-left" size={20} color="#000" />
                </BackButton>
                <Title>Equipamento X</Title>
            </Header>
            <Wrapper>
            </Wrapper>
        </Container>
    )
}

export default AlertForm