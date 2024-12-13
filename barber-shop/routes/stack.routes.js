import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from '../screen/start';
import TelaLogin from '../screen/Login';
import CriarConta from '../screen/CriarConta';
import Marcar from '../screen/Marcar';
import Calendar from '../screen/Calendar';
import atualizar from '../screen/atualizar';
import atualizarAdmin from '../screen/atualizarAdmin';
import TabRoutes from './tab.routes';
import TabAdmin from './tab.routesAdmin';
const Stack = createNativeStackNavigator();

export default function StackRoutes(){
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
      name="start"
      component={Start}
      /> 
      
      <Stack.Screen
      name="login"
      component={TelaLogin}
      />

    <Stack.Screen
      name="conta"
      component={CriarConta}
    />

    <Stack.Screen
      name="home"
      component={TabRoutes}
    />

    <Stack.Screen
      name="admin"
      component={TabAdmin}
    />

    <Stack.Screen
      name="marcar"
      component={Marcar}
    />

    <Stack.Screen
      name="calendar"
      component={Calendar}
    />

    <Stack.Screen
      name="atualizar"
      component={atualizar}
    />

    <Stack.Screen
      name="atualizarAdmin"
      component={atualizarAdmin}
    />

    </Stack.Navigator>
  )
}