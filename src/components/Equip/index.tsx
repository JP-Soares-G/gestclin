import React from 'react'
import { Container, Message, Time } from './styles'
import MatCommIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text } from '../../screens/Login/styles'
import { View } from 'react-native'

const Icon = ({...rest }) => {
    return (<View>


        <MatCommIcon {...rest} name={"screw-flat-top"} size={20} />
        <Message> 
        </Message>

    </View>)
}

 

const Equip = ({ dados }) => { 

    return (
        <Container>
         <MatCommIcon   name={"screw-flat-top"} size={20} />

            <Message>
               {dados}
            </Message> 
        </Container>
    )
}

export default Equip