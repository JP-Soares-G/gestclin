import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, RefreshControl, ToastAndroid } from "react-native";
import KeyChain, { UserCredentials } from "react-native-keychain";
import MatCommIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AlertItem from "../../components/AlertItem";
import api from "../../services/api";
import { AddAlertButton, Header, Title, TitleWrapper } from "./styles";




const Alerta = (props) => {
    const [perfis, setPerfis] = useState([] as string[])
    const [alerts, setAlerts] = useState([])
    const [hide, setIsHide] = useState(true)

    const [refreshing, setRefreshing] = useState(false);


    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    // For the first time

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(1500).then(() => {
            renderAlertsAndSaveLocally();
            setRefreshing(false)
        });
    }, []);


    const renderAlertsAndSaveLocally = useCallback(async () => {
        const info = await KeyChain.getGenericPassword() as UserCredentials;
        try {
            const { data } = await api.get('/usuarios/busca?email=' + encodeURI(info.username))
            setAlerts(data.alertasRecebidos)
            setRefreshing(false)
        } catch (errors) {
            Alert.alert("Erro " + errors.response.status, "Tente novamente mais tarde!")
            // console.log(errors.response.status);
        }
        await KeyChain.setInternetCredentials("ALERTAS", "ALERTAS", JSON.stringify(alerts))
    }, []);

    useEffect(() => {
        async function render() {
            const { password: obj } = await KeyChain.getInternetCredentials("INFOS") as UserCredentials
            setPerfis(JSON.parse(obj).perfis);
            setRefreshing(true)
            try {
                const { password: alerts } = await KeyChain.getInternetCredentials("ALERTAS") as UserCredentials
                const alertsData = JSON.parse(alerts) || []
                if (alertsData === []) {
                    // Não há alertas
                    
                }
            } catch (e) {
                console.log(e)
            }
        }
        render();
        renderAlertsAndSaveLocally();
        return () => { }
    }, [])




    const renderItem = ({ item }) => {
        return (
            <AlertItem critico={item.critico} titulo={item.titulo} message={item.descricao} succeed={false} time={item.envio} />
        );
    };



    return (
        <>

            <Header>
                <TitleWrapper>
                    <Title>Alertas</Title>
                    {
                        perfis.includes("ADMIN") || perfis.includes("GESTOR") ?
                            <AddAlertButton>
                                <MatCommIcon onPress={() => props.navigation.navigate("AlertForm")} name="bell-plus" color={"black"} size={28} />

                            </AddAlertButton>
                            : null
                    }
                </TitleWrapper>

            </Header>
            <FlatList nestedScrollEnabled refreshControl={<RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />}
                style={{ flex: 1 }}
                data={alerts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()} />

        </>
    )
}

export default Alerta