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

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"error" | "success">("success");
  const navigation = useNavigation();

  const handleReset = () => {
    if (!password || !confirmPassword) {
      setAlertType("error");
      setShowAlert(true);
      return;
    }
    if (password !== confirmPassword) {
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
          Nouveau mot de passe
        </Text>
        <Text className="text-gray-500 font-inter-medium mb-8 leading-relaxed">
          Créez un nouveau mot de passe pour sécuriser votre compte.
        </Text>

        <Text className="font-inter-bold mb-2">Nouveau mot de passe</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-5 py-4 font-inter-regular text-base mb-4"
          placeholder="Entrez un nouveau mot de passe"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text className="font-inter-bold mb-2">Confirmer le mot de passe</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-5 py-4 font-inter-regular text-base mb-8"
          placeholder="Confirmez le mot de passe"
          placeholderTextColor="#888"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          className="w-full bg-teal-600 rounded-xl py-5 flex items-center justify-center"
          onPress={handleReset}
        >
          <Text className="font-inter-bold text-white text-lg">Confirmer</Text>
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
                ? "Votre mot de passe a été réinitialisé avec succès."
                : password !== confirmPassword
                ? "Les mots de passe ne correspondent pas."
                : "Veuillez remplir tous les champs."}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowAlert(false);
                if (alertType === "success") navigation.navigate("Login");
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
