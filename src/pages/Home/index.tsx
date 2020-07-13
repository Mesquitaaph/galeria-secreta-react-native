import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import * as FileSystem from 'expo-file-system';
import { Feather as Icon} from '@expo/vector-icons/';
import { useNavigation, useRoute } from '@react-navigation/native';
import { readDirectoryAsync } from 'expo-file-system';

const Home = () => {
  const PHOTOS_PER_ROW = 4;

  const HidPhotosDir = 'newPath/'

  const HidPhotosPath = FileSystem.documentDirectory + HidPhotosDir;

  const [photos, setPhotos] = useState<string[]>([]);

  const navigation = useNavigation();


  useEffect(() => {
    handleLoadPhotos();
  }, []);

  async function handleLoadPhotos() { // Carrega as fotos na pasta do aplicativo
    await FileSystem.readDirectoryAsync(HidPhotosPath)
      .then(res => {
        // Preenche o caminho das fotos define a lista de fotos no state "photos"
        const serialiazedList = res.sort().map(item => HidPhotosPath+item);
        setPhotos(serialiazedList);
      })
      .catch(err => console.log('COE::'+err));
  }


  function makePhotoRows() { // Retorna uma matriz N x PHOTOS_PER_ROW a fim de utilizar como uma grid uniformemente distribuída
    let row= [];
    let rows = [];
    const mod = photos.length % PHOTOS_PER_ROW;
    const nRows = Math.trunc(photos.length / PHOTOS_PER_ROW) + (mod ? 1 : 0); // Define a quantidade de colunas baseando-se na divisão inteira, adicionando uma a mais caso tenha resto
    for(let photo = 0; photo<nRows*PHOTOS_PER_ROW; photo++) {

      // Adiciona fotos à fileira "row" até o tamanho ser igual ao número de fotos por fileira.
      // Então adiciona a fileira "row" a "rows" e "zera" a fileira para outras fotos.
      // Como a ideia é ser uma grid uniformemente distribuída haverão fotos "em branco". No caso defini-as como "undefined".

      if(photos[photo]){
        row.push(photos[photo]);
      }else {
        row.push(undefined);
      }
      if(row.length === PHOTOS_PER_ROW) {
        rows.push(row);
        row = [];
      }
    }
    return rows;
  }

  function makePhotoGrid() { // Retorna as View's com as fotos enfileiradas.
    let GRID: JSX.Element[] = [];
    makePhotoRows().map(row => {
      let i = 0
      let ROW = row.map(photo => (
        <RectButton
          // style={{backgroundColor: 'white'}} 
          enabled={photo?true:false} // Fotos "em branco" não devem reagir ao toque do usuário.
          key={photo ? photo: i++} // Fotos "em branco" recebem uma key numérica para o TypeScript não reclamar kkkkkkkk
          onPress={() => {handlePhotoNavigation(photo)}} // Ao toque do usuário, chama a função para carregar a foto pressionada.
        >
          <Image source={{ uri: photo }} style={styles.hidPhotos} />
        </RectButton>
      ));
      GRID.push(
        <View style={styles.row}>
          {ROW}
        </View>
      );
    })
    return GRID;
  }

  function handlePhotoNavigation (photoDir: string | undefined) { // Navega até a tela de mostrar a foto do caminho passado por argumento.
    if(photoDir)
      navigation.navigate('Photo', { photoDir });
  }

  function handleImagePicker() { // Navega até a tela de selecionar imagem.
    navigation.navigate('ImagePicker');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>
          {/* <Icon name='arrow-right' color="#fff" size={32}/> */}
          Galeria
        </Text>
        <RectButton style={styles.button} onPress={() => handleImagePicker()}>
          <Text style={{ color: 'white', fontSize: 16 }}>Esconda uma foto</Text>
        </RectButton>
      </View>
      <View style={styles.main}>        
        <View style={styles.photosContainer}>
          { makePhotoGrid() }
        </View>
      </View>      
    </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    padding: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  main: {
    backgroundColor: '#222',
    flex: 1,
  },
  text: {
    fontFamily: 'Ubuntu_700Bold',
    color: "#fff",
    fontSize: 32,
  },
  button: {
    padding: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'white',
    borderRadius: 8,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center'
  } ,
  photosContainer: {
    flex: 1,
    borderColor: '#ffffff15',
    borderStyle: 'solid',
    borderWidth: .5,
    borderRadius: 16,
    marginTop: 16,
    backgroundColor: '#2a2a2a',
    padding: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  hidPhotos: {
    width: 72,
    height: 72,
    borderRadius: 8,
  },
});

export default Home;