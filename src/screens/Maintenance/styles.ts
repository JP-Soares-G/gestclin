import { StyleProp, TextStyle } from "react-native";
import { BaseToast } from "react-native-toast-message";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
    flex: 1;
`

export const Header = styled.View`
    flex-direction: row;
    align-items: center; 
    
    display: flex
    
    margin-bottom: 16px;
    border-bottom-width: 1px;
    border-color: gray;

    padding: 19px;
`





export const BaseToastCustom = styled(BaseToast)`
border-left-color: red;
${({text1Style}) => text1Style && css`
    font-size:40px;
`}`


export const BackButton = styled.TouchableOpacity`
    
`

export const Title = styled.Text`
    font-size: 24px;
    color: ${({ theme }) => theme.COLORS.DARK};
    font-family:  ${({ theme }) => theme.FONTS.REGULAR};
    margin-left: 16px;
    margin-right: -80px;
`

export const Wrapper = styled.View`
    margin: auto 0;
    padding: 19px;
`
export const PickerContainer = styled.View`
    margin-bottom: 16px;    
`

export const PickerLabel = styled.Text`
    text-transform: uppercase;
    color: ${({ theme }) => theme.COLORS.DARK};
    font-family: ${({ theme }) => theme.FONTS.REGULAR};
    letter-spacing: 1px;
    margin-bottom: 8px;
`

export const ButtonContainer = styled.TouchableOpacity`
    width: 100%;
    justify-content: center;
    align-items: flex-end;
`

export const ButtonText = styled.Text`
    font-size: 16px;
    text-transform: uppercase;
    `