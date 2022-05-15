import React from "react";
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { ButtonContainer, Container, Header, ImageBg, Text, TextWrapper } from "./styles";
import dashboardImage from '../../assets/images/dashboardImage.png';
import DashboardButton from "../../components/DashboardButton";

const Dashboard = props => {

    return (
        <Container>
            <Header>
                <TextWrapper>
                    <Text>Olá,</Text>
                    <Text>Administrador</Text> 
                </TextWrapper>
                <ButtonContainer onPress={() => props.navigation.goBack()}>
                    <SimpleLineIcon name="logout" size={30} color="#000" />
                </ButtonContainer>
            </Header>
            <ImageBg resizeMode="contain" source={dashboardImage}/>
            <DashboardButton onPress={() => props.navigation.navigate("Maintenance")} title="Manutenção Corretiva" />
            <DashboardButton onPress={() => alert('Pressed!')} last title="Relatórios" />
        </Container>

    )
}

export default Dashboard