import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    height: 100%;
    justify-content: center;
    background-color:  ${({theme}) => theme.COLORS.BACKGROUND};
`

export const Wrapper = styled.View`
    padding: 0 24px;
`

export const Title = styled.Text`
    font-size: 32px;
    color: ${({theme}) => theme.COLORS.DARK};
    font-family:  ${({theme}) => theme.FONTS.REGULAR};
    margin-left: 10px;
    margin-bottom: 4px;
`

export const Subtitle = styled.Text`
    font-size: 16px;
    color: ${({theme}) => theme.COLORS.DARK};
    font-family: ${({theme}) => theme.FONTS.REGULAR};
    margin-left: 10px;
    margin-bottom: 40px; // give enough space between titles section and input section
`

export const Text = styled.Text`
    color: ${({theme}) => theme.COLORS.DARK};
    font-family: ${({theme}) => theme.FONTS.REGULAR};
    font-size: 24px;
`