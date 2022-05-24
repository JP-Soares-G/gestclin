import React, { useEffect, useState } from "react";
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { ButtonContainer, Container, Header, ImageBg, Text, TextWrapper } from "./styles";
import dashboardImage from '../../assets/images/dashboardImage.png';
import DashboardButton from "../../components/DashboardButton";
import KeyChain, { SharedWebCredentials, UserCredentials } from "react-native-keychain"
import api from "../../services/api"; 
import { Alert, BackHandler } from "react-native";

const Dashboard = ({ route, navigation}) => {
    const [nome, setNome] = useState("Usuário")

     
    useEffect(() => {
        const backAction = () => {
            console.log(JSON.stringify(route))
            Alert.alert("Voltar", "Tem certeza que quer voltar?", [
              {
                text: "Não",
                onPress: () => null,
                style: "cancel"
              },
              { text: "Sim", onPress: () => navigation.goBack() }
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
            const info = await KeyChain.getGenericPassword() as UserCredentials;

            const { data } = await api.get(`/usuarios/busca?email=${info.username}`)
            
            
            setNome(data.nome.split(" ")[0])
        }
        run();
    }, [])

    const logout = () => {
        KeyChain.resetInternetCredentials("ESTADO_TELA");
        KeyChain.resetGenericPassword();
        navigation.goBack()
    }

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
            <ImageBg resizeMode="contain" source={dashboardImage}/>
            <DashboardButton onPress={() => navigation.navigate("Maintenance")} title="Manutenção Corretiva" />
            <DashboardButton style={{backgroundColor:'gray'}} disabled onPress={() => alert(KeyChain.getGenericPassword())} title="Consultar OS" />
            <DashboardButton style={{backgroundColor:'gray'}} disabled onPress={() => alert(KeyChain.getGenericPassword())}  title="Consultar Equipamento" />
            <DashboardButton style={{backgroundColor:'gray'}} disabled onPress={() => alert(KeyChain.getGenericPassword())}  title="Gerar Relatório" />
            <DashboardButton style={{backgroundColor:'gray'}} disabled onPress={() => alert(KeyChain.getGenericPassword())} last title="Inventário de Equipamentos" />
        </Container>

    )
}

export default Dashboard