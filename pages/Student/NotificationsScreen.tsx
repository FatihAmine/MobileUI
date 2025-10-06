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
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const notifications = [
  { id: "1", title: "Demande envoyée", subtitle: "Attestation d'inscription", status: "En attente", date: "2025-09-28 14:30", icon: "schedule" },
  { id: "2", title: "Demande validée", subtitle: "Bulletin S2 2025", status: "Validé", date: "2025-09-27 10:15", icon: "check-circle" },
  { id: "3", title: "Demande rejetée", subtitle: "Attestation de réussite", status: "Rejeté", date: "2025-09-25 16:45", icon: "cancel" },
  { id: "4", title: "Demande rejetée", subtitle: "Attestation de réussite", status: "Rejeté", date: "2025-09-25 16:45", icon: "cancel" },
  { id: "5", title: "Demande rejetée", subtitle: "Attestation de réussite", status: "Rejeté", date: "2025-09-25 16:45", icon: "cancel" },
  { id: "6", title: "Demande rejetée", subtitle: "Attestation de réussite", status: "Rejeté", date: "2025-09-25 16:45", icon: "cancel" },
  { id: "7", title: "Demande rejetée", subtitle: "Attestation de réussite", status: "Rejeté", date: "2025-09-25 16:45", icon: "cancel" },
];

export default function NotificationsScreen() {
  const [selectedStatus, setSelectedStatus] = useState("Tous");
  const [query, setQuery] = useState("");
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

    return (
      <Animated.View
        className="flex-row items-start bg-white rounded-2xl p-4 mb-4"
        style={[{ opacity, transform: [{ translateY }] }, styles.cardShadow]}
      >
        <View
          className="w-10 h-10 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: getStatusColor(item.status) + "22" }}
        >
          <MaterialIcons name={item.icon as any} size={24} color={getStatusColor(item.status)} />
        </View>
        <View className="flex-1">
          <Text className="font-inter-bold text-[15px] text-black">{item.title}</Text>
          <Text className="font-inter text-[12px] text-slate-500 mb-1">{item.subtitle}</Text>
          <View className="flex-row items-center mt-1">
            <MaterialIcons name="circle" size={10} color={getStatusColor(item.status)} />
            <Text className="ml-2 text-xs text-slate-400">{item.status}</Text>
            <Text className="ml-auto text-xs text-slate-400">{item.date}</Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#fdfdfd", "#ededed", "#e0f7f4", "#f9fafb"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Header */}
      <View className="px-6 py-4 flex-row items-center justify-between">
        <View>
          <Text className="text-[18px] font-inter-bold text-sky-800">Notifications</Text>
          <Text className="text-sm text-slate-500">Suivi de vos demandes</Text>
        </View>
        <MaterialIcons name="notifications" size={28} color="#075985" />
      </View>

      {/* Search */}
      <View className="mx-4 mb-3 flex-row items-center bg-gray-100 rounded-lg py-[14px] px-3 shadow-sm">
        <MaterialIcons name="search" size={21} color="#888" />
        <TextInput
          placeholder="Rechercher une notification"
          placeholderTextColor="#888"
          className="flex-1 ml-2 p-0 text-base text-gray-800"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {/* Filter Chips */}
      <View className="flex-row px-4 mb-4 justify-between">
        {["Tous", "En attente", "Validé", "Rejeté"].map((status) => {
          const isActive = selectedStatus === status;
          return (
            <Pressable
              key={status}
              onPress={() => onFilterChange(status)}
              style={{
                marginRight: 8,
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 12,
                backgroundColor: isActive ? "#1F9E91" : "#fff",
                borderWidth: isActive ? 0 : 1,
                borderColor: "#d1d5db",
              }}
            >
              <Text className={`${isActive ? "text-white" : "text-slate-600"} font-inter`}>{status}</Text>
            </Pressable>
          );
        })}
      </View>

      {/* Notifications List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 , marginBottom: 10}}
        ListFooterComponent={
          filtered.length < notifications.length && (
            <Pressable
              onPress={() => setQuery("") || setSelectedStatus("Tous")}
              className="self-center mt-4 px-6 py-3 bg-indigo-600 rounded-2xl"
              style={styles.cardShadow}
            >
              <Text className="text-white font-inter-semibold text-[16px]">Afficher toutes</Text>
            </Pressable>
          )
        }
      />
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
