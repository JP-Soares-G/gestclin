import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    // background-color:  ${({theme}) => theme.COLORS.DARK};
`

export const ImageBackground = styled.ImageBackground`
    width: 100%;
    height: 400px;
`

export const ContentWrapper = styled.View`
    padding: 16px;
    margin-bottom: 16px;
`

export const TextsWrapper = styled.View`
    // margin-top: 16px;
    // margin-left: 16px;
    margin-bottom: 32px;
`

export const Text = styled.Text`
    color: ${({theme}) => theme.COLORS.DARK};
    font-family: ${({theme}) => theme.FONTS.REGULAR};
    font-size: 24px;
    text-transform: capitalize;
    
    
`