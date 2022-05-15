import { RFPercentage } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'



export const Container = styled.View`
    flex: 1;
`

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center
    padding: 19px;
`
export const TextWrapper = styled.View`
`

export const Text = styled.Text`
    color: #000;
    font-size: 24px;
    font-family: ${({theme}) => theme.FONTS.REGULAR};
`

export const ButtonContainer = styled.TouchableOpacity`
`

export const ImageBg = styled.ImageBackground`
    width: 100%;
    height: ${RFPercentage(28)}px;
    margin-bottom: 16px;

`