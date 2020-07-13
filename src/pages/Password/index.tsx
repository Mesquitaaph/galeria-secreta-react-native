import React, { useEffect } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'
import  * as LocalAuthentication from 'expo-local-authentication';


const Password = () => {

  const navigation = useNavigation();

  useEffect(() => {
    handleAuthentication();
  }, [])

  

  function handleAuthentication() {
    LocalAuthentication.supportedAuthenticationTypesAsync()
      .then(
        authenticateAttempt
      )
      .catch(err => console.error(err));
  }

  function authenticateAttempt(supportedAuthTypes: number[]) {
    LocalAuthentication.authenticateAsync({
      promptMessage: "Calma ai...",
      cancelLabel: "Processo cancelado",
    })
    .then(res => handleAuthAttempt(res.success))
    .catch(err => console.log(err))
  }

  function handleAuthAttempt(success: boolean) {
    if(success){
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}]
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'Password'}]
      });
    }
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <RectButton 
        style={{backgroundColor: '#555', padding: 16, borderRadius: 8}}
      >
        <Text>Botão</Text>
      </RectButton> */}
    </View>
  )
}

export default Password;