import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login'
import Presentation from '../screens/Presentation'
import HomeTab from './HomeTab';

const Stack = createNativeStackNavigator()

const AuthStack = props => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} >
            <Stack.Screen name="Presentation" component={Presentation} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={HomeTab} />
        </Stack.Navigator>
    )
}

export default AuthStack