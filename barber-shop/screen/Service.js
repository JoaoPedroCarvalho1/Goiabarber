import { View, Text, StyleSheet, ImageBackground, Modal, FlatList, TouchableOpacity, TextInput, Image, Alert} from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; 
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addBarber,removeBarber,updateBarber,addService,removeService,updateService} from '../redux/actions'; 

export default function Service({ navigation }) {
  const services = useSelector((state) => state.services);
  const barbers = useSelector((state) => state.barbers);
  const [barber, setBarber] = useState(false); 
  const [service, setService] = useState(false);
  const [barberName, setBarberName] = useState('');
  const [barberImage, setBarberImage] = useState(null);
  const [barberDescription, setBarberDescription] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [serviceValue, setServiceValue] = useState('');
  const dispatch = useDispatch();
  const [editingBarber, setEditingBarber] = useState(null);
  const [editingService, setEditingService] = useState(null);

  const editBarber = (barber) => {
    setEditingBarber(barber);
    setBarber(true);
    setBarberName(barber.name);
    setBarberDescription(barber.description);
    setBarberImage(barber.image);
  };

  const saveBarberEdit = () => {
    const updatedBarber = {
      ...editingBarber,
      name: barberName,
      description: barberDescription,
      image: barberImage,
    };
    console.log(barberImage)
    dispatch(updateBarber(updatedBarber.id, updatedBarber));
    alert('Barbeiro atualizado com sucesso');
    closeModal();
  };

  const deleteBarber = (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza de que deseja excluir este barbeiro? Essa ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Exclusão de barbeiro cancelada'),
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            dispatch(removeBarber(id));  // Executa a ação de remoção
            alert('Barbeiro removido com sucesso');
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const editService = (service) => {
    setEditingService(service);
    setService(true);
    setServiceName(service.name);
    setServiceValue(service.value);
  };

  const saveServiceEdit = () => {
    const updatedService = {
      ...editingService,
      name: serviceName,
      value: serviceValue,
    };

    dispatch(updateService(updatedService.id, updatedService));
    alert('Serviço atualizado com sucesso');
    closeModal();
  };

  const deleteService = (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza de que deseja excluir este serviço? Essa ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Exclusão de serviço cancelada'),
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            dispatch(removeService(id));  // Executa a ação de remoção
            alert('Serviço removido com sucesso');
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const closeModal = () => {
    setBarber(false);
    setService(false);
    setEditingBarber(null);
    setEditingService(null);
    setBarberName('');
    setBarberDescription('');
    setBarberImage(null);
    setServiceName('');
    setServiceValue('');
  };

const pickImage = async () => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    alert('Permissão para acessar a galeria é necessária!');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    setBarberImage(result.assets[0].uri);
    console.log("Image URI:", result.assets[0].uri);
  } else {
    console.log("A seleção de imagem foi cancelada ou falhou.");
  }
};

const takePhoto = async () => {
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  if (!permissionResult.granted) {
    alert('Permissão para acessar a câmera é necessária!');
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    setBarberImage(result.assets[0].uri);
  } else {
    console.log("A captura de imagem foi cancelada ou falhou.");
  }
};

  const createBarber = () => {
    const newBarber = {
      id: barbers.length + 1,
      name: barberName,
      description: barberDescription,
      image: barberImage,
    };

    dispatch(addBarber(newBarber));
    alert('Barbeiro Adicionado com Sucesso');
    closeModal(); // Fecha o modal e reseta o estado
  };

  const createService = () => {
    const newService = {
      id: services.length + 1,
      name: serviceName,
      value: serviceValue,
    };

    dispatch(addService(newService));
    alert('Serviço Adicionado com Sucesso');
    closeModal();
  };

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image ? { uri: item.image } : require('../assets/background.jpg')} style={styles.barberImage} />
      <View>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.textDescription}>Descrição: {item.description}</Text>
      </View>
      <View style={styles.options}>
        <TouchableOpacity onPress={() => editBarber(item)}>
          <Ionicons name="create-outline" size={24} color="#f8bf39" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteBarber(item.id)}>
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderService = ({ item }) => (
    <View style={styles.cardService}>
      <View>
        <Text style={styles.text}>Nome: {item.name}</Text>
        <Text style={styles.text}>Valor: {item.value},00 R$</Text>
      </View>
      <View style={styles.options}>
        <TouchableOpacity onPress={() => editService(item)}>
          <Ionicons name="create-outline" size={24} color="#f8bf39" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteService(item.id)}>
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('../assets/background.jpg')}
        resizeMode="cover"
        imageStyle={{ opacity: 0.3 }}
      >
        <TouchableOpacity style={styles.buttonTop} onPress={() => setBarber(true)}>
          <Text style={styles.textButton}>Barbeiro</Text>
        </TouchableOpacity>
        <FlatList
          data={barbers}
          renderItem={renderCard}
          keyExtractor={(item, index) => index.toString()}
          style={{ width: '100%'}} 
        />
        <TouchableOpacity style={styles.buttonBottom} onPress={() => setService(true)}>
          <Text style={styles.textButton}>Serviço</Text>
        </TouchableOpacity>
        <FlatList
          data={services}
          renderItem={renderService}
          keyExtractor={(item, index) => index.toString()}
          style={{ width: '100%'}}/>
        <Modal
          animationType="slide"
          transparent={true}
          visible={barber}
          onRequestClose={() => setBarber(false)}
        >
          <View style={styles.modalView}>
            {barberImage ? (
              <Image source={{ uri: barberImage }} style={styles.previewImage} />
            ) : (
              <Ionicons name="person-circle-outline" color={"#f8bf39"} size={100} />
            )}
            <Text style={styles.text}>{editingBarber ? 'Editar Barbeiro' : 'Cadastrar Barbeiro'}</Text>
            <View  style={styles.iconContainer}>
              <Text style={styles.textButton}>+</Text>
              <TouchableOpacity  onPress={takePhoto}>
                <Ionicons name="camera-outline" color={"#f8bf39"} size={40} />
              </TouchableOpacity>

              <TouchableOpacity  onPress={pickImage}>
                <Ionicons name="image-outline" color={"#f8bf39"} size={40} />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Nome completo"
              placeholderTextColor="#888"
              value={barberName}
              onChangeText={setBarberName}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Descrição"
              placeholderTextColor="#888"
              value={barberDescription}
              onChangeText={setBarberDescription}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={editingBarber ? saveBarberEdit : createBarber}
            >
              <Text style={styles.textButton}>{editingBarber ? 'Salvar' : 'Cadastrar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={closeModal}>
              <Text style={styles.textButton}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Modal para Serviço */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={service}
          onRequestClose={() => setService(false)}
        >
          <View style={styles.modalView}>
            <Ionicons name="person-circle-outline" color={"#f8bf39"} size={100} />
            <Text style={styles.text}>{editingService ? 'Editar Serviço' : 'Cadastrar Serviço'}</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nome do serviço"
              placeholderTextColor="#888"
              value={serviceName}
              onChangeText={setServiceName}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Valor do serviço"
              keyboardType="numeric"
              placeholderTextColor="#888"
              value={serviceValue}
              onChangeText={setServiceValue}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={editingService ? saveServiceEdit : createService}
            >
              <Text style={styles.textButton}>{editingService ? 'Salvar' : 'Cadastrar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={closeModal}>
              <Text style={styles.textButton}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
              </ImageBackground>
            </View>
          );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  iconContainer: {
    display:'flex',
    flexDirection:'row',
    alignItems: 'center',
    gap:1,
    justifyContent: 'center',
    backgroundColor: '#202020',
    height:100,
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTop: {
    backgroundColor: '#f8bf39',
    padding: 12,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 9,
    borderColor: '#f8bf39',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
    width: 300,
  },
  buttonBottom: {
    backgroundColor: '#f8bf39',
    padding: 12,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 9,
    borderColor: '#f8bf39',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    width: 300,
  },
  button: {
    backgroundColor: '#f8bf39',
    padding: 12,
    borderRadius: 9,
    alignItems: 'center',
    marginTop: 20,
    width: 300,
  },
  textButton: {
    fontSize: 20,
    color: '#fff',
    fontStyle: 'italic',
    fontWeight: '900',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#202020',
  },
  text: {
    color: '#fff',
  },
  title: {
    color: '#f8bf39',
    fontSize:24,
    margin:'auto'
  },
  textDescription: {
    color: '#fff',
    width: 300,
  },
  textInput: {
    margin: 5,
    padding: 10,
    borderRadius: 9,
    marginBottom: 10,
    color: '#fff',
    backgroundColor: '#2B2B2B',
    width: 300,
  },
 barberImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#202020',
    backgroundColor: '#202020',
    width: '90%',
    alignSelf: 'center',
  },
  cardService: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#202020',
    backgroundColor: '#202020',
    width: '90%',
    alignSelf: 'center',
  },
  options: {
    position:'absolute',
    flexDirection: 'row',    
    top:20,
    right:10,
    gap:5,
  },
});