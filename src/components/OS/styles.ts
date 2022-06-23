import { View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import styled from 'styled-components/native'

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 16px;
    min-height: 100px;
    border-bottom-width:1px;
    border-color:lightgray;
`
export const IconWrapper = styled.View`
`

export const MessageContainer = styled.View`
`

export const Message = styled.Text` 
    font-size: 14px; 
`

export const Time = styled.Text`
    font-size:12px;
`