import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import * as Crypto from 'expo-crypto';

import { delDirHandler, showDirHandler } from '../../utils/FilesHandler';

interface Route {
  photoDir: string;
}

const Photo = () => {

  const navigation = useNavigation();

  const route = useRoute().params as Route;
  const photoDir = route.photoDir;

  // async function runCrypto() {
  //   const digest = await Crypto.digestStringAsync(
  //     Crypto.CryptoDigestAlgorithm.SHA256,
  //     photoDir
  //   );
  //   console.log('Digest: ', digest);
  // }

  // runCrypto();

  function deletePhoto() { // Apaga a foto atual e retorna à "Home".
    delDirHandler(photoDir).then(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      })
    })
  }


  return (
    <View style={styles.container}>
      <Image
        style={[{width: useWindowDimensions().width, height: useWindowDimensions().height}, styles.photo]}
        source={{uri: photoDir}}
        
      />
      <RectButton style={styles.button} onPress={deletePhoto}>
        <Text style={{ color: 'white' }}>Apagar foto</Text>
      </RectButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 32,
  },
  photo: {
    resizeMode: "contain",
  },
  button: {
    position: 'absolute',
    bottom: 32,
    left: 80,
    width: 200,
    height: 50,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'white',
    borderRadius: 16,
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Photo;