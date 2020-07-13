import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Asset } from 'expo-asset';

import { copyToAppDir } from '../../utils/FilesHandler';

const ImgPicker = () => {
  const date = new Date();

  const navigation = useNavigation();

  const [image, setImage] = useState('');

   async function getPermissionAsync() { // Pede permissão caso o So do dispositivio do usuário seja IOS.
    if (Constants.platform?.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

   async function _pickImage() { // Abre o selecionador de imagens nativo do dispositivo do usuário, pedindo permissão se necessário.
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        allowsMultipleSelection: true,
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }

      //console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  getPermissionAsync();

  function addToHiddenGallery() { // Adiciona a foto com o caminho definido no state "image" à pasta do aplicativo.
    const actualTimeMS = date.getTime().toString();
    copyToAppDir(image, actualTimeMS);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }]
    });
  }

  return (
    <View style={styles.container}>
      <RectButton style={styles.button} onPress={()=>{_pickImage()}}>
      {
      !image ?
        <Text style={styles.text}>Selecione uma imagem da galeria</Text>:
        <Text style={styles.text}>Trocar imagem?</Text>
      }        
      </RectButton>
      {
        (!image == false) && 
        (
          <>
            <Image source={{ uri: image }} style={[{ width: 300, height: 300 }, styles.image]} />
            {/* <Image source={{uri: ''}} style={[{ width: 300, height: 300 }, styles.image]} /> */}
            <RectButton style={styles.button} onPress={() => {addToHiddenGallery()}}>
              <Text style={styles.text}>Esconder imagem</Text>
            </RectButton>
          </>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    minWidth: 250,
    backgroundColor: '#000',
    padding: 16,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderRadius: 16,
    alignItems: 'center'
  },
  text: {
    color: '#999',
    fontSize: 16,
  },
  image: {
    resizeMode: 'contain',
  }
});

export default ImgPicker;