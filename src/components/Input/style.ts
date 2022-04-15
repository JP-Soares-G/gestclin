import { TextInput } from "react-native";
import styled, {css} from "styled-components/native";

interface Props {
    isFocused: boolean;
}

export const Container = styled.View`
    margin-bottom: 16px;
`

export const InputLabel = styled.Text`
    text-transform: uppercase;
    color: ${({theme}) => theme.COLORS.DARK};
    font-family: ${({theme}) => theme.FONTS.REGULAR};
    letter-spacing: 1px;

    margin-bottom: 8px;
`

export const InputText = styled(TextInput) <Props>`
    color: ${({theme}) => theme.COLORS.DARK};
    font-family: ${({theme}) => theme.FONTS.REGULAR};
    font-size: 16px;
    
    background-color: ${({theme}) => theme.COLORS.LIGHT};
    padding: 12px 24px;
    border-radius: 2px;

    ${({isFocused}) => isFocused && css`
        border-bottom-width: 2px;
        border-bottom-color: ${({theme}) => theme.COLORS.DARK};
    `};
`