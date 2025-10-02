import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Onboarding from './pages/Onboarding/onboarding';
import Login from './pages/Login/Login';
import StudentUserScreen from './pages/user/student_user'; 
import ParentUserScreen from './pages/user/parent_user';
import PersonnelUserScreen from './pages/user/personnel_user';

import { StatusBar } from 'expo-status-bar';

import './global.css';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'InterBold': require('./assets/fonts/Inter-Bold.ttf'),
        'InterExtraBold': require('./assets/fonts/Inter-ExtraBold.ttf'),
        'InterLight': require('./assets/fonts/Inter-Light.ttf'),
        'InterMedium': require('./assets/fonts/Inter-Medium.ttf'),
        'InterRegular': require('./assets/fonts/Inter-Regular.ttf'),
        'InterSemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="StudentUser" component={StudentUserScreen} />
        <Stack.Screen name="ParentUser" component={ParentUserScreen} />
        <Stack.Screen name="PersonnelUser" component={PersonnelUserScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
