import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; 

export default function Profile({ navigation }) {

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');
  const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@login');
    if (value !== null) {
      const contact = JSON.parse(value);
      setId(contact.id);
      setName(contact.name);
      setEmail(contact.email);
      setPhone(contact.phone);
      setImage(contact.photo);
    }
  } catch (e) {
    console.error(e);
  }
};
  useFocusEffect(
    React.useCallback(() => {
      getData(); 
    }, [])
  );

  return (
    <View style={styles.container} >
        <ImageBackground
        style={styles.image}
        source={require('../assets/background.jpg')}
        resizeMode="cover"
        imageStyle={{ opacity: 0.3 }}>
        <Image
          style={styles.logo}
          source={require('../assets/Goiabarber.png')}></Image>
        <View style={styles.subContainer}>
          <TouchableOpacity style={styles.edit} onPress={id != 1 ? () => navigation.navigate('atualizar') : () => navigation.navigate('atualizarAdmin')}>
            <Ionicons name="create-outline" color={'#f8bf39'} size={40} />
            <Text style={styles.textCC}>Editar Perfil</Text>
          </TouchableOpacity>
            {image ? (
              <Image source={{ uri: image }} style={styles.previewImage} />
            ) : (
              <Ionicons name="person-circle-outline" color={"#f8bf39"} size={100} />
            )}
          <Text style={styles.textBold}>Nome</Text>
          <View style={styles.textInput}>
            <Ionicons name="mail-outline" color={"#f8bf39"} size={20}/>
            <Text style={styles.text}>{name}</Text>
          </View>
          <Text style={styles.textBold}>Email</Text>
          <View style={styles.textInput}>
            <Ionicons name="mail-outline" color={"#f8bf39"} size={20}/>
            <Text style={styles.text}>{email}</Text>
          </View>
          <Text style={styles.textBold}>Telefone</Text>
          <View style={styles.textInput}>
            <Ionicons name="call-outline" color={"#f8bf39"} size={20}/>
            <Text style={styles.text}>{phone}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('start')}>
          <Text style={styles.textButton}>Logout</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display:"flex",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#202020'
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#202020',
    borderColor: '#202020',
    height:450,
    borderWidth: 1,
    borderRadius: 20,
    margin:10,
    padding:10,
    paddingTop:5,
  },
  image: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  textInput: {
    display:"flex",
    flexDirection:"row",
    alignItems: 'center',
    gap:8,
    padding: 10,
    textAlign: 'center',
    margin: 5,
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
  textBold: {
    color: '#fff',
    fontStyle: 'italic',
    fontWeight: '900'
  },
  textButton: {
    fontSize: 20,
    color:'#fff',
    fontStyle: 'italic',
    fontWeight: '900'
  },
  button: {
    backgroundColor: '#f8bf39',
    padding: 12,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 9,
    borderColor: '#f8bf39',
    width: 300,
    marginLeft:"auto",
    marginRight:"auto",
    display:"flex",
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'center',
    gap:10,
  },
  textCC:{
    color:'#fff',
    fontSize:8,
    fontStyle: 'italic',
    fontWeight: '900'
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
  edit: {
    position: 'absolute',
    top: 10,            
    right: 10,           
    zIndex: 1,           
  },
})
