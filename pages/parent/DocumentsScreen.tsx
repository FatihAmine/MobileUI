import React from "react"
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import { MaterialIcons } from "@expo/vector-icons"

// Example documents data
const documents = [
  { id: "1", title: "Attestation d'inscription", child: "Ahmed", date: "2025-09-10", status: "Validé", icon: "description" },
  { id: "2", title: "Bulletin S2", child: "Sara", date: "2025-08-28", status: "En attente", icon: "insert-drive-file" },
  { id: "3", title: "Attestation de réussite", child: "Youssef", date: "2025-08-15", status: "Rejeté", icon: "assignment-late" },
]

export default function ParentDocumentsScreen() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Validé":
        return "#22c55e"
      case "Rejeté":
        return "#ef4444"
      case "En attente":
        return "#f59e0b"
      default:
        return "#6b7280"
    }
  }

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
          <Text className="text-xl font-inter-bold text-sky-800">Documents Des Enfants</Text>
          <Text className="text-xs text-slate-500">Consultez et gérez les documents</Text>
        </View>
        <MaterialIcons name="folder" size={28} color="#075985" />
      </View>

      {/* Documents List */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}>
        {documents.map((doc) => (
          <View
            key={doc.id}
            className="flex-row items-start bg-white rounded-2xl p-4 mb-3 shadow-md"
            style={styles.cardShadow}
          >
            <View
              className="w-10 h-10 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: getStatusColor(doc.status) + "22" }}
            >
              <MaterialIcons name={doc.icon as any} size={24} color={getStatusColor(doc.status)} />
            </View>
            <View className="flex-1">
              <Text className="font-inter-bold text-[15px] text-black">{doc.title}</Text>
              <Text className="font-inter text-[12px] text-slate-500 mb-1">
                {doc.child} • {doc.date}
              </Text>
              <View className="flex-row items-center mt-1">
                <MaterialIcons name="circle" size={10} color={getStatusColor(doc.status)} />
                <Text className="ml-2 text-xs text-slate-400">{doc.status}</Text>
              </View>
            </View>
            <Pressable>
              <MaterialIcons name="download" size={22} color="#075985" />
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
})
