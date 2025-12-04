import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangePassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleChange = async () => {
    if (!oldPass || !newPass || !confirmPass) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    if (newPass.length < 6) {
      Alert.alert("Error", "New password must be at least 6 characters!");
      return;
    }

    if (newPass !== confirmPass) {
      Alert.alert("Error", "New passwords do not match!");
      return;
    }

    const storedUser = await AsyncStorage.getItem("userData");
    if (!storedUser) {
      Alert.alert("Error", "No user data found!");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.password && user.password !== oldPass) {
      Alert.alert("Error", "Old password is incorrect!");
      return;
    }

    const updatedUser = { ...user, password: newPass };
    await AsyncStorage.setItem("userData", JSON.stringify(updatedUser));

    Alert.alert("Success", "Password updated successfully!");
    router.navigate("/(tabs-user)/profile");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f2f2f7]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <View className="flex-1 pt-[70px] px-5">
          <Text className="text-[26px] font-bold text-center">
            Change Password 🔐
          </Text>
          <Text className="text-xs text-gray-500 text-center mt-1 mb-4">
            Keep your account secure by updating it regularly.
          </Text>

          <View className="bg-white rounded-2xl p-5 shadow-md">
            <View className="flex-row items-center bg-[#F3F4F6] px-3 py-3 rounded-xl mb-4">
              <Ionicons name="lock-closed-outline" size={22} color="#666" />
              <TextInput
                className="flex-1 ml-2.5 text-base text-black"
                placeholder="Old Password"
                placeholderTextColor="#9ca3af"
                secureTextEntry
                value={oldPass}
                onChangeText={setOldPass}
              />
            </View>

            <View className="flex-row items-center bg-[#F3F4F6] px-3 py-3 rounded-xl mb-4">
              <Ionicons name="key-outline" size={22} color="#666" />
              <TextInput
                className="flex-1 ml-2.5 text-base text-black"
                placeholder="New Password"
                placeholderTextColor="#9ca3af"
                secureTextEntry
                value={newPass}
                onChangeText={setNewPass}
              />
            </View>

            <View className="flex-row items-center bg-[#F3F4F6] px-3 py-3 rounded-xl">
              <Ionicons name="checkmark-outline" size={22} color="#666" />
              <TextInput
                className="flex-1 ml-2.5 text-base text-black"
                placeholder="Confirm New Password"
                placeholderTextColor="#9ca3af"
                secureTextEntry
                value={confirmPass}
                onChangeText={setConfirmPass}
              />
            </View>
          </View>

          <TouchableOpacity
            className="bg-black py-3.5 rounded-xl items-center mt-6"
            onPress={handleChange}
          >
            <Text className="text-white text-[16px] font-bold">
              Update Password
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-5 items-center"
            onPress={() => router.navigate("/(tabs-user)/profile")}
          >
            <Text className="text-[16px] font-medium text-blue-600">
              ← Back
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
