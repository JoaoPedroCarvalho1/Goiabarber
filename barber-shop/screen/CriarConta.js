import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ActivityIndicator,
  Image
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../redux/actions'; 
import * as ImagePicker from 'expo-image-picker';

function CriarConta ({ navigation }) {
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  
  const [name, setname] = useState('');
  const [phone, setphone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePhone = (value) => {
    value = value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    setphone(value);
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
    setImage(result.assets[0].uri); // Ajuste para acessar `result.assets[0].uri`
    console.log("Image URI:", result.assets[0].uri); // Verifique se o URI é válido
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

  const handleCreateAccount = () => {

    if (!name || !phone || !email || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (!validateEmail()) {
      alert("E-mail inválido");
      return;
    }

    const existingContact = contacts.find((contact) => contact.email === email);
    if (existingContact) {
      alert("Este e-mail já está em uso. Tente outro e-mail ou faça login.");
      return;
    }

    setIsLoading(true);

    const newContact = {
      id: contacts.length + 1,
      photo: image,
      name: name,
      phone: phone,
      email: email,
      password: senha,
      service: []
    };

    dispatch(addContact(newContact));
    Alert.alert("Conta criada!");

    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("login");
    }, 1000);
  };

    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require('../assets/cadeira.jpg')}
          resizeMode="cover"
          imageStyle={{ opacity: 0.3 }}>
        <Image
          style={styles.logo}
          source={require('../assets/Goiabarber.png')}></Image>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate('login')}>
        <Ionicons name="chevron-back-circle-outline" color={"#f8bf39"} size={50} />
        <Text style={styles.text}>  Voltar</Text>
        </TouchableOpacity>
          <View style={styles.subContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.previewImage} />
            ) : (
              <Ionicons name="person-circle-outline" color={"#f8bf39"} size={100} />
            )}
            <Text style={styles.text}>Criar Conta</Text>
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
              onChangeText={(value) => setname(value)}
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
              onChangeText={(value) => setEmail(value)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Senha"
              placeholderTextColor="#888"
              secureTextEntry
              onChangeText={(value) => setSenha(value)}
            />
        </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleCreateAccount}>
              <Text style={styles.textButton}>Criar</Text>
            </TouchableOpacity>
        <Text style={styles.linkCCWhite}  onPress={() => navigation.navigate('login')}>Já tem conta? <Text style={styles.linkCC}>Clique aqui</Text>
         </Text>
         {isLoading && <ActivityIndicator size="large" color="#f8bf39" style={styles.loading} />}
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
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#202020',
    borderColor: '#202020',
    height:500,
    borderWidth: 1,
    borderRadius: 20,
    margin:10,
    padding:10,
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
    width: 500,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    margin: 5,
    padding: 10,
    borderRadius: 9,
    marginBottom:10,
    textAlignments: 'center',
    color: '#fff',
    backgroundColor:'#2B2B2B',
    width: 300,
  },
  text: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#f8bf39',
    padding: 12,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 9,
    borderColor: '#f8bf39',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: 300,
  },
   textButton: {
    fontSize: 20,
    color:'#fff',
    fontStyle: 'italic',
    fontWeight: '900'
  },
  linkCC: {
    color: '#f8bf39',
    textDecorationLine: 'underline',
  },
  linkCCWhite: {
    color: '#fff',
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius:50,
    marginTop: 10,
  },
  logo: {
    height: 110,
    width: 250,
    margin:'auto',
    marginTop: 10,
    marginBottom:0,
  },
  back: {
    position: 'absolute',
    top: 30,            
    left:90,           
    zIndex: 1,           
  },
});

export default CriarConta;
