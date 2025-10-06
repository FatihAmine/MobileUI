import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

// Types
type DocStatus = "validé" | "rejeté";
type DocumentItem = {
  id: string;
  title: string;
  type: string;
  date: string;
  status: DocStatus;
};

// Placeholder data
const DOCUMENTS: DocumentItem[] = [
  { id: "d1", title: "Certificat de scolarité", type: "PDF", date: "2025-09-18", status: "validé" },
  { id: "d2", title: "Relevé de notes S2", type: "PDF", date: "2025-07-02", status: "validé" },
  { id: "d3", title: "Attestation de stage", type: "PDF", date: "2025-05-14", status: "rejeté" },
  { id: "d4", title: "Diplôme Bac", type: "PDF", date: "2024-06-20", status: "validé" },
  { id: "d5", title: "Certificat médical", type: "PDF", date: "2025-08-11", status: "rejeté" },
];

// Status colors
const getStatusColor = (status: string) => {
  switch (status) {
    case "validé":
      return "#22c55e";
    case "rejeté":
      return "#ef4444";
    default:
      return "#6b7280";
  }
};

export default function StudentDocumentsScreen() {
  const [searchText, setSearchText] = useState("");
  const [filteredDocs, setFilteredDocs] = useState<DocumentItem[]>(DOCUMENTS);

  useEffect(() => {
    const filtered = DOCUMENTS.filter(doc =>
      doc.title.toLowerCase().includes(searchText.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredDocs(filtered);
  }, [searchText]);

  return (
    <SafeAreaView className="flex-1">
      {/* Background */}
      <LinearGradient
        colors={["#fdfdfd", "#ededed", "#e0f7f4", "#f9fafb"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Header */}
      <View className="px-6 py-4 flex-row items-center justify-between">
        <View>
          <Text className="text-xl font-inter-bold text-sky-800">Mes Documents</Text>
          <Text className="text-xs text-slate-500">Consultez vos documents officiels</Text>
        </View>
        <MaterialIcons name="folder" size={28} color="#075985" />
      </View>

      {/* Search Bar */}
      <View
        style={{
          marginHorizontal: 22,
          marginBottom: 16,
          backgroundColor: "#fff",
          borderRadius: 16,
          paddingHorizontal: 16,
          paddingVertical: 8,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <MaterialIcons name="search" size={20} color="#9ca3af" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Rechercher un document..."
          placeholderTextColor="#a1a1aa"
          value={searchText}
          onChangeText={setSearchText}
          style={{ flex: 1, fontSize: 15, color: "#232323" }}
        />
      </View>

      {/* Documents List */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 40 }}>
        {filteredDocs.length === 0 ? (
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 28,
              alignItems: "center",
              marginTop: 20,
              ...styles.cardShadow,
            }}
          >
            <Text style={{ color: "#aaa", fontWeight: "600", fontSize: 15, textAlign: "center" }}>
              🎯 Aucun document trouvé.
            </Text>
          </View>
        ) : (
          filteredDocs.map((doc) => (
            <View
              key={doc.id}
              className="flex-row items-start bg-white rounded-2xl p-4 mb-3"
              style={styles.cardShadow}
            >
              {/* Left Icon */}
              <View
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: getStatusColor(doc.status) + "22" }}
              >
                <MaterialIcons name="description" size={24} color={getStatusColor(doc.status)} />
              </View>

              {/* Doc Info */}
              <View className="flex-1">
                <Text className="font-inter-bold text-[15px] text-black">{doc.title}</Text>
                <Text className="font-inter text-[12px] text-slate-500 mb-1">
                  {doc.type} • {doc.date}
                </Text>
                <View className="flex-row items-center mt-1">
                  <MaterialIcons name="circle" size={10} color={getStatusColor(doc.status)} />
                  <Text className="ml-2 text-xs text-slate-400">{doc.status}</Text>
                </View>
              </View>

              {/* Download Button */}
              <Pressable>
                <MaterialIcons name="download" size={22} color="#075985" />
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
