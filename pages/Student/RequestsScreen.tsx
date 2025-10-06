import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  Modal,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

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

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DOCUMENT_TYPES: DocType[] = [
  "Attestation d'inscription",
  "Attestation de réussite",
  "Bulletin",
  "Convention",
  "Autre",
];

const currentYear = new Date().getFullYear();

const ALERT_CONFIG = {
  success: { color: "#22c55e", icon: "✓", title: "Succès" },
  error: { color: "#ef4444", icon: "✕", title: "Erreur" },
  warning: { color: "#facc15", icon: "!", title: "Attention" },
  info: { color: "#3b82f6", icon: "ℹ", title: "Info" },
};

export default function StudentRequestsScreen() {
  const [type, setType] = useState<DocType | string>(DOCUMENT_TYPES[0]);
  const [year, setYear] = useState<string>(String(currentYear));
  const [copies, setCopies] = useState<string>("1");
  const [reason, setReason] = useState<string>("");
  const [requests, setRequests] = useState<Req[]>([]);
  const [loading, setLoading] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<keyof typeof ALERT_CONFIG>("success");
  const [alertMessage, setAlertMessage] = useState("");
  const idCounterRef = useRef<number>(1000);

  const animateLayout = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        250,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      )
    );
  };

  const showAlert = (type: keyof typeof ALERT_CONFIG, message: string) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 1800);
  };

  const validateAndSubmit = () => {
    if (!type) return showAlert("error", "Sélectionnez le type de document.");
    if (!year) return showAlert("error", "Indiquez l'année scolaire.");
    const copiesNum = Number(copies);
    if (Number.isNaN(copiesNum) || copiesNum < 1)
      return showAlert("warning", "Le nombre d'exemplaires doit être au moins 1.");
    if (!reason || reason.trim().length < 3)
      return showAlert("info", "Expliquez brièvement la raison (au moins 3 caractères).");

    setLoading(true);
    setTimeout(() => {
      const newReq: Req = {
        id: `r-${Date.now()}-${++idCounterRef.current}`,
        type,
        year,
        copies: copiesNum,
        reason: reason.trim(),
        status: "en cours",
        submittedAt: new Date().toLocaleDateString(),
      };
      animateLayout();
      setRequests((prev) => [newReq, ...prev]);
      setType(DOCUMENT_TYPES[0]);
      setYear(String(currentYear));
      setCopies("1");
      setReason("");
      setLoading(false);
      showAlert("success", "Votre demande a été envoyée !");
    }, 1500);
  };

  const DocumentTypeChips = () => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
      {DOCUMENT_TYPES.map((t) => (
        <Pressable
          key={t}
          onPress={() => setType(t)}
          style={{
            borderRadius: 32,
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: type === t ? "#173F48" : "#F4F6F7",
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              color: type === t ? "#fff" : "#232323",
              fontSize: 15,
            }}
          >
            {t}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  const YearChips = () => {
    const years = Array.from({ length: 6 }, (_, i) => String(currentYear - i));
    return (
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        {years.map((y) => (
          <Pressable
            key={y}
            onPress={() => setYear(y)}
            style={{
              borderRadius: 12,
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: year === y ? "#173F48" : "#F4F6F7",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                color: year === y ? "#fff" : "#232323",
                fontSize: 16,
              }}
            >
              {y}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };

  const renderRequestCard = (req: Req) => {
    const statusStyles = {
      validé: { bg: "#d1fae5", color: "#059669" },
      rejeté: { bg: "#fee2e2", color: "#b91c1c" },
      "en cours": { bg: "#fef3c7", color: "#b45309" },
    };
    return (
      <View
        key={req.id}
        style={{
          backgroundColor: "#fff",
          borderRadius: 24,
          padding: 18,
          marginBottom: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 6,
          elevation: 4,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Text style={{ fontWeight: "700", fontSize: 16, color: "#171717" }}>
            {req.type}
          </Text>
          <View
            style={{
              backgroundColor: statusStyles[req.status].bg,
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 4,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                color: statusStyles[req.status].color,
              }}
            >
              {req.status}
            </Text>
          </View>
        </View>
        <Text style={{ color: "#5c5c5c", fontWeight: "500", marginBottom: 7 }}>
          {req.year} • {req.copies} copie{req.copies > 1 ? "s" : ""}
        </Text>
        <Text style={{ color: "#232323", marginBottom: 11 }}>{req.reason}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 13, color: "#a1a1aa", fontWeight: "500" }}>
            {req.submittedAt}
          </Text>
          <Pressable
            style={{
              backgroundColor: "#173F48",
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 6,
            }}
            onPress={() => {
              if (req.status !== "en cours")
                return showAlert(
                  "error",
                  "Vous ne pouvez annuler qu'une demande en cours."
                );
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setRequests((prev) => prev.filter((r) => r.id !== req.id));
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 13 }}>
              Annuler
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#fdfdfd", "#ededed", "#e0f7f4", "#f9fafb"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ ...StyleSheet.absoluteFillObject }}
      />

      {/* Header */}
      <View className="px-6 py-4 flex-row items-center justify-between">
        <View>
          <Text className="text-xl font-inter-bold text-sky-800">Mes Demande</Text>
          <Text className="text-sm text-slate-500">
            Consultez et gérez vos documents officiels
          </Text>
        </View>
        <MaterialIcons name="description" size={28} color="#075985" />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 22 }}>
        {/* Form Block */}
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 20,
            marginBottom: 20,
            marginTop: 1,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 6,
            elevation: 4,
          }}
        >
          <Text
            style={{
              fontWeight: "800",
              fontSize: 16,
              color: "#232323",
              marginBottom: 12,
            }}
          >
            Type de document
          </Text>
          <DocumentTypeChips />

          <Text
            style={{
              fontWeight: "700",
              fontSize: 16,
              color: "#232323",
              marginTop: 18,
              marginBottom: 8,
            }}
          >
            Année scolaire
          </Text>
          <YearChips />

          <Text
            style={{
              fontWeight: "700",
              fontSize: 16,
              color: "#232323",
              marginTop: 18,
              marginBottom: 8,
            }}
          >
            Nombre d'exemplaires
          </Text>
          <TextInput
            value={copies}
            onChangeText={setCopies}
            keyboardType="number-pad"
            style={{
              backgroundColor: "#F4F6F7",
              borderRadius: 12,
              paddingHorizontal: 18,
              paddingVertical: 10,
              color: "#232323",
              fontWeight: "700",
              fontSize: 16,
              width: 70,
              borderColor: "#ECECEC",
              borderWidth: 1,
              textAlign: "center",
              marginBottom: 14,
            }}
            placeholder="1"
            placeholderTextColor="#C2C2C2"
          />

          <Text
            style={{
              fontWeight: "700",
              fontSize: 16,
              color: "#232323",
              marginBottom: 6,
            }}
          >
            Raison / Commentaire
          </Text>
          <TextInput
            value={reason}
            onChangeText={setReason}
            multiline
            numberOfLines={4}
            placeholder="Expliquez pourquoi vous avez besoin de ce document..."
            placeholderTextColor="#C2C2C2"
            style={{
              backgroundColor: "#F4F6F7",
              borderRadius: 16,
              paddingHorizontal: 14,
              paddingVertical: 12,
              color: "#232323",
              fontSize: 15,
              fontWeight: "500",
              marginBottom: 14,
              borderColor: "#ECECEC",
              borderWidth: 1,
              textAlignVertical: "top",
              minHeight: 78,
            }}
          />

          <Pressable
            onPress={validateAndSubmit}
            style={{
              backgroundColor: "#173F48",
              borderRadius: 12,
              paddingVertical: 14,
              alignItems: "center",
              marginTop: 8,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
              Envoyer la demande
            </Text>
          </Pressable>
        </View>

        {/* Historique */}
        <Text
          style={{
            fontWeight: "800",
            fontSize: 16,
            color: "#232323",
            marginBottom: 12,
          }}
        >
          Historique des demandes
        </Text>
        {requests.length === 0 ? (
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 20,
              padding: 28,
              alignItems: "center",
              marginBottom: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 3,
            }}
          >
            <Text
              style={{
                color: "#aaa",
                fontWeight: "600",
                fontSize: 15,
                textAlign: "center",
              }}
            >
              🎯 Vous n'avez aucune demande pour l'instant.
            </Text>
          </View>
        ) : (
          requests.map(renderRequestCard)
        )}
      </ScrollView>

      {/* Loading Modal */}
      <Modal visible={loading} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(30,32,34,0.18)",
          }}
        >
          <ActivityIndicator size="large" color="#173F48" />
          <Text
            style={{
              marginTop: 14,
              fontWeight: "600",
              color: "#232323",
              fontSize: 15,
            }}
          >
            Envoi en cours...
          </Text>
        </View>
      </Modal>

      {/* Alert Modal */}
      <Modal visible={alertVisible} transparent animationType="none">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(30,32,34,0.46)",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              paddingVertical: 28,
              paddingHorizontal: 26,
              borderRadius: 24,
              alignItems: "center",
              maxWidth: "85%",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 6,
              elevation: 5,
            }}
          >
            <View
              style={{
                backgroundColor: ALERT_CONFIG[alertType].color,
                width: 70,
                height: 70,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 18,
              }}
            >
              <Text style={{ fontSize: 34, color: "#fff" }}>
                {ALERT_CONFIG[alertType].icon}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "800",
                color: "#232323",
                marginBottom: 6,
              }}
            >
              {ALERT_CONFIG[alertType].title}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: "#565656",
                textAlign: "center",
              }}
            >
              {alertMessage}
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
