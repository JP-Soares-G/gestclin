import React from 'react'
import { Container, Message, Time } from './styles'
import MatCommIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const Icon = ({succeed, crit, ...rest}) => {
    return succeed 
        ? <MatCommIcon {...rest} name="emoticon-happy-outline" size={20} color="black" />
        : <MatCommIcon {...rest} name="alert" size={20} color={ crit ? "red" : "black"} />
}

interface Props {
    succeed?: boolean;
    message: string;
    titulo: string;
    time: string;
    critico: boolean;
}

const AlertItem = ({titulo, succeed, message, critico, time}: Props) => {
    
    return (
        <Container>
            <Icon style={{flex: 1, maxWidth: 32}} crit={critico} succeed={succeed} />
 
            <Message>
            {message}{"\n"}
            { titulo }
            </Message>
            <Time>
                {time}
            </Time>
        </Container>
    )
}

export default AlertItem