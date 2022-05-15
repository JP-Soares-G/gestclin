import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MatCommIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Dashboard from '../screens/Dashboard';
import Alert from '../screens/Alert';
import AlertStack from './AlertStack';
import DashboardStack from './DashboardStack';
const Tab = createBottomTabNavigator()

const HomeTab = props => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarInactiveTintColor: '#8f92a9',
            tabBarActiveTintColor: '#373A4D'
        }}>
            <Tab.Screen 
                name="Painel" 
                component={DashboardStack} 
                options={
                    {
                        tabBarIcon: ({color, size}) => {
                            return <AntDesign name="home" color={color} size={size} />
                        },
                    }
                }
            />
            <Tab.Screen 
                name="Alertas" 
                component={AlertStack} 
                options={
                    {
                        tabBarIcon: ({color, size}) => {
                            return <MatCommIcon name="bell-outline" color={color} size={size} />
                        },
                    }
                }
            />
        </Tab.Navigator>
    )
}

export default HomeTab
