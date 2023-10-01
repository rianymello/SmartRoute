import { StatusBar, Image, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

// Importe a imagem que você deseja usar
import rota2Image from '../assets/images/rota2.jpg';

export default function ModalScreen() {
  return (
    <View style={styles.container}>


      {/* Adicione a imagem abaixo do título */}
      <Image source={rota2Image} style={styles.image} />


      {/* Use a light status bar on iOS to account for the black space above the modal */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: '100%', // Defina a largura da imagem conforme necessário
    height: '100%', // Defina a altura da imagem conforme necessário
    marginVertical: 20, // Adicione margem vertical para separar o título da imagem
  },
  
});
