import React from 'react'
import { Container, IconWrapper, Title, TitleWrapper } from './style'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import Button from '../../components/Button'


const Succeed = (props) => {
    return (
        <Container open={props.open}>
            <IconWrapper>
                <SimpleLineIcon name="check" size={128} color="#8f92a9" />
            </IconWrapper>
            
            <TitleWrapper>
                <Title>Pedido de manutenção cadastrado com sucesso!</Title>
                <Button style={{marginTop: 32}} onPress={() => {
                    props.navigation.navigate("Dashboard")
                    // props.navigation.goBack()
                }} title="Ok" />
            </TitleWrapper>
        </Container>
    )
}

export default Succeed