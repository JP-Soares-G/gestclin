import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Alert from '../screens/Alert';
import AlertForm from '../screens/AlertForm';

const Stack = createNativeStackNavigator();

const AlertStack = (props) => {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}} >
            <Stack.Screen name="Alert" component={Alert} />
            <Stack.Screen name="AlertForm" component={AlertForm} />
        </Stack.Navigator>
    )
}

export default AlertStack