import styled from "styled-components/native";
import { View } from "react-native";

export const Container = styled(View)<props>`
    border-color: ${({theme}) => theme.COLORS.LIGHT};
    border-top-width: 4px;

    ${props => props.last && `   
        border-bottom-width: 4px;
    `}
`

export const Wrapper = styled.TouchableHighlight`
    width: 100%;
    padding: 24px 18px ;
    align-items: flex-start;
    justify-content: center;
    // border-color: ${({theme}) => theme.COLORS.LIGHT};
    // border-top-width: 8px;
    // background-color: ${({theme}) => theme.COLORS.BACKGROUND};
`



export const ButtonText = styled.Text`
    font-family: ${({theme}) => theme.FONTS.REGULAR};
    color: ${({theme}) => theme.COLORS.DARK};
    font-size: 18px;
    letter-spacing: .5px;
`