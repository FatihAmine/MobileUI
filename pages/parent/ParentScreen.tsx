// ParentDashboardScreen.tsx
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Activity feed data
const PARENT_ACTIVITIES = [
  { 
    id: "1", 
    type: "document", 
    title: "Attestation validée", 
    desc: "Votre certificat de scolarité est maintenant disponible", 
    time: "Il y a 2h", 
    icon: "checkmark-circle", 
    color: "#22c55e" 
  },
  { 
    id: "2", 
    type: "request", 
    title: "Demande en cours", 
    desc: "Votre demande de convention de stage est en traitement", 
    time: "Il y a 5h", 
    icon: "time-outline", 
    color: "#f59e0b" 
  },
  { 
    id: "3", 
    type: "notification", 
    title: "Nouveau bulletin disponible", 
    desc: "Votre bulletin du semestre 2 est prêt", 
    time: "Hier", 
    icon: "document-text", 
    color: "#3b82f6" 
  },
  { 
    id: "4", 
    type: "document", 
    title: "Document téléchargé", 
    desc: "Vous avez téléchargé votre attestation d'inscription", 
    time: "Il y a 2 jours", 
    icon: "download-outline", 
    color: "#8b5cf6" 
  },
];

// Help sections with expandable content
const PARENT_HELP_SECTIONS = [
  {
    id: "1",
    title: "Comment faire une demande ?",
    icon: "help-circle-outline",
    color: "#3b82f6",
    content: [
      "1. Cliquez sur l'onglet 'Demandes' dans le menu principal",
      "2. Appuyez sur le bouton 'Nouvelle demande'",
      "3. Sélectionnez le type de document souhaité",
      "4. Remplissez le formulaire avec vos informations",
      "5. Validez et suivez l'état de votre demande en temps réel",
    ],
  },
  {
    id: "2",
    title: "Pourquoi utiliser cette application ?",
    icon: "star-outline",
    color: "#f59e0b",
    content: [
      "• Gain de temps : Plus besoin de vous déplacer",
      "• Disponibilité 24/7 : Accédez à vos documents à tout moment",
      "• Traçabilité : Suivez toutes vos demandes en un coup d'œil",
      "• Sécurité : Vos données sont cryptées et protégées",
      "• Écologique : Réduisez votre empreinte papier",
    ],
  },
  {
    id: "3",
    title: "Types de documents disponibles",
    icon: "folder-outline",
    color: "#8b5cf6",
    content: [
      "• Attestation de scolarité",
      "• Certificat d'inscription",
      "• Relevés de notes",
      "• Bulletins semestriels",
      "• Conventions de stage",
      "• Attestations de réussite",
    ],
  },
  {
    id: "4",
    title: "Délais de traitement",
    icon: "time-outline",
    color: "#ec4899",
    content: [
      "• Attestations simples : 24-48 heures",
      "• Relevés de notes : 2-3 jours ouvrables",
      "• Conventions de stage : 3-5 jours ouvrables",
      "• Documents urgents : Contactez le support pour un traitement prioritaire",
    ],
  },
];
// Quick stats for parent
const PARENT_STATS = [
  { label: "Enfants suivis", value: "2", icon: "people-outline", color: "#3b82f6" },
  { label: "Notifications", value: "5", icon: "notifications-outline", color: "#ef4444" },
  { label: "Documents", value: "12", icon: "document-text-outline", color: "#3b82f6" },
  { label: "Demandes", value: "3", icon: "clipboard-outline", color: "#f59e0b" },
];

// Expandable Help Card Component
const ExpandableHelpCard = ({ section }: { section: typeof PARENT_HELP_SECTIONS[0] }) => {
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
        <Animated.View className="mt-4 pt-4 border-t border-slate-200 overflow-hidden"
          style={{ height: heightInterpolate, opacity: animatedOpacity }}>
          {section.content.map((line, index) => (
            <Text key={index} className="text-sm text-slate-600 leading-6 mb-2">
              {line}
            </Text>
          ))}
        </Animated.View>
      )}
    </View>
  );
};

// Activity Item Component with animation
const ActivityItem = ({ activity, index }: { activity: typeof PARENT_ACTIVITIES[0]; index: number }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, delay: index * 150, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, delay: index * 150, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View
      className="bg-white rounded-2xl p-4 flex-row mb-3 shadow-sm"
      style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
    >
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

// Quick Stat Card with animation
const StatCard = ({ stat, index }: { stat: typeof PARENT_STATS[0]; index: number }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, delay: index * 150, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, delay: index * 150, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View
      className="bg-white w-[48%] rounded-2xl p-4 items-center mb-3 shadow-sm"
      style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
    >
      <Ionicons name={stat.icon} size={28} color={stat.color} />
      <Text className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</Text>
      <Text className="text-sm text-slate-600 mt-1">{stat.label}</Text>
    </Animated.View>
  );
};

// Main Parent Dashboard Component
export default function ParentDashboardScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <LinearGradient
        colors={["#fdfdfd", "#ededed", "#e0f7f4", "#f9fafb"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-3xl font-bold text-slate-900">Bonjour 👋</Text>
            <Text className="text-base text-slate-600 mt-1">Suivez la scolarité de vos enfants</Text>
          </View>
          <Pressable className="p-1">
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=47" }}
              className="w-12 h-12 rounded-full"
              style={{
                borderWidth: 2,
                borderColor: "#22c55e",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            />
          </Pressable>
        </View>

        {/* Quick Stats */}
        <View className="flex-row flex-wrap justify-between mb-6">
          {PARENT_STATS.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </View>

        {/* Activity Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-bold text-slate-900">Activité récente</Text>
            <Pressable>
              <Text className="text-sm text-blue-600 font-semibold">Tout voir</Text>
            </Pressable>
          </View>
          {PARENT_ACTIVITIES.slice(0, 3).map((activity, index) => (
            <ActivityItem key={activity.id} activity={activity} index={index} />
          ))}
        </View>

        {/* Help & Guides Section */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-slate-900 mb-2">Aide & Guides</Text>
          <Text className="text-sm text-slate-600 mb-3">Cliquez sur une section pour en savoir plus</Text>
          {PARENT_HELP_SECTIONS.map((section) => (
            <ExpandableHelpCard key={section.id} section={section} />
          ))}
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-slate-900 mb-4">Actions rapides</Text>
          <View className="flex-row justify-between">
            <Pressable className="w-[48%] bg-green-600 rounded-2xl p-5 items-center shadow-lg active:opacity-80">
              <Ionicons name="chatbubble-outline" size={28} color="white" />
              <Text className="text-white text-sm font-semibold mt-2 text-center">Contacter un prof</Text>
            </Pressable>
            <Pressable className="w-[48%] bg-blue-600 rounded-2xl p-5 items-center shadow-lg active:opacity-80">
              <Ionicons name="document-text-outline" size={28} color="white" />
              <Text className="text-white text-sm font-semibold mt-2 text-center">Voir bulletins</Text>
            </Pressable>
          </View>
        </View>

        {/* Tips Banner */}
        <View className="bg-green-100 rounded-2xl p-4 flex-row items-center"
          style={{ borderLeftWidth: 4, borderLeftColor: "#22c55e", marginBottom: 10 }}>
          <Ionicons name="bulb-outline" size={32} color="#22c55e" />
          <View className="flex-1 ml-3">
            <Text className="text-base font-semibold text-green-900 mb-1">Astuce du jour</Text>
            <Text className="text-sm text-green-800 leading-5">
              Vérifiez régulièrement les absences pour être informé rapidement
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
