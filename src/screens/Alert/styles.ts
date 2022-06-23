import styled from 'styled-components/native'

export const Container = styled.View``

export const Header = styled.View`
    padding: 19px;
    border-bottom-width: 1px;
    border-color: gray;
`

export const TitleWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 12px;
    
`

export const Title = styled.Text`
    font-size: 24px;
    color: ${({theme}) => theme.COLORS.DARK};
    font-family:  ${({theme}) => theme.FONTS.REGULAR};
`

 

export const CleanButtonContainer = styled.TouchableOpacity`
    width: 100%;
    justify-content: center;
    align-items: flex-end;
`

export const CleanButtonText = styled.Text`
    font-size: 16px;
    text-transform: uppercase;
`

export const AddAlertButton = styled.TouchableHighlight``
