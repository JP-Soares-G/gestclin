import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
`

export const Header = styled.View`
    flex-direction: row;
    align-items: center;

    margin-bottom: 16px;
    border-bottom-width: 1px;
    border-color: gray;

    padding: 19px;
`

export const BackButton = styled.TouchableOpacity``

export const Title = styled.Text`
    font-size: 24px;
    color: ${({theme}) => theme.COLORS.DARK};
    font-family:  ${({theme}) => theme.FONTS.REGULAR};
    margin-left: 16px;
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
    color: ${({theme}) => theme.COLORS.DARK};
    font-family: ${({theme}) => theme.FONTS.REGULAR};
    letter-spacing: 1px;
    margin-bottom: 8px;
`