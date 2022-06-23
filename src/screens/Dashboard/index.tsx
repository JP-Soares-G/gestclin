import React, { useEffect, useState } from "react";
import { Alert, BackHandler } from "react-native";
import KeyChain, { UserCredentials } from "react-native-keychain";
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import dashboardImage from '../../assets/images/dashboardImage.png';
import DashboardButton from "../../components/DashboardButton";
import { ButtonContainer, Container, Header, ImageBg, Text, TextWrapper } from "./styles";

const Dashboard = ({ route, navigation }) => {
    const [nome, setNome] = useState("Usuário")
    const [perfis, setPerfis] = useState([] as string[])

    const logout = () => {
        KeyChain.resetInternetCredentials("ESTADO_TELA");
        KeyChain.resetInternetCredentials("NOME");
        KeyChain.resetInternetCredentials("INFOS");
        KeyChain.resetInternetCredentials("ALERTAS");

        KeyChain.resetGenericPassword();
        navigation.goBack()
    }

    useEffect(() => {
        const backAction = () => {
            console.log(JSON.stringify(route))
            Alert.alert("Voltar", "Tem certeza que quer voltar?", [
                {
                    text: "Não",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "Sim", onPress: logout }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [])


    useEffect(() => {
        async function run() {
            const { password: obj} = await KeyChain.getInternetCredentials("INFOS") as UserCredentials
            const parsed = JSON.parse(obj)
            const letras = parsed.nome.split(" ")[0];
            
            setNome(letras[0].toUpperCase() + letras.substring(1).toLowerCase())
            setPerfis(parsed.perfis)
        }
        run();
    }, [])



    return (
        <Container>
            <Header>
                <TextWrapper>
                    <Text>Olá,</Text>
                    <Text>{nome}</Text>
                </TextWrapper>
                <ButtonContainer onPress={logout}>
                    <SimpleLineIcon name="logout" size={30} color="#000" />
                </ButtonContainer>
            </Header>
            <ImageBg resizeMode="contain" source={dashboardImage} />
            <DashboardButton onPress={() => navigation.navigate("Maintenance")} title="Manutenção Corretiva" />
            <DashboardButton
                last={!perfis.includes("ADMIN")}
                onPress={() => navigation.navigate("Consult")} title="Consultar OS" />
            {
                perfis?.includes("ADMIN") ?
                    <DashboardButton onPress={() => navigation.navigate("ConsultEquip")} last title="Consultar Equipamento" /> :
                    null

            }
        </Container>

    )
}

export default Dashboard