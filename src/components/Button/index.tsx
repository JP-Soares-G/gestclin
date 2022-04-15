import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { Container, ButtonText } from './style'

interface Props extends TouchableOpacityProps {
    title: string;
}

const Button = ({title, ...rest}: Props) => {
    return (
        <Container {...rest}>
            <ButtonText>{title}</ButtonText>
        </Container>
    )
}

export default Button