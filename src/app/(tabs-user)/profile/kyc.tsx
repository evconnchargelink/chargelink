import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function KycScreen() {
  const [fullName, setFullName] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [pan, setPan] = useState("");

  const handleSubmit = () => {
    if (!fullName || !aadhaar || !pan) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    if (aadhaar.length !== 12) {
      Alert.alert("Invalid Aadhaar", "Aadhaar number must be 12 digits!");
      return;
    }

    if (pan.length !== 10) {
      Alert.alert("Invalid PAN", "PAN number must be 10 characters!");
      return;
    }

    Alert.alert("Success", "KYC submitted successfully!");
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f2f2f7]">
      <View className="flex-1 pt-[70px] px-5">
        <Text className="text-[26px] font-bold text-center">
          KYC Verification 🔐
        </Text>
        <Text className="text-xs text-gray-500 text-center mt-1 mb-4">
          Verify your identity for faster and secure bookings.
        </Text>

        <View className="bg-white rounded-2xl p-5 shadow-md">
          <View className="flex-row items-center bg-[#F3F4F6] px-3 py-3 rounded-xl mb-4">
            <Ionicons name="person-outline" size={22} color="#666" />
            <TextInput
              className="flex-1 ml-2.5 text-base text-black"
              placeholder="Full Name"
              placeholderTextColor="#9ca3af"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View className="flex-row items-center bg-[#F3F4F6] px-3 py-3 rounded-xl mb-4">
            <Ionicons name="card-outline" size={22} color="#666" />
            <TextInput
              className="flex-1 ml-2.5 text-base text-black"
              placeholder="Aadhaar Number"
              placeholderTextColor="#9ca3af"
              keyboardType="number-pad"
              maxLength={12}
              value={aadhaar}
              onChangeText={setAadhaar}
            />
          </View>

          <View className="flex-row items-center bg-[#F3F4F6] px-3 py-3 rounded-xl">
            <Ionicons name="document-text-outline" size={22} color="#666" />
            <TextInput
              className="flex-1 ml-2.5 text-base text-black"
              placeholder="PAN Number"
              placeholderTextColor="#9ca3af"
              autoCapitalize="characters"
              maxLength={10}
              value={pan}
              onChangeText={setPan}
            />
          </View>
        </View>

        <TouchableOpacity
          className="bg-black py-3.5 rounded-xl items-center mt-6"
          onPress={handleSubmit}
        >
          <Text className="text-white text-[16px] font-bold">
            Submit KYC
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.navigate("/(tabs-user)/profile")}
          className="mt-5 items-center"
        >
          <Text className="text-[16px] font-medium text-blue-600">
            ← Back
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
