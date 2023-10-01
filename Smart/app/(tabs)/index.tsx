import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { Link } from 'expo-router';

export default function EditScreenInfo({ path }: { path: string }) {
  const data = Array.from({ length: 7 }, (_, index) => ({ key: String(index) }));
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputTextGoTo, setInputTextGoTo] = useState('');
  const [inputTextCurrentLocation, setInputTextCurrentLocation] = useState('');
  const [showSecondInput, setShowSecondInput] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleEnterPress = () => {
    if (inputTextGoTo.trim() !== '') {
      toggleModal();
    }
  
    setInputTextGoTo(''); // Limpar o texto do campo "Go to..."
    setShowSecondInput(false); // Ocultar o segundo campo
  };

  const renderModalContent = () => {
    return (
      <View style={styles.modalContainer}>
        <Icon name="exclamation-triangle" size={70} color="#ffffff" />
        <View style={styles.modalTextContainer}>
          <Text style={styles.modalText}>
            Congestion is expected on the standard route to your destination.
          </Text>
          <Text style={styles.modalTextBold}>
            Would you like to take an alternative route?
          </Text>
        </View>

        <View style={styles.modalButtonContainer}>
          <Link href="/modal" asChild>
            <TouchableOpacity
              style={styles.modalButtonNo}
              onPress={toggleModal}
            >
              <Text style={styles.modalButtonText}>No</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/teste" asChild>
            <TouchableOpacity
              style={styles.modalButtonYes}
              onPress={toggleModal}
            >
              <Text style={styles.modalButtonText}>Yes</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <View>
        {/* Mostrar o segundo campo de texto quando necessário */}
        {showSecondInput && (
          <View style={styles.procuracontainer}>
            <TextInput
              style={styles.inputText}
              placeholder="Your current location..."
              onChangeText={(text) => setInputTextCurrentLocation(text)}
              value={inputTextCurrentLocation}
              onSubmitEditing={() => {
                handleEnterPress;
              }}
            />
          </View>
        )}

        {/* Container existente */}
        <View style={styles.procuracontainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Go to..."
            onFocus={() => setShowSecondInput(true)} // Mostrar o segundo campo quando o primeiro está em foco
            onChangeText={(text) => setInputTextGoTo(text)}
            value={inputTextGoTo}
            onSubmitEditing={handleEnterPress}
     
          />
        </View>
   
        {/* Novo container "Notices" */}
        <View style={styles.rowContainer}>
          <Text style={[styles.noticeTitle, { fontWeight: 'bold' }]}>Notices</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>

        {/* FlatList para o carrossel de quadrados cinzas */}
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.graySquare} />
          )}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.squareContainer}
        />

        {/* Novo container "Últimas Viagens" */}
        <View style={[styles.lastTripsContainer, { marginTop: 10 }]}>
          <Text style={[styles.titulo, { fontWeight: 'bold' }]}>Últimas Viagens</Text>
          <View style={styles.tripItem}>
            <View style={[styles.tripItemLeft, styles.tripItemPadding]}>
              <Icon name="car" size={24} color="#ffffff" />
            </View>
            <View style={[styles.tripItemCenter, styles.tripItemPadding]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <Text style={styles.tripText}>Newark</Text>
                <Icon name="arrow-right" size={16} color="white" />
                <Text style={styles.tripText}>Yonkers</Text>
              </View>
            </View>
            <View style={[styles.tripItemRight, styles.tripItemPadding]}>
              <Text style={[styles.tripText, { color: 'rgba(255, 255, 255, 0.5)' }]}>43km</Text>
            </View>
          </View>
        </View>

        <Modal isVisible={isModalVisible}>
          {renderModalContent()}
        </Modal>

      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  procuracontainer: {
    flexDirection: 'row',
  },
  inputText: {
    width: '95%', // Ocupa 90% da largura
    marginHorizontal: 10, // Margem horizontal de 5
    marginVertical: 10,
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'white',
    color: 'white',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'white',
  },
  goToText: {
    fontSize: 18,
    marginLeft: 10,
    color: 'white',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  noticeTitle: {
    fontSize: 20,
    color: 'white',
    marginTop: 20,
  },
  seeAll: {
    fontSize: 17,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  squareContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  graySquare: {
    width: 130,
    height: 130,
    borderRadius: 15,
    backgroundColor: 'gray',
    marginRight: 10,
  },
  titulo: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 30,
  },
  lastTripsContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  tripItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  tripItemPadding: {
    paddingVertical: 5,
  },
  tripItemLeft: {
    flex: 1,
  },
  tripItemCenter: {
    flex: 3,
  },
  tripItemRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  tripText: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
    modalContainer: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height:'50%',
    },
    triangleIcon: {
      width: 40,
      height: 70,
      alignSelf: 'center',
    },
    modalText: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center',
      marginTop: 20,
    },
    modalButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    modalButtonNo: {
      paddingVertical: 10,
      paddingHorizontal: 25,
      borderRadius: 5,
      margin: 10,
    },
    modalButtonYes: {
      backgroundColor: 'red',
      paddingVertical: 10,
      paddingHorizontal: 25,
      borderRadius: 5,
      margin: 10,
    },
    modalButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    modalTextBold: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center',
    },
    modalTextContainer: {
      flexDirection: 'column',
    }
});