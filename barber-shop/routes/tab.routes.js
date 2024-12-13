import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '../screen/home';
import Calendar from '../screen/Calendar';
import Profile from '../screen/Profile';

const Tab = createBottomTabNavigator();

const activeColor = '#f8bf39';
const inactiveColor = '#ffe58f';
const tabBarBackground = '#202020';

export default function TabRoutes() {
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
        name="Agenda"
        component={Calendar}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons 
              name={color === activeColor ? "calendar" : "calendar-outline"} 
              color={color} 
              size={size} 
            />
          ),
          tabBarLabel: 'Agenda',
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
