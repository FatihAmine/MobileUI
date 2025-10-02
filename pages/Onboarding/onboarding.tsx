import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const slides = [
  {
    image: require('../../assets/Onboarding_Images/onboarding-1.png'),
    title: "Restez en contact avec l'école",
    description: "Consultez et téléchargez vos attestations, bulletins et certificats en un clic.",
  },
  {
    image: require('../../assets/Onboarding_Images/onboarding-2.png'),
    title: "Gérez les dossiers de votre enfant",
    description: "Centralisez tous les documents administratifs au même endroit, en toute sécurité.",
  },
  {
    image: require('../../assets/Onboarding_Images/onboarding-3.png'),
    title: "Accédez facilement aux documents scolaires",
    description: "Recevez des notifications instantanées sur les demandes et documents disponibles.",
  },
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigation = useNavigation();

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center mt-12 mb-6 px-4">
        <Image
          source={slides[current].image}
          style={{ width: 320, height: 320, resizeMode: 'contain' }}
        />
      </View>
      <View className="px-6 pb-12">
        <Text className="text-3xl font-inter-semibold leading-snug mb-3">
          {slides[current].title}
        </Text>
        <Text className="text-lg text-[#252525] font-inter-regular leading-relaxed mb-10">
          {slides[current].description}
        </Text>
        <View className="flex-row items-center mb-10">
          {slides.map((_, idx) => (
            <View
              key={idx}
              className={`h-3 w-7 rounded-full mr-3 ${
                current === idx ? 'bg-teal-500' : 'bg-gray-800/60'
              }`}
            />
          ))}
        </View>
        <TouchableOpacity
          className="ml-auto bg-gray-800 w-14 h-14 rounded-full flex items-center justify-center shadow-md"
          onPress={handleNext}
          activeOpacity={0.7}
        >
          <Text className="text-3xl text-white">{'>'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
