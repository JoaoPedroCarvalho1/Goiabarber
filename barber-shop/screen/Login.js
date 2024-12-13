import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaLogin({ navigation }) {
  const contacts = useSelector((state) => state.contacts);
  const [email, setEmail] = useState(null);
  const [senha, setSenha] = useState(null);

  const storeData = async (contact) => {
  try {
    await AsyncStorage.setItem('@login', JSON.stringify(contact));
    console.log('Dados salvos com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar dados: ', error);
  }

  };

  const validateEmail = () => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const check = () => {
    
    if (!email) {
      alert("Digite o Email");
      return;
    }

    if (!senha) {
      alert("Digite a Senha");
      return;
    }


    if (!validateEmail()) {
      alert("E-mail inválido");
      return;
    }

    const contact = contacts.find((element) => element.email === email);
    if (!contact) {
      alert("Conta não encontrada. Verifique o e-mail ou cadastre-se.");
      return;
    }

    if (contact.password !== senha) {
      alert("Senha incorreta. Tente novamente.");
      return;
    }

    storeData(contact);
    if (contact.id === 1) {
      navigation.navigate("admin");
    } else {
      navigation.navigate("home");
    }
  };


  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('../assets/background.jpg')}
        resizeMode="cover"
        imageStyle={{ opacity: 0.3 }}>
        <Image
          style={styles.logo}
          source={require('../assets/Goiabarber.png')}></Image>
        <Text style={styles.text}>Email:</Text>
        <TextInput
          placeholderTextColor="gray"
          style={styles.textInput}
          keyboardType="text"
          placeholder="Email"
          onChangeText={(value) => setEmail(value)}
        />
        <Text style={styles.text}>Senha:</Text>
        <TextInput
          placeholderTextColor="gray"
          style={styles.textInput}
          keyboardType="password"
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={(value) => setSenha(value)}
        />
        <TouchableOpacity style={styles.button} onPress={() => check()}>
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.linkCCWhite}  onPress={() => navigation.navigate('conta')}>Não tem conta? <Text style={styles.linkCC}>Clique aqui</Text>
         </Text>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  image: {
    flex: 1,
    width: 500,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 250,
    width: 250,
    marginBottom: 10,
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
    textAlign:'left',
    color: '#fff',
    fontStyle: 'italic',
    fontWeight: '900',
    marginLeft:30,
    width:300
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
});