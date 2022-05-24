import React, { useEffect, useState } from "react";

import { NavigationContainer } from '@react-navigation/native';
import KeyChain from "react-native-keychain"

import AuthStack from "./AuthStack";
import { ActivityIndicator, Alert, View } from "react-native";
import api from "../services/api";

const Navigation = props => {
    const [initialState, setInitialState] = useState();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const restoreState = async () => {
            try {
                const { username, password } = await KeyChain.getGenericPassword() as { username: string, password: string };        
                // Alert.alert(username, password);
                // await api.post("/login", {username, password})
                // await api.post("/login", {username, password})

                const savedStateString = await KeyChain.getInternetCredentials("ESTADO_TELA");
                const state = savedStateString ? JSON.parse(savedStateString.password) : undefined;

                if (state !== undefined) {
                        setInitialState(state);
                }
            } finally {
                setIsReady(true);
            }
        };

        if (!isReady) {
            restoreState();
        }
    }, [isReady]);
    if(!isReady) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size={50}/>
            </View>
        )
    }

    return (
        <NavigationContainer initialState={initialState}
            onStateChange={(state) =>
                KeyChain.setInternetCredentials("ESTADO_TELA","ESTADO_TELA", JSON.stringify(state))
            }>
            <AuthStack />
        </NavigationContainer>
    )
}

export default Navigation