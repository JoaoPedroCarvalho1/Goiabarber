import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '../screen/home';
import Calendar from '../screen/Calendar';
import Profile from '../screen/Profile';
import Service from '../screen/Service';
import Client from '../screen/Client';

const Tab = createBottomTabNavigator();

const activeColor = '#f8bf39';
const inactiveColor = '#ffe58f';
const tabBarBackground = '#202020';

export default function TabAdmin() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: tabBarBackground,
          borderTopColor: tabBarBackground,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons 
              name={color === activeColor ? "home" : "home-outline"} 
              color={color} 
              size={size} 
            />
          ),
        }}
      />
     
      <Tab.Screen
        name="Client"
        component={Client}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons 
              name={color === activeColor ? "people" : "people-outline"} 
              color={color} 
              size={size} 
            />
          ),
          tabBarLabel: 'Client',
        }}
      />

      <Tab.Screen
        name="Service"
        component={Service}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons 
              name={color === activeColor ? "bag-add" : "bag-add-outline"} 
              color={color} 
              size={size} 
            />
          ),
          tabBarLabel: 'Service',
        }}
      />


      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons 
              name={color === activeColor ? "person" : "person-outline"} 
              color={color} 
              size={size} 
            />
          ),
          tabBarLabel: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
}
