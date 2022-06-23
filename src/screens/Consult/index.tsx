import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, ScrollView, ToastAndroid, TouchableOpacity, View } from "react-native";
import AlertItem from "../../components/AlertItem";
import {  Container, Header, Title } from "./styles";
import AntDesing from 'react-native-vector-icons/AntDesign'
import axios from 'axios'
import api from "../../services/api";
import KeyChain, { SharedWebCredentials, UserCredentials } from "react-native-keychain"
import Toast from 'react-native-toast-message';
import Button from "../../components/Button";
import { BackButton } from "../AlertForm/styles";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { Text } from "../Login/styles";
import OS from "../../components/OS";
import { ButtonContainer } from "../Dashboard/styles";




const Consult = (props) => {
    const [os, setOs] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    // For the first time
    useEffect(() => {
        setRefreshing(true);
        render();
        return () => { }
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(1500).then(() => {
            setRefreshing(false)
            render();
        });
    }, []);

    const render = async () => {
        try {

            const { data } = await api.get("/pendencias/consulta")
            setOs(data)
            setRefreshing(false)
            // // console.log(data)
        } catch (errors) {
            console.log(Object.keys(errors))
            console.log(errors.response)


        }


    }
    const renderItem = ({ item, index }) => (
        <OS dados={item} />
    )



    return (
        <Container>
            <Header>
                <BackButton onPress={() => props.navigation.goBack()}>
                    <SimpleLineIcons name="arrow-left" size={20} color="#000" />
                </BackButton>
                <Title>Ordem de Serviço</Title>
            </Header>

            <FlatList nestedScrollEnabled
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                data={os}
                renderItem={renderItem}
                keyExtractor={(item) => item.numeroDaOs}
                contentContainerStyle={{ paddingBottom: 30 }} />

        </Container >
    )
}


export default Consult
