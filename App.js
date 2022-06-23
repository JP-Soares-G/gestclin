/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import OneSignal from 'react-native-onesignal';
import theme from './src/theme'
import Routes from './src/routes/Index'
import { APP_ID } from '@env'
import { ToastProvider } from 'react-native-toast-notifications'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const App = () => {

  useEffect(() => {
    //OneSignal Init Code
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(APP_ID);

    //Method for handling notifications opened
    // OneSignal.setNotificationOpenedHandler(notification => {
    //   console.log("OneSignal: notification opened:", notification);
    // });
  }, [])


  return (
    <ToastProvider normalColor="#d9edf7" dangerColor='#f2dede'  
      icon={<FontAwesome5 name={"info-circle"} size={18} style={{color: "#408bb0"}}/>}
      dangerIcon={<MaterialIcons name="dangerous" size={18} style={{color: "#bc5351"}}/>} 
      
      >
      <SafeAreaView style={{ flex: 1 }}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </SafeAreaView>
    </ToastProvider>
  );
};



export default App;
