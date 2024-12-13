import { View, Text, StyleSheet, ImageBackground, Image, FlatList, Modal, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; 
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';
import { updateContact } from '../redux/actions'; 
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  cardNumber: yup
    .number()
    .test('len', 'O número do cartão deve conter 16 dígitos', val => val && val.toString().length === 16)
    .required('Número do cartão é obrigatório'),
  expirationDate: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Formato da data MM/AA')
    .required('Data de validade é obrigatória'),
  cvv: yup
    .string()
    .matches(/^[0-9]{3,4}$/, 'O CVV deve ter 3 ou 4 dígitos')
    .required('CVV é obrigatório'),
});

export default function Calendar({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState('Corte de cabelo');
  const [selectedBarber, setSelectedBarber] = useState('caio');
  const services = useSelector((state) => state.services);
  const barbers = useSelector((state) => state.barbers);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [user, setUser] = useState('');
  const [editingService, setEditingService] = useState(null);
  const [Checkout, setCheckout] = useState(false);
  const [selectedPayment, setselectedPayment] = useState(null);
  const [selectedFlag, setselectedFlag] = useState(null);
  const dispatch = useDispatch();

  const handleUpdateContact = (contact) => {
    if (!contact || !contact.id) {
      console.error("Contato inválido:", contact);
      return;
    }
    const id = contact.id; 
    const updatedData = contact;
    dispatch(updateContact(id, updatedData));
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@login');
      if (value !== null) {
        setUser(value);
        const parsedContacts = JSON.parse(value);
        setContacts(parsedContacts.service || []);
        setName(parsedContacts.name); 
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
  
    // Verificar se a hora está dentro do intervalo permitido (8h às 20h)
    const selectedHour = currentDate.getHours();
    if (selectedHour < 8 || selectedHour > 20) {
      // Se a hora for menor que 8h ou maior que 20h, ajusta para o limite mais próximo
      const adjustedDate = new Date(currentDate);
      adjustedDate.setHours(selectedHour < 8 ? 8 : 20, 0, 0, 0);
      setDate(adjustedDate);
    }

  setShow(false);
  setDate(currentDate);

  if (mode === 'date') {
    setMode('time');
    setShow(true);
  }
};


const showTimepicker = () => {
  setMode('time');
  setShow(true);
};

const handleUpdate = () => {
  if (!selectedBarber || !selectedService) {
    alert('Por favor, selecione um serviço e um barbeiro.');
    return;
  }
  let contato = JSON.parse(user);

  const newService = {
    id: contato.service.length + 1,
    barber: selectedBarber,
    service: selectedService,
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
    address: "R. Goiaba Natal - Vila Natal",
    value: '',
    payment: selectedPayment,
  };

  contato.service.push(newService);

  storeData(contato);
  handleUpdateContact(contato);
  getData();
  setModalVisible(false);
  setCheckout(false);
};


  const showMode = (currentMode) => {
    setMode(currentMode);
    setShow(true);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const formatExpirationDate = (text) => {
    // Remove qualquer caracter não numérico
    const cleanedText = text.replace(/\D/g, '');
    
    // Formata para MM/AA
    if (cleanedText.length <= 2) {
      return cleanedText; // Apenas o mês (MM)
    } else if (cleanedText.length <= 4) {
      return `${cleanedText.slice(0, 2)}/${cleanedText.slice(2, 4)}`; // MM/AA
    }
    
    return cleanedText.slice(0, 5); // Limita para no máximo 5 caracteres (MM/AA)
  };

  const renderScreen = () => {
    switch (Checkout) {
      case false:
        return<View style={styles.container}>
      <View style={styles.containerModal}>
        <TouchableOpacity style={styles.close} onPress={closeModal}>
          <Ionicons name="close-outline" color={'#f8bf39'} size={50} />
        </TouchableOpacity>
        {/* Logo */}
        <Image
          style={styles.modalLogo}
          source={require('../assets/Goiabarber.png')}
        />
        <Text style={styles.title}>Olá, <Text style={styles.titleYellow}>{name}</Text></Text>
        <Text style={styles.subTitle}>Faça seu agendamento</Text>
        <Text style={styles.footerText}>____________________________</Text>
        {/* Service Section */}
        <View style={styles.containerSubtitle}>
          <Text style={styles.textBold}>Serviço</Text>
        </View>
        <View style={styles.selectInputContainer}>
          <Image style={styles.icon}
          source={require('../assets/image.png')}/>
          <Picker
            style={styles.selectInput}
            selectedValue={selectedService}
            onValueChange={(itemValue) => setSelectedService(itemValue)}
          >
          {services.map((service, index) => (
            <Picker.Item key={index} label={service.name} value={service.name} />
          ))}
          </Picker>
        </View>

        {/* Barber Section */}
        <View style={styles.containerSubtitle}>
          <Text style={styles.textBold}>Barbeiro</Text>
        </View>
        <View style={styles.selectInputContainer}>
          <Image style={styles.icon}
          source={require('../assets/imageRegistrar.png')}/>
          <Picker
            style={styles.selectInput}
            selectedValue={selectedBarber}
            onValueChange={(itemValue) => setSelectedBarber(itemValue)}
          >
            {barbers.map((barber) => (
              <Picker.Item key={barber.id} label={barber.name} value={barber.name} />
            ))}
          </Picker>
        </View>

        {/* Date and Time Picker */}
        <View style={styles.containerSubtitle}>
          <Text style={styles.textBold}>Data e Horário</Text>
        </View>
        <TouchableOpacity style={styles.textInput} onPress={showDatepicker}>
          <Image style={styles.icon}
          source={require('../assets/calendario.png')}/>
          <Text style={styles.textBold}>{date.toLocaleString()}</Text>
        </TouchableOpacity>

        {/* Confirm Button */}
        <TouchableOpacity style={styles.button} onPress={goCheckout}>
          <Text style={styles.textButton}>Confirmar</Text>
        </TouchableOpacity>

        {/* DateTimePicker */}
        {show && (
      <DateTimePicker
        value={date}
        mode={mode}
        is24Hour={true}
        display="default"
        onChange={onChange}
        minimumDate={new Date(new Date().setDate(new Date().getDate() + 1))}
      />
        )}

      </View>
    </View>
      case true:
        return <View style={styles.containerModal}>
      <TouchableOpacity style={styles.close} onPress={closeModal}>
        <Ionicons name="close-outline" color={'#f8bf39'} size={50} />
      </TouchableOpacity>
        <View style={styles.containerModal}>
          {services.filter((service) => service.name == selectedService)
            .map((service) => (
              console.log(service),
              <Text key={service.name} style={styles.title}>
                Valor: {service.value},00 R$
              </Text>
            ))}
          <Text style={styles.subTitle}>Forma de Pagamento</Text>
          <View style={styles.selectInputContainer}>
            <Ionicons name="briefcase-outline" color={'#f8bf39'} size={20} />
            <Picker
              style={styles.selectInput}
              selectedValue={selectedPayment}
              onValueChange={(itemValue) => setselectedPayment(itemValue)}>
              <Picker.Item label="Dinheiro" value="Dinheiro" />
              <Picker.Item label="Cartão de Crédito" value="Cartão" />
              <Picker.Item label="Pix" value="Pix" />
            </Picker>
          </View>
          <View style={styles.paymentScreen}>
            {renderPaymentScreen()}
          </View>
          <TouchableOpacity style={styles.button} onPress={selectedPayment ==  "Cartão" ? handleSubmit(update) : update}>
            <Text style={styles.textButton}>Agendar</Text>
          </TouchableOpacity>
        </View>
    </View>
    }
  };

  const goCheckout = ()=> {
    setCheckout(true);
  };

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCreditCardSubmit = (data) => {
    console.log('Dados do cartão:', data);
    alert("Dados do cartão cadastrados com sucesso!");
    setModalVisible(false);
  };

  const closeModal =() =>{
    setCheckout(false);
    setModalVisible(false)
  };
  const renderPaymentScreen = () => {
    switch (selectedPayment) {
      case 'Dinheiro':
        return <Text style={styles.subTitle}>Você escolheu pagar em dinheiro! Lembramos que o pagamento deverá ser realizado diretamente com o barbeiro no dia do serviço.</Text>;
      case 'Cartão':
              return (
          <View>
            <Controller
              control={control}
              name="cardNumber"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.textInput, errors.cardNumber && styles.errorInput]}
                  keyboardType="numeric"
                  placeholder="Número do Cartão"
                  maxLength={16}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.cardNumber && <Text style={styles.errorText}>{errors.cardNumber.message}</Text>}

            <Controller
              control={control}
              name="cardHolder"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.textInput, errors.cardHolder && styles.errorInput]}
                  placeholder="Nome do Titular"
                  onChangeText={(text) => {
                    const filteredText = text.replace(/[^a-zA-Z\s]/g, '');
                    onChange(filteredText)}}
                  value={value}
                />
              )}
            />
            {errors.cardHolder && <Text style={styles.errorText}>{errors.cardHolder.message}</Text>}

            <Controller
              control={control}
              name="expirationDate"
              render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.textInput, errors.expirationDate && styles.errorInput]}
                placeholder="MM/AA"
                keyboardType="numeric"
                onChangeText={(text) => onChange(formatExpirationDate(text))}
                maxLength={5}
                value={value}
              />
              )}
            />
            {errors.expirationDate && <Text style={styles.errorText}>{errors.expirationDate.message}</Text>}

            <Controller
              control={control}
              name="cvv"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.textInput, errors.cvv && styles.errorInput]}
                  keyboardType="numeric"
                  placeholder="CVV"
                  secureTextEntry
                  maxLength={3}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.cvv && <Text style={styles.errorText}>{errors.cvv.message}</Text>}
          </View>
        );
      case 'Pix':
        return <Image style={styles.pix} source={require('../assets/qrcode.jpeg')} />
      default:
        return <Text style={styles.subTitle}>Selecione uma forma de pagamento.</Text>;
    }
  };

  const openEditModal = (service) => {
    setSelectedService(service.service);
    setSelectedBarber(service.barber);
    setDate(new Date(`${service.date} ${service.time}`));
    setEditingService(service);
    setModalVisible(true);
  };

  const deleteService = (serviceId) => {
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
            let contato = JSON.parse(user);
            contato.service = contato.service.filter(service => service.id !== serviceId);
            storeData(contato);                  // Salva os dados atualizados localmente
            handleUpdateContact(contato);         // Atualiza o contato com os novos dados
            getData();                            // Recarrega os dados, se necessário
            alert('Serviço excluído com sucesso'); // Exibe mensagem de sucesso
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

const update = () => {
  if (!selectedBarber || !selectedService) {
    alert('Por favor, selecione um serviço e um barbeiro.');
    return;
  }

  let contato = JSON.parse(user);

  if (editingService) {
    // Atualizar serviço existente
    const updatedService = {
      ...editingService,
      barber: selectedBarber,
      service: selectedService,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      value: '',
      payment: selectedPayment,
    };

    const updatedServices = contato.service.map((service) =>
      service.id === updatedService.id ? updatedService : service
    );

    contato.service = updatedServices;

    storeData(contato);
    handleUpdateContact(contato);
    getData();
    alert('Serviço atualizado com sucesso');
    
    // Redefine o estado de edição
    setEditingService(null);
    setModalVisible(false);
    setCheckout(false);
  } else {
    // Adicionar um novo serviço
    let newService = {
      id: contato.service.length + 1,
      barber: selectedBarber,
      service: selectedService,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      address: "R. Goiaba Natal - Vila Natal",
      value: '',
      payment: selectedPayment,
    };

    contato.service.push(newService);

    storeData(contato);
    handleUpdateContact(contato);
    getData();
    setModalVisible(false);
    setCheckout(false);
  }
};

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.options}>
        <TouchableOpacity onPress={() => openEditModal(item)}>
          <Ionicons name="create-outline" size={30} color="#f8bf39" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteService(item.id)}>
          <Ionicons name="trash-outline" size={30} color="red" />
        </TouchableOpacity>
      </View>
      <Image style={styles.logo} source={require('../assets/Goiabarber.png')} />
      <View>
        <Text style={styles.textTitle}>{item.service}</Text>
        <Text style={styles.text}>Barbeiro: {item.barber}</Text>
        <Text style={styles.text}>Data: {item.date}</Text>
        <Text style={styles.text}>Horário: {item.time}</Text>
        <Text style={styles.text}>Forma de Pagamento: {item.payment}</Text>
        <Text style={styles.text}>Endereço: {item.address}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('../assets/cadeira.jpg')}
        resizeMode="cover"
        imageStyle={{ opacity: 0.3 }}
      >
          <TouchableOpacity style={styles.buttonTop} onPress={() => setModalVisible(true)}>
            <Text style={styles.textButton}>Agendar</Text>
          </TouchableOpacity>
        <FlatList
          data={contacts}
          renderItem={renderCard}
          keyExtractor={(item, index) => index.toString()}
          style={{ width: '100%'}} 
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
            {renderScreen()}
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
  containerModal: {
    flex: 1,
    backgroundColor: '#202020',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  containerSubtitle: {
    display:'flex',
    alignItems: 'baseline',
    width:'100%',
    paddingLeft:15
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '85%',
    alignSelf: 'center',
  },
  options: {
    position:'absolute',
    flexDirection: 'row',    
    top:20,
    right:10,
    gap:5,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  textBold: {
    color: '#fff',
    fontStyle: 'italic',
    fontWeight: '900'
  },
  textTitle: {
    color: '#f8bf39',
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  titleYellow: {
    fontSize: 24,
    color: '#F8BF39',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 14,
    color: '#fff',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  logo: {
    height: 80,
    width: 150,
  },
  modalLogo:{
    height: 150,
    width: 250,
  },
  pix:{
    height: 300,
    width: 300,
  },
  icon:{
    height: 35,
    width: 35,
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
  close: {
    position: 'absolute',
    top: 10,            
    right: 10,           
    zIndex: 10,           
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
  modalView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#202020',
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
 errorText: {
    color: 'red',
    marginBottom: 5,
  },
  errorInput: {
    borderColor: 'red',
  },
  footerText: {
    color: '#f8bf39',
    marginBottom:10,
  }
});