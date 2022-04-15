import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
    width: 100%;
    padding: 16px;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.COLORS.DARK};
`

export const ButtonText = styled.Text`
    font-family: ${({theme}) => theme.FONTS.MEDIUM}
    color: #FFFFFF;
    font-size: 14px;
    letter-spacing: .5px;
    text-transform: uppercase;
`