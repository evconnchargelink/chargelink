import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function BasicDetails() {
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState("driver"); // default

  const handleSubmit = async () => {
    if (!fullname || !age) {
      Alert.alert("Error", "Please fill all details");
      return;
    }
    await AsyncStorage.setItem("role", role);
    if (role === "driver") {
      router.push("/(tabs-user)/home");
    } else if (role === "host") {
      router.push("/(tabs-host)/home-login");
    } else {
      Alert.alert("Error", "Invalid role selection!");
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View className="flex-1 justify-center px-6">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-center text-black">
            Almost Done 🙌
          </Text>
          <Text className="text-center mt-2 text-gray-500">
            Complete your profile
          </Text>
        </View>

        {/* Card container */}
        <View className="bg-white border border-gray-700 rounded-2xl px-4 py-5">
          {/* Full name */}
          <View className="mb-4">
            <Text className="text-xs text-gray-500 mb-1">Full name</Text>
            <TextInput
              className="bg-white px-3 py-3 rounded-xl border border-gray-700 text-black"
              placeholder="Full Name"
              placeholderTextColor="#b0bec5"
              onChangeText={setFullname}
            />
          </View>

          {/* Age */}
          <View className="mb-5">
            <Text className="text-xs text-gray-500 mb-1">Age</Text>
            <TextInput
              className="bg-white px-3 py-3 rounded-xl border border-gray-700 text-black"
              placeholder="Age"
              placeholderTextColor="#b0bec5"
              keyboardType="numeric"
              onChangeText={setAge}
            />
          </View>

          {/* Role selector */}
          <Text className="text-xs text-gray-500 mb-2">
            Choose how you want to use ChargeLink
          </Text>
          <View className="flex-row gap-3 mb-5">
            <TouchableOpacity
              className={`flex-1 px-4 py-3 rounded-xl border-2 border-gray-700 items-center ${
                role === "driver" ? "bg-black border-green-500" : "bg-white"
              }`}
              onPress={() => setRole("driver")}
            >
              <Text
                className={`font-bold ${
                  role === "driver" ? "text-white" : "text-black"
                }`}
              >
                Driver
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 px-4 py-3 rounded-xl border-2 border-gray-700 items-center ${
                role === "host" ? "bg-black border-green-500" : "bg-white"
              }`}
              onPress={() => setRole("host")}
            >
              <Text
                className={`font-bold ${
                  role === "host" ? "text-white" : "text-black"
                }`}
              >
                Host
              </Text>
            </TouchableOpacity>
          </View>

          {/* Submit */}
          <TouchableOpacity
            className="bg-white px-4 py-3 rounded-xl items-center border-2 border-gray-700"
            onPress={handleSubmit}
          >
            <Text className="text-black text-base font-bold">
              Continue ➜
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
