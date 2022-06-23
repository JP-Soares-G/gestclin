import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dashboard from '../screens/Dashboard'
import Maintenance from '../screens/Maintenance'
import Succeed from '../screens/Succeed'
import Consult from '../screens/Consult'
import ConsultEquip from '../screens/ConsultEquip'
const Stack = createNativeStackNavigator()

const DashboardStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Maintenance" component={Maintenance} />
            <Stack.Screen name="Consult" component={Consult} />
            <Stack.Screen name="ConsultEquip" component={ConsultEquip} />
            <Stack.Screen name="Succeed" component={Succeed} />
            
        </Stack.Navigator>
    )
}
export default DashboardStack