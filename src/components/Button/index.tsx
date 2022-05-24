import React from 'react'
import { TouchableOpacityProps, ActivityIndicator } from 'react-native'
import { Container, ButtonText } from './style'

interface Props extends TouchableOpacityProps {
    title: string;
    isLoading: boolean;
}

const Button = ({title, isLoading, ...rest}: Props) => {
    return (
        <Container {...rest}>
            {
            isLoading ? <ActivityIndicator size={22} color="white" />
                      : <ButtonText>{title}</ButtonText> 
            }
        </Container>
    )
}

export default Button