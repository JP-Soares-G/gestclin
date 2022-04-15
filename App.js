/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  
} from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import Login from './src/screens/Login';
import Presentation from './src/screens/Presentation';
import theme from './src/theme'
import Navigation from './src/navigation/Index'


const App = () => {

  return (
    <SafeAreaView style={{flex: 1}}>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
    </SafeAreaView>
  );
};



export default App;
