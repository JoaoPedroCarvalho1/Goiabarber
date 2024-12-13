import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
export default function Start({ navigation }) {

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
          <Text style={styles.titleButtonGrey}>Selecione o seu perfil</Text>
          <Text style={styles.footerText}>______________</Text>
        <TouchableOpacity style={styles.buttonGrey} onPress={() => navigation.navigate('login')}>
        <Image
          style={styles.icon}
          source={require('../assets/imageFazerLogin.png')}></Image>
          <View>
          <Text style={styles.titleButtonGrey}>Fazer Login</Text>
          <Text style={styles.textButtonGrey}>Faça login em sua conta e aproveite nossos serviços.</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonYellow} onPress={() => navigation.navigate('conta')}>
        <Image
          style={styles.icon}
          source={require('../assets/imageRegistrar.png')}></Image>
          <View>
          <Text style={styles.titleButtonYellow}>Registrar Conta</Text>
          <Text style={styles.textbuttonYellow}>Encontre o melhor da Barbearia para você.</Text>
          </View>
        </TouchableOpacity>
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
  footerText: {
    color: '#f8bf39',
    marginTop:-10
  },
  buttonYellow: {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap:12,
    backgroundColor: '#f8bf39',
    padding: 12,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 9,
    borderColor: '#f8bf39',
    marginTop: 20,
    marginBottom: 20,
    width: 300,
  },
  titleButtonYellow: {
    fontSize: 16,
    color:'#202020',
    fontStyle: 'italic',
    fontWeight: '900'
  },
  textbuttonYellow: {
    fontSize: 16,
    color:'#202020',
    width:200
  },
  buttonGrey: {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap:12,
    backgroundColor: '#202020',
    padding: 12,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 9,
    borderColor: '#f8bf39',
    marginTop: 16,
    marginBottom: 20,
    width: 300,
  },
    titleButtonGrey: {
    fontSize: 16,
    color:'#fff',
    fontStyle: 'italic',
    fontWeight: '900'
  },
  textButtonGrey: {
    fontSize: 16,
    color:'#fff',
    width:200
  },
});