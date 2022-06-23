import React from 'react'
import { Container, Message, Time } from './styles'
import MatCommIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MatIcon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Text } from '../../screens/Login/styles'
import { View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'

const Icon = ({ crit, avi, not, tipo, estado, prio, ...rest }) => {
    const aviso = avi ? "orange" : null
    const notificacao = not ? "red" : null
    const critico = crit ? "purple" : null
    const prioridade = prio ? "red" : null

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>

            <MatCommIcon {...rest} name={"wrench-outline"} size={20} />
            {
                notificacao || aviso || critico ?
                    <FontAwesome5 {...rest} style={{ position: 'absolute', top: 0, right: 10 }} name={"exclamation-circle"} size={10} color={notificacao || aviso || critico} />
                    : null
            }

            <Text style={{ marginLeft: 3, width: 50, position: 'absolute', top: 20, left: 3, fontWeight: 'bold', fontSize: 11, color: '#e50000' }}>
                {tipo}
            </Text>
        </View>
    )
}

interface Props {
    dados: {
        tipoOS: string,
        prioridade: string,
        estadoOS: string,
        temAviso: boolean,
        temNotificacao: boolean,
        equipamentoCritico: boolean,
        numeroDaOs: string,
        nomeEquipamento: string,
        responsavel: string,
        abertaEm: string,
        diasNesteEstado: number;

    }
}

const OS = ({ dados }: Props) => {
    const { tipoOS, prioridade, estadoOS, temAviso,
        temNotificacao, equipamentoCritico,
        numeroDaOs, nomeEquipamento, responsavel, abertaEm,
        diasNesteEstado } = dados;

    return (
        <TouchableRipple onPress={() => { console.log("Pressed") }}>
            <Container>

                <View style={{flex: 1}}>
                    <Icon tipo={tipoOS} prio={prioridade} estado={estadoOS} crit={equipamentoCritico} avi={temAviso} style={{ flex: 1, maxWidth: 32 }} not={temNotificacao} />
                </View>

                <View style={{ flex: 8, justifyContent: 'center' }}>
                    <Message style={{ marginBottom: -10 }}>
                        <Text style={{ textDecorationLine: 'underline', fontSize: 14, fontWeight: 'bold', }}>
                            {numeroDaOs}
                        </Text>
                        <Text style={{ fontSize: 14, fontWeight: '400' }}>
                            {` - ${nomeEquipamento}\n`}
                        </Text>
                    </Message>
                    <Message>
                        {responsavel ?
                            <Message>
                                <MatIcon name={"person"} size={14} />  {responsavel + "\n"}
                            </Message>
                            : null}
                        <Time>
                            {`Neste estado há ${diasNesteEstado} dia${diasNesteEstado !== 1 ? "s" : ""} · Aberta em ${abertaEm}`}
                        </Time>
                    </Message>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {
                        prioridade ?
                            <FontAwesome5 name="arrow-up" size={16} style={{ paddingRight: 10 }} color="black" />
                            : null
                    }
                </View>
            </Container>
        </TouchableRipple>
    )
}

export default OS