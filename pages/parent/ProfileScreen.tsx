import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Feather } from "@expo/vector-icons";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 relative bg-gray-50">
      {/* Background Gradient */}
      <LinearGradient
        colors={["#f0f4f8", "#e0f7f4"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="absolute inset-0"
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Profile Header */}
        <View className="items-center pt-12 pb-6">
          <View className="border-4 border-white rounded-full p-1 shadow-lg">
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=12" }}
              className="w-28 h-28 rounded-full"
            />
          </View>
          <Text className="mt-3 text-3xl font-extrabold text-gray-900">Amine Fatih</Text>
          <Text className="mt-1 text-base text-gray-500">amine.fatih@example.com</Text>
        </View>

        {/* Stats Cards */}
        <View className="flex-row justify-around mx-5 mb-6 ">
          {[
            { label: "Demandes", value: "12", colors: ["#4f46e5", "#6366f1"] },
            { label: "Validées", value: "5", colors: ["#16a34a", "#22c55e"] },
            { label: "Rejetées", value: "2", colors: ["#dc2626", "#f87171"] },
          ].map((stat, idx) => (
            <LinearGradient
              key={idx}
              colors={stat.colors}
              className="flex-1 py-5 mx-1 items-center shadow-md"
              style={{ borderRadius: 12 }}
            >
              <Text className="text-white font-bold text-xl">{stat.value}</Text>
              <Text className="text-white/80 mt-1">{stat.label}</Text>
            </LinearGradient>
          ))}
        </View>

        {/* Info Section */}
        <View className="bg-white rounded-2xl mx-5 p-6 shadow-md mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Informations personnelles</Text>
          {[
            { icon: "phone", label: "Téléphone", value: "+212 600-000000" },
            { icon: "map-pin", label: "Adresse", value: "Casablanca, Maroc" },
            { icon: "user", label: "Rôle", value: "Parent" },
          ].map((info, idx) => (
            <View
              key={idx}
              className={`flex-row justify-between items-center py-3 ${idx !== 2 ? "border-b border-gray-200" : ""}`}
            >
              <View className="flex-row items-center space-x-3">
                <Feather name={info.icon} size={20} color="#4b5563" />
                <Text className="text-gray-600">{info.label}</Text>
              </View>
              <Text className="font-semibold text-gray-900">{info.value}</Text>
            </View>
          ))}
        </View>

        {/* Settings Section */}
        <View className="bg-white rounded-2xl mx-5 p-6 shadow-md mb-10">
          <Text className="text-xl font-bold text-gray-800 mb-4">Paramètres</Text>
          {[
            { label: "Modifier le profil", icon: "edit" },
            { label: "Changer le mot de passe", icon: "lock" },
            { label: "Préférences de notification", icon: "notifications" },
          ].map((setting, idx) => (
            <TouchableOpacity
              key={idx}
              className={`flex-row justify-between items-center py-4 ${idx !== 2 ? "border-b border-gray-200" : ""}`}
            >
              <Text className="text-gray-700 text-base">{setting.label}</Text>
              <MaterialIcons name={setting.icon as any} size={20} color="#4b5563" />
            </TouchableOpacity>
          ))}

          <TouchableOpacity className="bg-red-600 py-4 rounded-xl items-center mt-6 shadow-lg">
            <Text className="text-white text-lg font-semibold">Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
