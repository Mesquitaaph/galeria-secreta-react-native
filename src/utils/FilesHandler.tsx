import React from 'react';
import { View, Alert } from 'react-native';

import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

const staticPath = FileSystem.documentDirectory as string;
const newDir = 'newPath/'
const newPath = staticPath + newDir;


// Função de inicialização. Cria o diretório paras as imagens na pasta do aplicativo.
export function makeDirHandler() {
  console.log('Make')
  FileSystem.makeDirectoryAsync(newPath, {intermediates: true});
}


// Função de depuração. Salva o arquivo de imagem para a pasta do aplicativo definida em "newPath"
export function downloadHandler() {
  const photosTestSource = '../../hid/';
  const photoName = '';

  const photo = Asset.fromModule(require(photosTestSource + photoName));
  const photoUri = photo.uri.split('?')[0];

  FileSystem.downloadAsync(photoUri, newPath + photoName)
    .then(({ uri }) => {
      console.log('Finished downloading to ', uri);
    })
    .catch(err => console.log(err))
}  


// Função de depuração. Mostra o conteúdo do diretório
export function showDirHandler() {
  const shownDir = newPath;
  console.log("Mostrando diretorio: " + shownDir.split('/')[shownDir.split('/').length-2] + "/")
  FileSystem.readDirectoryAsync(shownDir)
    .then(res => res.map(ft => console.log(res.indexOf(ft)+'-----'+ft)))
    .catch(err => console.log(err));
}

// Função de depuração. Apaga um caminho selecionado.
export async function delDirHandler(photoUri: string) {
  await FileSystem.deleteAsync(photoUri);
  //alert("Foto apagada com sucesso!");
  Alert.alert(
    "Foto apagada com sucesso"
  );
}

// Copia o caminho do arquivo de imagem para a pasta do aplicativo definida em "newPath"
export function copyToAppDir(photoUri: string, photoName: string) {
  const splitted = photoUri.split('.');
  const photoType = '.'+splitted[splitted.length - 1];
  
  const newPhotoName = photoName + photoType;
  FileSystem.copyAsync({
    from: photoUri,
    to: newPath + newPhotoName
  }).catch(err => alert(err));
}
