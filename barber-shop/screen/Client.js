import { View, Text, StyleSheet, ImageBackground, Modal, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { removeContact } from '../redux/actions'; 

export default function Client({ navigation }) {
  const contacts = useSelector((state) => state.contacts);  
  const dispatch = useDispatch();
  const handleDeleteContact = (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza de que deseja excluir essa conta? Essa ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Exclusão cancelada'),
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            dispatch(removeContact(id));
            Alert.alert('Conta excluída com sucesso!'); 
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

 const renderCard = ({ item }) => {
  const services = item.service;
  return (
    <View style={styles.card}>
        <Image
          style={styles.modalLogo}
          source={require('../assets/Goiabarber.png')}
        />
      <View style={styles.options}>
        <TouchableOpacity onPress={() => handleDeleteContact(item.id)}>
          <Ionicons name="trash-outline" size={30} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.subtitle}>{item.name}</Text>
        <Text style={styles.text}>Id: {item.id}</Text>
        <Text style={styles.text}>Telefone: {item.phone}</Text>
        <Text style={styles.text}>Email: {item.email}</Text>
        {services && services.length > 0 ? (
          services.map((service, index) => (
            <View key={index}>
              <Text style={styles.textButton}>Serviço</Text>
              <Text style={styles.textyellow}>{service.service}</Text>
              <Text style={styles.text}>Data: {service.date}</Text>
              <Text style={styles.text}>Horário: {service.time}</Text>
              <Text style={styles.text}>Forma de Pagamento: {service.payment}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.text}>Serviço: Não informado</Text>
        )}
      </View>
    </View>
  );
};



  return(
  <View style={styles.container}>
    <ImageBackground
        style={styles.image}
        source={require('../assets/background.jpg')}
        resizeMode="cover"
        imageStyle={{ opacity: 0.3 }}>
      <Text style={styles.title}>Clientes</Text>
      <Text style={styles.footerText}>____________________________</Text>
      <FlatList
      data={contacts}
      renderItem={renderCard}
      keyExtractor={(item, index) => index.toString()}
      style={{ width: '100%'}} 
      />  
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
    display:'flex',
    flexDirection:'column',
    width:'90%'
  },
  modalLogo:{
    height: 100,
    width: 200,
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 20,
    color:'#fff',
    fontStyle: 'italic',
    fontWeight: '900'
  },
  text: {
    color: '#fff',
  },
  textyellow: {
    fontSize: 16,
    color: '#f8bf39',
  },
  title: {
    fontSize: 40,
    color:'#fff',
    fontStyle: 'italic',
    fontWeight: '900', 
    marginTop:100,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    color: '#f8bf39',
    marginBottom: 5,
  },
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#202020',
    backgroundColor: '#202020',
    width: '90%',
    alignSelf: 'center',
  },
  footerText: {
    color: '#f8bf39',
    marginTop:-30,
    margin:'auto',
    marginBottom:20,
  },
  options: {
    position:'absolute',
    flexDirection: 'row',    
    top:20,
    right:10,
    gap:5,
  },
});