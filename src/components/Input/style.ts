import { TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import styled, { css } from "styled-components/native";

interface Props {
    isFocused?: boolean;
    isEnabled?: boolean;
}


export const Container = styled.View`
    margin-bottom: 16px;
`

export const InputLabel = styled.Text`
    text-transform: uppercase;
    color: ${({ theme }) => theme.COLORS.DARK};
    font-family: ${({ theme }) => theme.FONTS.REGULAR};
    letter-spacing: 1px;
    margin-bottom: 8px; 
`
export const Wrapper = styled.View` 
    display: flex;
    align-items: flex-end;
    justify-content: center;
`



export const InputText = styled(TextInput) <Props>`
    color:  ${({ theme, isEnabled }) => isEnabled ? theme.COLORS.DARK : 'gray'};
    font-family: ${({ theme }) => theme.FONTS.REGULAR};
    font-size: 16px;
    background-color: ${({ theme, isEnabled }) => isEnabled ? theme.COLORS.LIGHT : '#aaa'};
    padding: 12px 50px 12px 24px;
    border-radius: 2px;  
    width: 100%;
    overflow: hidden; 
    ${({ isFocused }) => isFocused && css`
        border-bottom-width: 2px; 
    `};
`


export const Icon = styled(TouchableRipple) <Props>`
    position: absolute;
    display: flex;
    height: 100%;
    padding: 14px 14px;
    justify-content: center;  
    
`

