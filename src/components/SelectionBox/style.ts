import { TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import styled, { css } from "styled-components/native";
import { Multi } from './index'


export const Container = styled.View`
`

export const Wrapper = styled(View)`
    color: ${({ theme }) => theme.COLORS.DARK};
    font-family: ${({ theme }) => theme.FONTS.REGULAR};
    font-size: 16px;
    height: 120px;
    margin-top:10px;
    overflow: hidden;

    display: flex;
    justify-content:center;

    background-color: ${({ theme }) => theme.COLORS.LIGHT};
    margin-top: 5px;
    border-radius: 2px; 
`

export const MultiSelection = styled(Multi)`
    padding: 12px 24px;
    justify-content: center;
    align-items: flex-start;
`

export const Selection = styled(TouchableRipple)`
    padding: 12px 24px;
    justify-content: center;
    align-items: flex-start;
`
