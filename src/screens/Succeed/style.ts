import { View } from "react-native";
import styled, { css } from "styled-components/native";

interface Props {
    open: boolean;
}

export const Container = styled(View)<Props>`
    flex: 1;
    
    justify-content: center;
    // align-items: center;
    
`

export const IconWrapper = styled.View`
    background-color: ${({theme}) => theme.COLORS.LIGHT};
    flex: 2;
    justify-content: center;
    align-items: center;
`
export const TitleWrapper = styled.View`
    padding: 19px;
    flex: 1;
`

export const Title = styled.Text`
    
    // background-color: grey;
    font-size: 26px;
    text-align: center;
    
`