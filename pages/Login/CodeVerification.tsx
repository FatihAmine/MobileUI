import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function CodeVerification() {
  const [code, setCode] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"error" | "success">("success");
  const navigation = useNavigation();

  const handleVerify = () => {
    if (code.trim().length < 4) {
      setAlertType("error");
      setShowAlert(true);
      return;
    }
    setAlertType("success");
    setShowAlert(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="absolute top-0 left-0 right-0">
        <Image
          source={require("../../assets/Login_Images/gradient.png")}
          style={{
            width: "100%",
            height: 500,
            resizeMode: "cover",
            borderBottomLeftRadius: 38,
            borderBottomRightRadius: 38,
          }}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1 justify-start px-6 pt-16"
      >
        <Image
          source={require("../../assets/Login_Images/Logo.png")}
          style={{ width: 50, height: 50, marginBottom: 32 }}
        />

        <Text className="font-inter-bold text-3xl mb-4">
          Vérification du code
        </Text>
        <Text className="text-gray-500 font-inter-medium mb-8 leading-relaxed">
          Entrez le code reçu par e-mail pour continuer.
        </Text>

        <Text className="font-inter-bold mb-2">Code de vérification</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-5 py-4 font-inter-regular text-base text-center tracking-widest mb-8"
          placeholder="____"
          placeholderTextColor="#888"
          keyboardType="number-pad"
          maxLength={6}
          value={code}
          onChangeText={setCode}
        />

        <TouchableOpacity
          className="w-full bg-teal-600 rounded-xl py-5 flex items-center justify-center"
          onPress={handleVerify}
        >
          <Text className="font-inter-bold text-white text-lg">Vérifier</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-8 self-center"
          onPress={() => navigation.navigate("Login")}
        >
          <Text className="text-teal-600 font-inter-medium">
            Retour à la connexion
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Custom Popup */}
      <Modal transparent visible={showAlert} animationType="fade">
        <View className="flex-1 bg-black/40 justify-center items-center px-6">
          <View className="bg-white w-full rounded-2xl p-6 items-center shadow-lg">
            <Text
              className={`text-xl font-inter-bold mb-3 text-center ${
                alertType === "success" ? "text-teal-700" : "text-red-600"
              }`}
            >
              {alertType === "success" ? "Succès" : "Erreur"}
            </Text>
            <Text className="text-gray-600 font-inter-medium text-center mb-6 leading-relaxed">
              {alertType === "success"
                ? "Code vérifié avec succès."
                : "Veuillez entrer un code valide."}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowAlert(false);
                if (alertType === "success")
                  navigation.navigate("ResetPassword");
              }}
              className="bg-teal-600 rounded-xl w-32 py-3 flex items-center justify-center"
            >
              <Text className="text-white font-inter-bold">OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
