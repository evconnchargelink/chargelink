import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

const Signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }
    router.replace("/(auth)/otp");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View className="flex-1 justify-center px-6">

        <View className="justify-center pb-10 gap-y-4">
          <Image source={require("../../assets/images/logo.png")} className="w-[240px] h-[50px] self-center" resizeMode="contain" />
          <Text className="text-base text-gray-500 text-center mb-8">
            Welcome Back ⚡
        </Text>
        </View>
    

        {/* Email Input */}
        <TextInput
          className="bg-white px-4 py-5 rounded-xl mb-4 border border-gray-700 text-black"
          placeholder="Email"
          placeholderTextColor="#b0bec5"
          onChangeText={setEmail}
        />

        {/* Password Input */}
        <TextInput
          className="bg-white px-4 py-5 rounded-xl mb-2 border border-gray-700 text-black"
          placeholder="Password"
          placeholderTextColor="#b0bec5"
          secureTextEntry
          onChangeText={setPassword}
        />

        {/* Forgot Password */}
        <TouchableOpacity>
          <Text className="text-right mb-3 text-gray-700">
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          className="bg-black px-4 py-5 rounded-xl items-center border-2 border-gray-700 mt-5"
          onPress={handleLogin}
        >
          <Text className="text-white text-base font-bold">Login</Text>
        </TouchableOpacity>

        {/* Signup Link */}
        <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
          <Text className="text-center mt-5 text-gray-300">
            Don't have an account? Sign up →
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signin;
