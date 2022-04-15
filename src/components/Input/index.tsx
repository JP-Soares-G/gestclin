import React, { useState } from 'react'
import { TextInputProps } from 'react-native'
import { Container, InputLabel, InputText } from './style'

type InputProps = TextInputProps & {
    label?: string;
    value?: string;
}

const Input = ({label, value, ...rest}: InputProps) => {
    const [isFocused, setIsFocused] = useState(false)

    const handleInputFocus = () => setIsFocused(true)

    const handleInputBlur = () => setIsFocused(false)

    return (
        <Container>
            <InputLabel>{label}</InputLabel>
            <InputText 
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
                value={value} 
                isFocused={isFocused} 
                {...rest} 
            />
        </Container>
    )
}

export default Input