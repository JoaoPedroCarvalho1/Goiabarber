import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { updateContact } from '../redux/actions'; 
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Marcar({ navigation }) {
  const [selectedService, setSelectedService] = useState('25');
  const [selectedBarber, setSelectedBarber] = useState('Diego');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [user, setUser] = useState('');
  const dispatch = useDispatch();

  const handleUpdateContact = (contact) => {
    if (!contact || !contact.id) {
      console.error("Contato inválido:", contact);
      return;
    }
    const id = contact.id; 
    const updatedData = contact
    dispatch(updateContact(id, updatedData));
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@login');
      if (value !== null) {
        setUser(value);
      }
    } catch (e) {
      console.error(e);
    }
  };
  
  useEffect(() => {
    getData();
  }, []);

  const storeData = async (contact) => {
  try {
    await AsyncStorage.setItem('@login', JSON.stringify(contact));
    console.log('Dados salvos com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar dados: ', error);
  }

  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);

    if (mode === 'date') {
      setMode('time');
      setShow(true);
    }
  };

  const showMode = (currentMode) => {
    setMode(currentMode);
    setShow(true);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const update = () => {
    if (!selectedBarber || !selectedService) {
      alert('Por favor, selecione um serviço e um barbeiro.');
      return;
    }

    let contato = JSON.parse(user);
    let setService = {
      id: contato.service.length + 1,
      barber: selectedBarber,
      service: selectedService,
      date:date.toLocaleDateString(),
      time:date.toLocaleTimeString(),
      address:"R. Goiaba Natal - Vila Natal",
    }
    
    contato.service.push(setService);
    storeData(contato);
    handleUpdateContact(contato);
    getData();
    navigation.navigate('home')
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('../assets/cadeira.jpg')}
        resizeMode="cover"
        imageStyle={{ opacity: 0.5 }}>
        <View style={styles.container}>
          <Text style={styles.subTitle}>Serviço</Text>
          <View style={styles.selectInputContainer}>
            <Ionicons name="briefcase-outline" color={'#f8bf39'} size={20} />
            <Picker
              style={styles.selectInput}
              selectedValue={selectedService}
              onValueChange={(itemValue) => setSelectedService(itemValue)}>
              <Picker.Item label="Corte de Cabelo" value="25" />
              <Picker.Item label="Barba" value="20" />
              <Picker.Item label="Barba e Cabelo" value="45" />
              <Picker.Item label="Sobrancelha" value="10" />
            </Picker>
          </View>
          <Text style={styles.subTitle}>Barbeiro</Text>
          <View style={styles.selectInputContainer}>
            <Ionicons name="person-outline" color={'#f8bf39'} size={20} />
            <Picker
              style={styles.selectInput}
              selectedValue={selectedBarber}
              onValueChange={(itemValue) => setSelectedBarber(itemValue)}>
              <Picker.Item label="Diego" value="Diego" />
              <Picker.Item label="Felipe" value="Felipe" />
            </Picker>
          </View>
          <Text style={styles.subTitle}>Data e Horário</Text>
          <TouchableOpacity style={styles.textInput} onPress={showDatepicker}>
            <Ionicons name="calendar-outline" color={'#f8bf39'} size={20} />
            <Text style={styles.text}>{date.toLocaleString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={update}>
            <Text style={styles.textButton}>Agendar</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  textInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    margin: 5,
    padding: 10,
    textAlign: 'center',
    borderRadius: 9,
    textAlignments: 'center',
    color: '#fff',
    backgroundColor: '#2B2B2B',
    width: 300,
    marginBottom: 10,
  },
  selectInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    margin: 5,
    padding: 10,
    borderRadius: 9,
    marginBottom: 10,
    textAlignments: 'center',
    color: '#fff',
    backgroundColor: '#2B2B2B',
    width: 300,
  },
  selectInput: {
    color: '#fff',
    width: 250,
  },
  subTitle: {
    fontSize: 14,
    color: '#fff',
    fontStyle: 'italic'
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
    color: '#fff',
    fontStyle: 'italic',
    fontWeight: '900',
  },
});