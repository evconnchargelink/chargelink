import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"driver" | "host">("driver");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password || !phone) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }
    router.replace("/(auth)/otp");
  };

  return (
    <View className="flex-1 bg-white justify-center px-6">
      {/* Logo / Title */}
      <Text className="text-4xl font-bold text-black text-center mb-8">
        ChargeLink
      </Text>

      {/* NAME */}
      <View className="mb-4">
        <Text className="text-xs text-gray-500 mb-1">Name</Text>
        <TextInput
          className="bg-white px-4 py-3 rounded-xl border border-gray-700 text-black"
          placeholder="Name"
          placeholderTextColor="#b0bec5"
          onChangeText={setName}
        />
      </View>

      {/* EMAIL */}
      <View className="mb-4">
        <Text className="text-xs text-gray-500 mb-1">Email</Text>
        <TextInput
          className="bg-white px-4 py-3 rounded-xl border border-gray-700 text-black"
          placeholder="Email"
          placeholderTextColor="#b0bec5"
          keyboardType="email-address"
          onChangeText={setEmail}
        />
      </View>

      {/* PASSWORD */}
      <View className="mb-4">
        <Text className="text-xs text-gray-500 mb-1">Password</Text>
        <TextInput
          className="bg-white px-4 py-3 rounded-xl border border-gray-700 text-black"
          placeholder="Password"
          placeholderTextColor="#b0bec5"
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>

      {/* PHONE + COUNTRY CODE */}
      <View className="mb-5">
        <Text className="text-xs text-gray-500 mb-1">Phone number</Text>
        <View className="flex-row items-center">
          <View className="flex-[0.35] bg-white rounded-xl border border-gray-700">
            <Picker
              selectedValue={countryCode}
              onValueChange={(v) => setCountryCode(v)}
              style={{ width: "100%", height: 48 }}
            >
              <Picker.Item label="+91 🇮🇳" value="+91" />
              <Picker.Item label="+1 🇺🇸" value="+1" />
              <Picker.Item label="+44 🇬🇧" value="+44" />
            </Picker>
          </View>

          <TextInput
            className="flex-[0.65] ml-2 px-3 py-3 rounded-xl border border-gray-700 bg-white text-black"
            placeholder="Phone Number"
            placeholderTextColor="#b0bec5"
            keyboardType="phone-pad"
            onChangeText={setPhone}
          />
        </View>
      </View>

      {/* ROLE SELECTION */}
      <View className="my-4">
        <Text className="text-sm font-bold text-black mb-2">
          Signup as
        </Text>
        <View className="flex-row">
          {/* DRIVER */}
          <TouchableOpacity
            className={`flex-1 px-3 py-3 rounded-xl border border-gray-700 mx-1 ${
              role === "driver" ? "bg-black border-green-600" : "bg-white"
            }`}
            onPress={() => setRole("driver")}
          >
            <View className="flex-row items-center justify-center space-x-2">
              <Ionicons
                name="car-sport-outline"
                size={20}
                color={role === "driver" ? "white" : "black"}
              />
              <Text
                className={`font-bold ${
                  role === "driver" ? "text-white" : "text-black"
                }`}
              >
                Driver
              </Text>
            </View>
          </TouchableOpacity>

          {/* HOST */}
          <TouchableOpacity
            className={`flex-1 px-3 py-3 rounded-xl border border-gray-700 mx-1 ${
              role === "host" ? "bg-black border-green-600" : "bg-white"
            }`}
            onPress={() => setRole("host")}
          >
            <View className="flex-row items-center justify-center space-x-2">
              <Ionicons
                name="flash-outline"
                size={20}
                color={role === "host" ? "white" : "black"}
              />
              <Text
                className={`font-bold ${
                  role === "host" ? "text-white" : "text-black"
                }`}
              >
                Host
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* SIGNUP BUTTON */}
      <TouchableOpacity
        className="bg-white px-4 py-3 rounded-xl items-center border-2 border-gray-700 mt-2"
        onPress={handleSignup}
      >
        <Text className="text-black text-base font-bold">
          Create Account
        </Text>
      </TouchableOpacity>

      {/* LOGIN LINK */}
      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <Text className="text-center mt-5 text-gray-300">
          Already have an account? Login →
        </Text>
      </TouchableOpacity>
    </View>
  );
}
