import React, { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

// Types
type DocHistory = {
  date: string;
  status: "validé" | "rejeté";
};

type DocumentItem = {
  id: string;
  title: string;
  type: string;
  history: DocHistory[];
  progress: number; // 0-100%
};

// Placeholder data
const DOCUMENTS: DocumentItem[] = [
  {
    id: "d1",
    title: "Certificat de scolarité",
    type: "PDF",
    progress: 100,
    history: [{ date: "2025-09-10", status: "validé" }],
  },
  {
    id: "d2",
    title: "Relevé de notes S2",
    type: "PDF",
    progress: 60,
    history: [
      { date: "2025-08-25", status: "rejeté" },
      { date: "2025-08-30", status: "validé" },
    ],
  },
  {
    id: "d3",
    title: "Attestation de stage",
    type: "PDF",
    progress: 40,
    history: [{ date: "2025-07-12", status: "rejeté" }],
  },
];

const getStatusColor = (status: "validé" | "rejeté") =>
  status === "validé" ? "#22c55e" : "#ef4444";

export default function DocumentsScreen() {
  const [documents, setDocuments] = useState<DocumentItem[]>(DOCUMENTS);

  const renderDocument = ({ item }: { item: DocumentItem }) => (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-md">
      {/* Header */}
      <View className="flex-row items-center mb-3">
        <View
          className="w-10 h-10 rounded-full mr-3 items-center justify-center"
          style={{ backgroundColor: "#22c55e22" }}
        >
          <MaterialIcons name="description" size={24} color="#22c55e" />
        </View>
        <View className="flex-1">
          <Text className="text-black font-bold text-base">{item.title}</Text>
          <Text className="text-gray-500 text-xs">{item.type}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View className="w-full h-2 bg-gray-200 rounded-full mb-1">
        <View
          className="h-2 rounded-full"
          style={{ width: `${item.progress}%`, backgroundColor: "#22c55e" }}
        />
      </View>
      <Text className="text-gray-500 text-xs mb-2">{item.progress}% terminé</Text>

      {/* History */}
      <Text className="font-bold text-sm mb-1">Historique :</Text>
      {item.history.map((h, index) => (
        <View key={index} className="flex-row items-center mb-1">
          <MaterialIcons
            name={h.status === "validé" ? "check-circle" : "cancel"}
            size={16}
            color={getStatusColor(h.status)}
          />
          <Text className="text-gray-600 text-xs ml-2">
            {h.date} - {h.status}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#fdfdfd", "#ededed", "#e0f7f4", "#f9fafb"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="absolute inset-0"
      />

      {/* Header */}
      <View className="px-6 py-4">
        <Text className="text-xl font-bold text-sky-800">Mes Documents</Text>
        <Text className="text-gray-500 text-xs">Suivi et historique</Text>
      </View>

      <FlatList
        data={documents}
        keyExtractor={(item) => item.id}
        renderItem={renderDocument}
        contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
}
