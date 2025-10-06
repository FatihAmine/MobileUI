import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
  Modal,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import { LinearGradient } from "expo-linear-gradient";

export default function DetailsPage() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { request } = route.params;

  const [statusHistory, setStatusHistory] = useState([
    { name: "Admin", status: "validé", reason: "Vérifié OK", date: "06/10/2025" },
    { name: "Professeur", status: "rejeté", reason: "Info manquante", date: "07/10/2025" },
  ]);

  const [reasonText, setReasonText] = useState("");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error" | "info">("success");

  const showAlert = (type: "success" | "error" | "info", message: string) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 1800);
  };

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/*"],
    });
    if (result.type === "success") {
      setUploadedFile(result.name);
      showAlert("success", `Fichier sélectionné: ${result.name}`);
    }
  };

  const handleAction = (action: "validé" | "rejeté") => {
    if (!reasonText) return showAlert("error", "Veuillez indiquer la raison.");
    setStatusHistory([
      ...statusHistory,
      { name: "Vous", status: action, reason: reasonText, date: new Date().toLocaleDateString() },
    ]);
    setReasonText("");
    setUploadedFile(null);
    showAlert("success", `Document ${action} !`);
  };

  const ALERT_ICONS: Record<string, string> = {
    success: "check-circle",
    error: "times-circle",
    info: "info-circle",
  };

  const ALERT_COLORS: Record<string, string> = {
    success: "#22c55e",
    error: "#ef4444",
    info: "#3b82f6",
  };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#fdfdfd", "#e0f7f4", "#f9fafb"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="absolute inset-0"
      />

      {/* Header */}
      <View className="px-4 py-4 flex-row items-center">
        <Pressable onPress={() => navigation.goBack()} className="mr-4">
          <MaterialIcons name="arrow-back" size={28} color="#075985" />
        </Pressable>
        <Text className="text-xl font-bold text-sky-800">Détails de la demande</Text>
      </View>

      <ScrollView className="px-4 mt-2">
        {/* Document Info */}
        <View className="bg-white rounded-2xl p-5 shadow-md mb-4">
          <Text className="text-gray-800 font-bold text-lg mb-2">{request.type}</Text>
          <Text className="text-gray-600 mb-1">Année: {request.year}</Text>
          <Text className="text-gray-600 mb-1">Copies: {request.copies}</Text>
          <Text className="text-gray-600 mb-1">Soumis le: {request.submittedAt}</Text>
          <Text className="text-gray-600 mb-1">Raison: {request.reason}</Text>
          <Text className="text-gray-600 mb-1">
            Status actuel: <Text className="font-bold">{request.status}</Text>
          </Text>
        </View>

        {/* Status History */}
        <View className="bg-white rounded-2xl p-5 shadow-md mb-4">
          <Text className="font-bold text-gray-700 text-lg mb-3">Historique des validations</Text>
          {statusHistory.map((h, i) => (
            <View key={i} className="flex-row justify-between items-start mb-2">
              <View className="flex-1">
                <Text className="text-gray-800 font-semibold">{h.name}</Text>
                <Text className="text-gray-600 text-sm">Raison: {h.reason}</Text>
              </View>
              <View className="items-end">
                <Text
                  className="font-bold"
                  style={{ color: h.status === "validé" ? "#059669" : "#b91c1c" }}
                >
                  {h.status.toUpperCase()}
                </Text>
                <Text className="text-gray-400 text-xs">{h.date}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Reason Input */}
        <View className="bg-white rounded-2xl p-4 shadow-md mb-4">
          <Text className="text-gray-700 font-semibold mb-2">Raison pour acceptation/rejet</Text>
          <TextInput
            placeholder="Indiquez la raison..."
            value={reasonText}
            onChangeText={setReasonText}
            className="border border-gray-300 rounded-xl p-3 text-gray-800"
            multiline
          />
        </View>

        {/* Modern File Upload */}
        <Pressable
          onPress={pickFile}
          className="bg-white rounded-2xl p-5 mb-4 border-2 border-dashed border-sky-300 flex-row items-center justify-center shadow-md"
        >
          <FontAwesome5 name="file-upload" size={22} color="#075985" />
          <Text className="ml-3 text-sky-800 font-semibold">
            {uploadedFile ? uploadedFile : "Télécharger un fichier (PDF/Image)"}
          </Text>
        </Pressable>

        {/* Action Buttons */}
        <View className="flex-row justify-between mb-6">
          <Pressable
            onPress={() => handleAction("validé")}
            className="bg-green-500 flex-1 py-3 rounded-2xl items-center mr-2 shadow"
          >
            <Text className="text-white font-bold">Accepter</Text>
          </Pressable>
          <Pressable
            onPress={() => handleAction("rejeté")}
            className="bg-red-500 flex-1 py-3 rounded-2xl items-center ml-2 shadow"
          >
            <Text className="text-white font-bold">Rejeter</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Alert Modal */}
      <Modal visible={alertVisible} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.2)]">
          <View className="bg-white p-6 rounded-2xl items-center shadow-md w-11/12 max-w-sm">
            <FontAwesome5
              name={ALERT_ICONS[alertType]}
              size={48}
              color={ALERT_COLORS[alertType]}
            />
            <Text className="mt-4 font-bold text-lg text-gray-800">
              {alertType === "success" ? "Succès" : alertType === "error" ? "Erreur" : "Info"}
            </Text>
            <Text className="text-gray-600 text-center mt-1">{alertMessage}</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
