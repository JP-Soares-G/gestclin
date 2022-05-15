import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dashboard from '../screens/Dashboard'
import Maintenance from '../screens/Maintenance'
import Succeed from '../screens/Succeed'
const Stack = createNativeStackNavigator()

const DashboardStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Maintenance" component={Maintenance} />
            <Stack.Screen name="Succeed" component={Succeed} />
        </Stack.Navigator>
    )
}
export default DashboardStack