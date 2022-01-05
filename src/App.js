import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Router from './router';

const MyTheme = {
  colors: {
    background: '#131313',
    card: '#fff',
  },
};

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Router />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
