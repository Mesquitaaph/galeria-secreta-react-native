import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppLoading } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Roboto_300Light, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_500Medium,
    Ubuntu_700Bold,
  });

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Routes />
  );
}