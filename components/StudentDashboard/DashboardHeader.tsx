import React from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Header = () => (
  <LinearGradient
    colors={['#0f766e', '#0d9488']}
    className="rounded-2xl p-6 mb-6"
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    <View className="flex-row justify-between items-center">
      <View className="flex-1">
        <Text className="text-2xl font-bold text-white">Bonjour, Ahmed! 👋</Text>
        <Text className="text-teal-100 mt-1">Vendredi, 03 Octobre 2025</Text>
        <Text className="text-teal-100 text-sm">Semestre d'automne • L3 Informatique</Text>
      </View>
      <View className="items-center">
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
          className="w-16 h-16 rounded-full border-3 border-white"
        />
        <View className="bg-green-400 w-4 h-4 rounded-full absolute -bottom-1 -right-1 border-2 border-white" />
      </View>
    </View>
  </LinearGradient>
);

export default Header;
