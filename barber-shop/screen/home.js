import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Image,
  Linking,
  Dimensions,
  FlatList
} from 'react-native';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

export default function Home({ navigation }) {
  const barbers = useSelector((state) => state.barbers);
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBarber, setSelectedBarber] = useState(null);

  const { width, height } = Dimensions.get('window');

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/place/R.+Goiaba+Natal+-+Vila+Natal,+S%C3%A3o+Paulo+-+SP,+04863-220/@-23.7619214,-46.7073676,19.33z/data=!4m6!3m5!1s0x94ce4f2a49632bd1:0xf4d26f4c16e8212!8m2!3d-23.7618979!4d-46.7069218!16s%2Fg%2F1ptxk878_?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D`;
    Linking.openURL(url).catch(err => console.error("Error opening Google Maps: ", err));
  };

  const handleMarkerPress = (barber) => {
    setSelectedBarber(barber);
    setModalVisible(true);
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@login');
      if (value !== null) {
        const contact = JSON.parse(value);
        setName(contact.name);
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
    <ScrollView style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.title}>Olá, <Text style={styles.titleYellow}>{name}</Text></Text>
        <Text style={styles.subTitle}>Seja Bem-vindo(a)</Text>
      </View>

      <View style={styles.swiperContainer}>
        <Swiper style={styles.wrapper} showsButtons={false} autoplay={true} dotColor="grey" activeDotColor="#F8BF39">
          <View style={styles.slide}>
            <ImageBackground
              style={styles.image}
              source={require('../assets/blackbarber_with_border.webp')}
              resizeMode="cover"
              imageStyle={{ opacity: 1 }}
            />
          </View>
          <View style={styles.slide}>
            <ImageBackground
              style={styles.image}
              source={require('../assets/barberanuncio.webp')}
              resizeMode="cover"
              imageStyle={{ opacity: 1 }}
            />
          </View>
          <View style={styles.slide}>
            <ImageBackground
              style={styles.image}
              source={require('../assets/anuncioRedes.webp')}
              resizeMode="cover"
              imageStyle={{ opacity: 1 }}
            >
            </ImageBackground>
          </View>
        </Swiper>
      </View>

      <Text style={styles.sectionTitle}>Barbeiros</Text>

      <FlatList
        data={barbers}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: barber }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleMarkerPress(barber)}>
            <ImageBackground
              source={barber.image ? { uri: barber.image } : require('../assets/background.jpg')}
              style={styles.image}
              imageStyle={{ borderRadius: 13 }}
            />
            <Text style={styles.cardText}>{barber.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.Barbeiros}
        showsHorizontalScrollIndicator={false}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          {selectedBarber && (
            <>
              <Image
                style={styles.imageCard}
                source={selectedBarber.image ? { uri: selectedBarber.image } : require('../assets/background.jpg')}
              />
              <Text style={styles.modalText}>{selectedBarber.name}</Text>
              <Text style={styles.modalDesc}>{selectedBarber.description}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textButton}>Fechar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>

      <Text style={styles.footerText}>____________________________</Text>
      <View style={styles.endereco}>
        <TouchableOpacity onPress={openGoogleMaps}>
          <ImageBackground
            style={styles.imageEndereco}
            source={require('../assets/endereco.png')}
            resizeMode="cover"
            imageStyle={{ opacity: 0.8 }}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    alignItems: 'center',
  },
  containerText: {
    marginTop: 100,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
    overflow: 'hidden',
    resizeMode: 'cover',
    alignSelf: 'flex-end', 
  },
  imageCard: {
    width: 200,
    height: 200,
    borderRadius: 13,
    overflow: 'hidden'
  },
  imageEndereco: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
    overflow: 'hidden'
  },
  title: {
    color: '#fff',
    fontSize: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    marginLeft:10,
  },
  titleYellow: {
    color: '#F8BF39',
  },
  subTitle: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 50,
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
  swiperContainer: {
    margin: 10,
    borderRadius: 9,
    height: 300,
    width: 350,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  endereco: {  
    height:200,
    width:350,
    borderRadius: 13,
    margin: 15
  },
  Barbeiros: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    padding: 10,
  },
  card: {
    width: 100,
    height: 100,
    borderRadius: 13,
    alignItems: 'center',
    margin: 10,
  },
  cardText: {
    marginTop: 5,
    textAlign: 'center',
    color: '#202020',
  },
  modalView: {
    flex: 1,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalText: {
    margin: 15,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  modalDesc: {
    marginBottom: 10,
    textAlign: 'left',
    color: '#fff',
    fontSize: 14,
    width:320,
  },
  footerText: {
    color: '#f8bf39',
    marginTop:-10,
    margin:'auto'
  }
});
