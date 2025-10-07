import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';

// Screens
import SplashScreen from './pages/Splash/SplashScreen';
import Onboarding from './pages/Onboarding/onboarding';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/Login/ForgotPassword';
import CodeVerification from "./pages/Login/CodeVerification";
import ResetPassword from "./pages/Login/ResetPassword";
import StudentTabs from './pages/Student/navigation/StudentTabs';
import ParentTabs from './pages/Parent/navigation/ParentTabs';
import PersoTabs from './pages/Personnel/navigation/PersoTabs';
import PersonnelUserScreen from './pages/Personnel/navigation/PersoTabs';
import RequestsScreen from './pages/Student/RequestsScreen';
import DocumentsScreen from './pages/Student/DocumentsScreen';
import DetailsPage from './pages/Personnel/frames/DetailsPage';

import './global.css';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true); // Splash state

  useEffect(() => {
    async function loadResources() {
      // Load custom fonts
      await Font.loadAsync({
        InterBold: require('./assets/fonts/Inter-Bold.ttf'),
        InterExtraBold: require('./assets/fonts/Inter-ExtraBold.ttf'),
        InterLight: require('./assets/fonts/Inter-Light.ttf'),
        InterMedium: require('./assets/fonts/Inter-Medium.ttf'),
        InterRegular: require('./assets/fonts/Inter-Regular.ttf'),
        InterSemiBold: require('./assets/fonts/Inter-SemiBold.ttf'),
      });
      setFontsLoaded(true);

      // Hide Android navigation bar persistently
      if (Platform.OS === 'android') {
        await NavigationBar.setVisibilityAsync('hidden');
        await NavigationBar.setBehaviorAsync('immersiveSticky');
      }
    }

    loadResources();
  }, []);

  if (!fontsLoaded) return <AppLoading />;

  return (
    <NavigationContainer>
      {showSplash ? (
        // Show splash screen first
        <SplashScreen onAnimationComplete={() => setShowSplash(false)} />
      ) : (
        // Then show the main stack
        <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="CodeVerification" component={CodeVerification} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="StudentUser" component={StudentTabs} />
          <Stack.Screen name="ParentUser" component={ParentTabs} />
          <Stack.Screen name="PersoTabs" component={PersoTabs} />
          <Stack.Screen name="PersonnelUser" component={PersonnelUserScreen} />
          <Stack.Screen name="RequestsScreen" component={RequestsScreen} />
          <Stack.Screen name="DocumentsScreen" component={DocumentsScreen} />
          <Stack.Screen name="DetailsPage" component={DetailsPage} />
        </Stack.Navigator>
      )}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
