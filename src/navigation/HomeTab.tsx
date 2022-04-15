import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard';

const Tab = createBottomTabNavigator()

const HomeTab = props => {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Dashboard" component={Dashboard} />
        </Tab.Navigator>
    )
}

export default HomeTab