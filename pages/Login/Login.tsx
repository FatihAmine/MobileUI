import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // ✅ Import navigation hook

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation(); // ✅ Initialize navigation

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top Gradient Image */}
      <View className="absolute top-0 left-0 right-0">
        <Image
          source={require('../../assets/Login_Images/gradient.png')}
          style={{
            width: '100%',
            height: 500,
            resizeMode: 'cover',
            borderBottomLeftRadius: 38,
            borderBottomRightRadius: 38,
          }}
        />
      </View>

      <View className="flex-1 justify-start px-6 pt-16">
        {/* Logo */}
        <Image
          source={require('../../assets/Login_Images/Logo.png')}
          style={{ width: 50, height: 50, marginBottom: 32 }}
        />

        <Text className="font-inter-bold text-3xl mb-4">
          Bienvenue à Maroc Ynov Campus
        </Text>
        <Text className="text-gray-500 font-inter-medium mb-8 leading-relaxed">
          Accédez à vos documents scolaires en toute simplicité
        </Text>

        <Text className="font-inter-bold text-[25px] mb-6">Connexion</Text>

        <Text className="font-inter-bold mb-2">Email Address</Text>
        <View className="mb-6">
          <TextInput
            className="border border-gray-300 rounded-xl px-5 py-4 font-inter-regular text-base"
            placeholder="Entrez votre email scolaire"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <Text className="font-inter-bold mb-2">Password</Text>
        <View className="mb-4 flex-row items-center border border-gray-300 rounded-xl px-4">
          <TextInput
            className="flex-1 py-4 font-inter-regular text-base"
            placeholder="Entrez votre mot de passe"
            placeholderTextColor="#888"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            className="ml-2 p-2"
            onPress={() => setShowPassword(!showPassword)}
          >
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="mb-8 ml-auto mt-2" onPress={() => {}}>
          <Text className="text-teal-600 font-inter-medium">
            Mot de passe oublié ?
          </Text>
        </TouchableOpacity>

        {/* ✅ Navigate on Login */}
        <TouchableOpacity
          className="w-full bg-teal-600 rounded-xl py-5 flex items-center justify-center"
          onPress={() => navigation.navigate("StudentUser")}
        >
          <Text className="font-inter-bold text-white text-lg">Se connecter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
