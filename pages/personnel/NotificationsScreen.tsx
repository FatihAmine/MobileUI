import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  Modal,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const notifications = [
  { id: "1", title: "Demande envoyée", subtitle: "Attestation d'inscription", status: "En attente", date: "2025-09-28 14:30", icon: "schedule", details: "Demande envoyée pour l'attestation d'inscription." },
  { id: "2", title: "Demande validée", subtitle: "Bulletin S2 2025", status: "Validé", date: "2025-09-27 10:15", icon: "check-circle", details: "Votre bulletin du semestre 2 a été validé." },
  { id: "3", title: "Demande rejetée", subtitle: "Attestation de réussite", status: "Rejeté", date: "2025-09-25 16:45", icon: "cancel", details: "Votre demande a été rejetée, veuillez contacter le service." },
];

export default function NotificationsScreen() {
  const [selectedStatus, setSelectedStatus] = useState("Tous");
  const [query, setQuery] = useState("");
  const [selectedNotification, setSelectedNotification] = useState<typeof notifications[0] | null>(null);
  const animValues = useRef(notifications.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animations = animValues.map((val, i) =>
      Animated.timing(val, {
        toValue: 1,
        duration: 500,
        delay: i * 150,
        useNativeDriver: true,
      })
    );
    Animated.stagger(100, animations).start();
  }, []);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [query]);

  const onFilterChange = (status: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedStatus(status);
  };

  const filtered = notifications.filter(
    (n) =>
      (selectedStatus === "Tous" || n.status === selectedStatus) &&
      (n.title.toLowerCase().includes(query.toLowerCase()) ||
        n.subtitle.toLowerCase().includes(query.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Validé":
        return "#22c55e";
      case "Rejeté":
        return "#ef4444";
      case "En attente":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  const renderItem = ({ item, index }: { item: typeof notifications[0]; index: number }) => {
    const translateY = animValues[index].interpolate({ inputRange: [0, 1], outputRange: [20, 0] });
    const opacity = animValues[index];
    const isNew = item.status === "En attente";

    return (
      <Animated.View
        style={[
          {
            opacity,
            transform: [{ translateY }],
            backgroundColor: isNew ? "#fef9c3" : "#fff",
            borderWidth: isNew ? 1 : 0,
            borderColor: isNew ? "#f59e0b" : "transparent",
            borderRadius: 16,
            padding: 16,
            marginBottom: 12,
            flexDirection: "row",
          },
          styles.cardShadow,
        ]}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
            backgroundColor: getStatusColor(item.status) + "22",
          }}
        >
          <MaterialIcons name={item.icon as any} size={24} color={getStatusColor(item.status)} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "700", fontSize: 15, color: "#000" }}>{item.title}</Text>
          <Text style={{ fontSize: 12, color: "#555", marginBottom: 4 }}>{item.subtitle}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
            <MaterialIcons name="circle" size={10} color={getStatusColor(item.status)} />
            <Text style={{ marginLeft: 6, fontSize: 12, color: "#555" }}>{item.status}</Text>
            <Text style={{ marginLeft: "auto", fontSize: 12, color: "#999" }}>{item.date}</Text>
          </View>
          <Pressable
            onPress={() => setSelectedNotification(item)}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 12,
              backgroundColor: "#173F48",
              borderRadius: 12,
              alignSelf: "flex-start",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 13 }}>Ouvrir</Text>
          </Pressable>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#fdfdfd", "#ededed", "#e0f7f4", "#f9fafb"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Header */}
      <View style={{ paddingHorizontal: 16, paddingVertical: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: "700", color: "#075985" }}>Notifications</Text>
          <Text style={{ fontSize: 12, color: "#555" }}>Suivi de vos demandes</Text>
        </View>
        <MaterialIcons name="notifications" size={28} color="#075985" />
      </View>

      {/* Search */}
      <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#eee", marginHorizontal: 16, paddingHorizontal: 10, paddingVertical: 12, borderRadius: 12, marginBottom: 12 }}>
        <MaterialIcons name="search" size={20} color="#888" />
        <TextInput
          placeholder="Rechercher..."
          placeholderTextColor="#888"
          style={{ flex: 1, marginLeft: 8, fontSize: 14, color: "#000" }}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {/* Filter Chips */}
      <View style={{ flexDirection: "row", paddingHorizontal: 16, marginBottom: 12 }}>
        {["Tous", "En attente", "Validé", "Rejeté"].map((status) => {
          const isActive = selectedStatus === status;
          return (
            <Pressable
              key={status}
              onPress={() => onFilterChange(status)}
              style={{
                marginRight: 8,
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 12,
                backgroundColor: isActive ? "#1F9E91" : "#fff",
                borderWidth: isActive ? 0 : 1,
                borderColor: "#d1d5db",
              }}
            >
              <Text style={{ color: isActive ? "#fff" : "#555", fontWeight: "600" }}>{status}</Text>
            </Pressable>
          );
        })}
      </View>

      {/* Notifications List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
      />

      {/* Modal for Notification Details */}
      <Modal visible={!!selectedNotification} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.4)" }}>
          <View style={{ backgroundColor: "#fff", borderRadius: 16, padding: 20, width: "85%" }}>
            <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 8 }}>{selectedNotification?.title}</Text>
            <Text style={{ fontSize: 14, color: "#555", marginBottom: 12 }}>{selectedNotification?.subtitle}</Text>
            <Text style={{ fontSize: 14, color: "#333", marginBottom: 12 }}>{selectedNotification?.details}</Text>
            <Text style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>Status: {selectedNotification?.status}</Text>
            <Text style={{ fontSize: 12, color: "#888", marginBottom: 20 }}>Date: {selectedNotification?.date}</Text>
            <Pressable onPress={() => setSelectedNotification(null)} style={{ backgroundColor: "#173F48", paddingVertical: 10, borderRadius: 12, alignItems: "center" }}>
              <Text style={{ color: "#fff", fontWeight: "700" }}>Fermer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
