import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { updateContact } from '../redux/actions'; 
import { removeContact } from '../redux/actions'; 
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Atualizar({ navigation }) {
  const dispatch = useDispatch();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);

  const handlePhone = (value) => {
      value = value.replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d)(\d{4})$/, '$1-$2');
      setPhone(value);
  };

  const validateEmail = () => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
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
    setImage(result.assets[0].uri);
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
    setImage(result.assets[0].uri);
  } else {
    console.log("A captura de imagem foi cancelada ou falhou.");
  }
};  

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@login');
      if (value !== null) {
        const parsedValue = JSON.parse(value);
        setUser(parsedValue);
        setImage(parsedValue.photo);
        setName(parsedValue.name);
        setPhone(parsedValue.phone);
        setEmail(parsedValue.email);
        setSenha(parsedValue.password);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleUpdateContact = () => {

    if (!validateEmail()) {
      Alert.alert('E-mail inválido');
      return;
    }

    const updatedContact = {
      id: user.id,
      photo: image,
      name: name,
      phone: phone,
      email: email,
      password: senha,
      service: user.service
    };
    console.log(updatedContact.id)
    dispatch(updateContact(updatedContact.id, updatedContact));
    storeData(updatedContact);
    
    Alert.alert('Conta atualizada com sucesso!'); 
    setTimeout(() => { navigation.navigate('home'); }, 1000);
  };

  const handleDeleteContact = () => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza de que deseja excluir sua conta? Essa ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Exclusão cancelada'),
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            dispatch(removeContact(user.id));
            Alert.alert('Conta excluída com sucesso!'); 
            setTimeout(() => { 
              navigation.navigate('start'); 
            }, 1000);
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const storeData = async (contact) => {
    try {
      await AsyncStorage.setItem('@login', JSON.stringify(contact));
      console.log('Dados salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar dados: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('../assets/cadeira.jpg')}
        resizeMode="cover"
        imageStyle={{ opacity: 0.3 }}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate('home')}>
        <Ionicons name="chevron-back-circle-outline" color={"#f8bf39"} size={40} />
        <Text style={styles.text}> voltar</Text>
        </TouchableOpacity>
        <View style={styles.subContainer}>
        <TouchableOpacity
          style={styles.close}
          onPress={handleDeleteContact}>
        <Ionicons name="trash-outline" color={"#f8bf39"} size={40} />)
          <Text style={styles.text}> Excluir</Text>
          <Text style={styles.text}>  conta</Text>
        </TouchableOpacity>
            {image ? (
              <Image source={{ uri: image }} style={styles.previewImage} />
            ) : (<Ionicons name="person-circle-outline" color={"#f8bf39"} size={100} />)}
          <Text style={styles.text}>Atualizar Conta</Text>
            <View  style={styles.iconContainer}>
              <Text style={styles.textButton}>+</Text>
              <TouchableOpacity onPress={takePhoto}>
                <Ionicons name="camera-outline" color={"#f8bf39"} size={40} />
              </TouchableOpacity>

              <TouchableOpacity onPress={pickImage}>
                <Ionicons name="image-outline" color={"#f8bf39"} size={40} />
              </TouchableOpacity>
            </View>
          <TextInput
            style={styles.textInput}
            placeholder="Nome completo"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Telefone"
            placeholderTextColor="#888"
            keyboardType="numeric"
            onChangeText={handlePhone}
            maxLength={15}
            value={phone}
          />
          <TextInput
            style={styles.textInput}
            placeholder="E-mail"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
              style={styles.textInput}
              placeholder="Senha"
              placeholderTextColor="#888"
              value={senha}
              onChangeText={(value) => setSenha(value)}
            />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleUpdateContact}>
          <Text style={styles.textButton}>Atualizar</Text>
        </TouchableOpacity>
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
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#202020',
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
    padding: 10,
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
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
  text: {
    color: '#fff',
    alignItems: 'center',
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
  previewImage: {
    width: 100,
    height: 100,
    borderRadius:50,
    marginTop: 10,
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
  close: {
    position: 'absolute',
    top: 15,            
    right: 20,           
    zIndex: 1,           
  },
  back: {
    position: 'absolute',
    top: 30,            
    left: 20,           
    zIndex: 1,           
  },
});

export default Atualizar;
