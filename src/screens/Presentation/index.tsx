import React from 'react'
import { Container, ContentWrapper, ImageBackground, Text, TextsWrapper } from './styles'
import presentationBg from '../../assets/images/presentation_bg.png'
import { ScrollView } from 'react-native'
import Button from '../../components/Button'

const Presentation = props => {
    return (
        // <ScrollView showsVerticalScrollIndicator={false} horizontal={false} style={{flex: 1}}>
            <Container>
                <ImageBackground resizeMode='cover' source={presentationBg} />
                <ContentWrapper>
                    <TextsWrapper>
                        <Text>Sistema para</Text>
                        <Text>gestão de atendimentos</Text>
                        <Text>da engenharia Clínica</Text>
                    </TextsWrapper>
                    <Button onPress={() => props.navigation.navigate('Login')} title="Login" />
                </ContentWrapper>
            </Container>
        // </ScrollView>
    )
}

export default Presentation