import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, ScrollView, ToastAndroid, TouchableOpacity, View } from "react-native";
import AlertItem from "../../components/AlertItem";
import { CleanButtonContainer, CleanButtonText, Container, Header, PlusButton, Title, TitleWrapper } from "./styles";
import AntDesing from 'react-native-vector-icons/AntDesign'
import axios from 'axios'
import { BASE_URL, REST_API_KEY, APP_ID } from '@env'
import api from "../../services/api";
import KeyChain, { SharedWebCredentials, UserCredentials } from "react-native-keychain"
import Toast from 'react-native-toast-message';
import Button from "../../components/Button";
import { BackButton } from "../AlertForm/styles";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { Text, Wrapper } from "../Login/styles";
import OS from "../../components/OS";
import { ButtonContainer } from "../Dashboard/styles";
import Input from "../../components/Input";
import Equip from "../../components/Equip";

import MatCommIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Message } from "../../components/AlertItem/styles";



const ConsultEquip = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState("");
    const [equip, setEquip] = useState([]);

    useEffect(() => {
        const time = setTimeout(() => {
            if (name === "") {
                setEquip([])
            } else {
                console.log("Name: "+ name)
                render();
            }
        }, 1000);

        return () => clearTimeout(time);
    }, [name]);

    const render = async () => {
        try {
            console.log("RE" + name)
            setIsLoading(true)
            const { data } = await api.get("/consulta/equipamento?nome=" + name)
            if(data.resultado === []) {
                setEquip(["Nenhum equipamento encontrado"])
            }
            
            setEquip(data.resultado)
            setIsLoading(false)
            // // console.log(data)
        } catch (errors) {
            console.log(Object.keys(errors))
            console.log(errors.response)
        }


    }
    const renderItem = ({ item, index }) => (

        <Equip dados={item}></Equip>
    );



    return (
        <Container>
           <Header>
                <BackButton onPress={() => props.navigation.goBack()}>
                    <SimpleLineIcons name="arrow-left" size={20} color="#000" />
                </BackButton>
                <Title>Equipamento</Title>
            </Header>
            <Wrapper style={{ paddingTop: 10 }}>
                <Input value={name} onChangeText={setName} label="Busca" placeholder='Digite um equipamento a buscar' />
            </Wrapper>
            {
                isLoading ?
                    <ActivityIndicator size={40} color="gray" />
                    :
                    <FlatList nestedScrollEnabled
                        data={equip}
                        renderItem={renderItem}
                        keyExtractor={(item) => item} />
            }

        </Container >
    )
}


export default ConsultEquip 