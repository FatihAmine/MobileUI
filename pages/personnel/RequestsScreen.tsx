import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type DocType =
  | "Attestation d'inscription"
  | "Attestation de réussite"
  | "Bulletin"
  | "Convention"
  | "Autre";

type RequestStatus = "en cours" | "validé" | "rejeté";

type Req = {
  id: string;
  type: DocType | string;
  year: string;
  copies: number;
  reason: string;
  status: RequestStatus;
  submittedAt: string;
};

// Placeholder data
const REQUESTS: Req[] = [
  {
    id: "1",
    type: "Attestation d'inscription",
    year: "2025",
    copies: 1,
    reason: "Besoin pour inscription universitaire",
    status: "en cours",
    submittedAt: "05/10/2025",
  },
  {
    id: "2",
    type: "Bulletin",
    year: "2024",
    copies: 2,
    reason: "Dossier administratif",
    status: "en cours",
    submittedAt: "04/10/2025",
  },
];

export default function RequestsApprovalScreen() {
  const [requests, setRequests] = useState<Req[]>(REQUESTS);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<any>();

  const statusStyles = {
    validé: { bg: "#d1fae5", color: "#059669" },
    rejeté: { bg: "#fee2e2", color: "#b91c1c" },
    "en cours": { bg: "#fef3c7", color: "#b45309" },
  };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#fdfdfd", "#ededed", "#e0f7f4", "#f9fafb"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="absolute inset-0"
      />

      {/* Header */}
      <View className="px-6 py-4 flex-row items-center justify-between">
        <View>
          <Text className="text-xl font-bold text-sky-800">
            Demandes à traiter
          </Text>
          <Text className="text-sm text-slate-500">
            Cliquez sur "Ouvrir" pour plus de détails
          </Text>
        </View>
        <MaterialIcons name="description" size={28} color="#075985" />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 40 }}>
        {requests.length === 0 ? (
          <View className="bg-white rounded-2xl p-8 items-center mb-4 shadow-md">
            <Text className="text-gray-400 font-semibold text-base text-center">
              🎯 Aucune demande à traiter pour l'instant.
            </Text>
          </View>
        ) : (
          requests.map((req) => (
            <View
              key={req.id}
              className="bg-white rounded-2xl p-4 mb-4 shadow-md"
            >
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-black font-bold text-base">{req.type}</Text>
                <View
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: statusStyles[req.status].bg }}
                >
                  <Text
                    className="text-xs font-bold"
                    style={{ color: statusStyles[req.status].color }}
                  >
                    {req.status}
                  </Text>
                </View>
              </View>
              <Text className="text-gray-600 mb-1">{req.year} • {req.copies} copie{req.copies > 1 ? "s" : ""}</Text>
              <Text className="text-gray-800 mb-3">
                {req.reason.length > 40 ? req.reason.substring(0, 40) + "..." : req.reason}
              </Text>

              <Pressable
                className="bg-sky-800 rounded-xl py-2 items-center"
                onPress={() =>
                  navigation.navigate("DetailsPage", { request: req })
                }
              >
                <Text className="text-white font-bold">Ouvrir</Text>
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>

      {loading && (
        <View className="absolute inset-0 bg-black/20 flex justify-center items-center">
          <ActivityIndicator size="large" color="#173F48" />
          <Text className="text-gray-800 font-semibold mt-3">Traitement en cours...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
