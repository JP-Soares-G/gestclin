import React from 'react'
import { Container, Message, Time } from './styles'
import MatCommIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const Icon = ({succeed, ...rest}) => {
    return succeed 
        ? <MatCommIcon {...rest} name="emoticon-happy-outline" size={20} color="black" />
        : <MatCommIcon {...rest} name="alert" size={20} color="black" />
}

interface Props {
    succeed?: boolean;
    message: string;
    time: string;
}

const AlertItem = ({succeed, message, time}: Props) => {
    
    return (
        <Container>
            <Icon style={{flex: 1, maxWidth: 32}} succeed={succeed} />
            <Message>
                {message}
            </Message>
            <Time>
                {time}
            </Time>
        </Container>
    )
}

export default AlertItem