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

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"error" | "success">("success");
  const navigation = useNavigation();

  const handleSendLink = () => {
    if (!email.trim()) {
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
          Mot de passe oublié
        </Text>
        <Text className="text-gray-500 font-inter-medium mb-8 leading-relaxed">
          Entrez votre adresse e-mail pour recevoir un lien de réinitialisation.
        </Text>

        <Text className="font-inter-bold mb-2">Adresse e-mail</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-5 py-4 font-inter-regular text-base mb-8"
          placeholder="Entrez votre email scolaire"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          className="w-full bg-teal-600 rounded-xl py-5 flex items-center justify-center"
          onPress={handleSendLink}
        >
          <Text className="font-inter-bold text-white text-lg">
            Envoyer le lien
          </Text>
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
              {alertType === "success" ? "Lien envoyé" : "Erreur"}
            </Text>
            <Text className="text-gray-600 font-inter-medium text-center mb-6 leading-relaxed">
              {alertType === "success"
                ? "Un lien de réinitialisation a été envoyé à votre adresse e-mail."
                : "Veuillez entrer votre adresse e-mail."}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowAlert(false);
                if (alertType === "success") {
                  navigation.navigate("CodeVerification");
                }
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
