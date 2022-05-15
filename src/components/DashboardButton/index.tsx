import React from 'react'
import { TouchableHighlightProps, TouchableOpacityProps, View } from 'react-native'
import { ButtonText, Container, Wrapper } from './styles'

interface Props extends TouchableHighlightProps {
    last?: boolean;
    title: string;
}

const DashboardButton = ({title, last, ...rest}: Props) => {
    return (
        <Container last={last}> 
            <Wrapper 
                activeOpacity={0.6} 
                underlayColor="#DDDDDD" 
                {...rest}>
                    <ButtonText>{title}</ButtonText>
            </Wrapper>
        </Container>
    )
}

export default DashboardButton