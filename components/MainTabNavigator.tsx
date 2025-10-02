import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

// Import your screen components
import HomeScreen from '../pages/Student/StudentScreen'; 
import DocumentsScreen from './screens/DocumentsScreen';
import RequestsScreen from './screens/RequestsScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-filled';
                break;
              case 'Documents':
                iconName = focused ? 'description' : 'description';
                break;
              case 'Requests':
                iconName = focused ? 'assignment' : 'assignment';
                break;
              case 'Notifications':
                iconName = focused ? 'notifications' : 'notifications-none';
                break;
              case 'Profile':
                iconName = focused ? 'person' : 'person-outline';
                break;
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'teal',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Documents" component={DocumentsScreen} />
        <Tab.Screen name="Requests" component={RequestsScreen} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
