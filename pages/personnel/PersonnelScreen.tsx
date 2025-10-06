// DashboardPersoScreen.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Animated,
  Platform,
  UIManager,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BarChart } from "react-native-chart-kit";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const screenWidth = Dimensions.get("window").width - 40;

// Activity feed data
const ACTIVITIES = [
  { id: "1", title: "Demande acceptée", desc: "Demande de convention de stage validée", time: "Il y a 2h", icon: "checkmark-circle", color: "#22c55e" },
  { id: "2", title: "Demande rejetée", desc: "Demande de certificat d'inscription rejetée", time: "Il y a 5h", icon: "close-circle", color: "#ef4444" },
  { id: "3", title: "Nouvelle demande reçue", desc: "Demande d'attestation de scolarité à traiter", time: "Hier", icon: "notifications-outline", color: "#f59e0b" },
];

// Quick stats for personnel
const STATS = [
  { label: "Demandes traitées", value: "15", icon: "clipboard-outline", color: "#3b82f6" },
  { label: "Demandes en attente", value: "5", icon: "time-outline", color: "#f59e0b" },
  { label: "Demandes rejetées", value: "2", icon: "close-circle-outline", color: "#ef4444" },
  { label: "Demandes acceptées", value: "10", icon: "checkmark-circle-outline", color: "#22c55e" },
];

// Help sections
const HELP_SECTIONS = [
  {
    id: "1",
    title: "Comment gérer les demandes ?",
    icon: "help-circle-outline",
    color: "#3b82f6",
    content: [
      "1. Vérifiez les demandes reçues dans la section 'Demandes'",
      "2. Acceptez ou rejetez chaque demande selon le besoin",
      "3. Suivez le statut des demandes en temps réel",
    ],
  },
  {
    id: "2",
    title: "Pourquoi utiliser cette interface ?",
    icon: "star-outline",
    color: "#f59e0b",
    content: [
      "• Traçabilité complète de vos actions",
      "• Accès rapide aux documents importants",
      "• Notifications pour rester informé",
    ],
  },
];

// Chart data
const chartData = {
  labels: ["En attente", "Acceptées", "Rejetées"],
  datasets: [{ data: [5, 10, 2] }],
};
const chartConfig = {
  backgroundColor: "#fdfdfd",
  backgroundGradientFrom: "#fdfdfd",
  backgroundGradientTo: "#e0f7f4",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
  style: { borderRadius: 16 },
  propsForDots: { r: "6", strokeWidth: "2", stroke: "#3b82f6" },
};

// Expandable Help Card Component
const ExpandableHelpCard = ({ section }: { section: typeof HELP_SECTIONS[0] }) => {
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    if (expanded) {
      Animated.parallel([
        Animated.timing(animatedHeight, { toValue: 0, duration: 300, useNativeDriver: false }),
        Animated.timing(animatedOpacity, { toValue: 0, duration: 200, useNativeDriver: false }),
      ]).start(() => setExpanded(false));
    } else {
      setExpanded(true);
      Animated.parallel([
        Animated.timing(animatedHeight, { toValue: 1, duration: 300, useNativeDriver: false }),
        Animated.timing(animatedOpacity, { toValue: 1, duration: 300, delay: 100, useNativeDriver: false }),
      ]).start();
    }
  };

  const heightInterpolate = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, section.content.length * 35 + 40],
  });

  return (
    <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm" style={{ borderLeftColor: section.color, borderLeftWidth: 4 }}>
      <Pressable onPress={toggleExpand} className="flex-row justify-between items-center">
        <View className="flex-row items-center flex-1">
          <Ionicons name={section.icon} size={28} color={section.color} />
          <Text className="text-base font-semibold text-slate-900 ml-3">{section.title}</Text>
        </View>
        <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={24} color="#64748b" />
      </Pressable>
      {expanded && (
        <Animated.View className="mt-4 pt-4 border-t border-slate-200 overflow-hidden" style={{ height: heightInterpolate, opacity: animatedOpacity }}>
          {section.content.map((line, index) => (
            <Text key={index} className="text-sm text-slate-600 leading-6 mb-2">{line}</Text>
          ))}
        </Animated.View>
      )}
    </View>
  );
};

// Activity Item Component
const ActivityItem = ({ activity, index }: { activity: typeof ACTIVITIES[0]; index: number }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, delay: index * 150, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, delay: index * 150, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View className="bg-white rounded-2xl p-4 flex-row mb-3 shadow-sm" style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <View className="w-12 h-12 rounded-xl justify-center items-center mr-3" style={{ backgroundColor: activity.color + "20" }}>
        <Ionicons name={activity.icon} size={24} color={activity.color} />
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-slate-900 mb-1">{activity.title}</Text>
        <Text className="text-sm text-slate-600 mb-1">{activity.desc}</Text>
        <Text className="text-xs text-slate-400">{activity.time}</Text>
      </View>
    </Animated.View>
  );
};

// Stat Card Component
const StatCard = ({ stat, index }: { stat: typeof STATS[0]; index: number }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, delay: index * 150, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, delay: index * 150, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View className="bg-white w-[48%] rounded-2xl p-4 items-center mb-3 shadow-sm" style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <Ionicons name={stat.icon} size={28} color={stat.color} />
      <Text className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</Text>
      <Text className="text-sm text-slate-600 mt-1 text-center">{stat.label}</Text>
    </Animated.View>
  );
};

// Timeline Notification Item
const NotificationTimelineItem = ({
  title,
  color,
  icon,
  isNew,
  isLast,
}: {
  title: string;
  color: string;
  icon: string;
  isNew?: boolean;
  isLast?: boolean;
}) => (
  <View className="flex-row mb-4">
    {/* Timeline line and point */}
    <View className="items-center mr-3">
      <View className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
      {!isLast && <View className="w-[2px] flex-1 mt-1" style={{ backgroundColor: color }} />}
    </View>

    {/* Notification card */}
    <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm flex-row justify-between items-center">
      <View className="flex-row items-center flex-1">
        <Ionicons name={icon as any} size={24} color={color} />
        <Text className="ml-3 text-sm text-slate-700 flex-shrink">{title}</Text>
      </View>
      {isNew && (
        <View className="bg-red-500 px-2 py-0.5 rounded-full ml-2">
          <Text className="text-white text-xs font-bold">NEW</Text>
        </View>
      )}
    </View>
  </View>
);

// Main Dashboard Component
export default function DashboardPersoScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <LinearGradient colors={["#fdfdfd", "#ededed", "#e0f7f4", "#f9fafb"]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={StyleSheet.absoluteFillObject} />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-3xl font-bold text-slate-900">Bonjour Amine 👋</Text>
            <Text className="text-base text-slate-600 mt-1">Voici votre tableau de bord personnel</Text>
          </View>
          <Pressable className="p-1">
            <Image source={{ uri: "https://i.pravatar.cc/150?img=12" }} className="w-12 h-12 rounded-full" style={{ borderWidth: 2, borderColor: "#3b82f6", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }} />
          </Pressable>
        </View>

        {/* Quick Stats */}
        <View className="flex-row flex-wrap justify-between mb-6">
          {STATS.map((stat, index) => <StatCard key={index} stat={stat} index={index} />)}
        </View>

        {/* Section Title */}
        <Text className="text-2xl font-bold text-slate-900 mb-3">Suivi des demandes</Text>

        {/* Graphique de suivi */}
        <View className="mb-6 bg-white rounded-2xl p-4 shadow-sm">
          <BarChart
            data={chartData}
            width={screenWidth * 0.925}
            height={250}
            chartConfig={chartConfig}
            verticalLabelRotation={0}
            fromZero
            showValuesOnTopOfBars
            style={{ borderRadius: 16 }}
          />
        </View>

        {/* Section Title */}
        <Text className="text-2xl font-bold text-slate-900 mb-3">Nouvelles notifications</Text>

        {/* Timeline notifications */}
        {[
          { title: "Nouvelle demande reçue", icon: "notifications-outline", color: "#f59e0b", isNew: true },
          { title: "Demande en attente", icon: "time-outline", color: "#f59e0b", isNew: false },
          { title: "Demande rejetée", icon: "close-circle-outline", color: "#ef4444", isNew: true },
        ].map((notif, index, arr) => (
          <NotificationTimelineItem
            key={index}
            title={notif.title}
            icon={notif.icon}
            color={notif.color}
            isNew={notif.isNew}
            isLast={index === arr.length - 1}
          />
        ))}

        {/* Activity Section */}
        <View className="mb-6 mt-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-bold text-slate-900">Activité récente</Text>
            <Pressable>
              <Text className="text-sm text-blue-600 font-semibold">Tout voir</Text>
            </Pressable>
          </View>
          {ACTIVITIES.map((activity, index) => (
            <ActivityItem key={activity.id} activity={activity} index={index} />
          ))}
        </View>

        {/* Help & Guides Section */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-slate-900 mb-3">Aide & Guides</Text>
          {HELP_SECTIONS.map((section) => <ExpandableHelpCard key={section.id} section={section} />)}
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-slate-900 mb-4">Actions rapides</Text>
          <View className="flex-row justify-between">
            <Pressable className="w-[48%] bg-blue-600 rounded-2xl p-5 items-center shadow-lg active:opacity-80">
              <Ionicons name="clipboard-outline" size={28} color="white" />
              <Text className="text-white text-sm font-semibold mt-2 text-center">Voir les demandes</Text>
            </Pressable>
            <Pressable className="w-[48%] bg-purple-600 rounded-2xl p-5 items-center shadow-lg active:opacity-80">
              <Ionicons name="document-text-outline" size={28} color="white" />
              <Text className="text-white text-sm font-semibold mt-2 text-center">Voir les documents</Text>
            </Pressable>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
