import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

export default function OTP() {
  const router = useRouter();
  const [timer, setTimer] = useState(30);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (text) {
      if (index < 3) {
        inputs.current[index + 1]?.focus();
      } else {
        router.replace("/(auth)/basic-details");
      }
    }
  };

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    inputs.current.forEach((input) => input?.clear());
    inputs.current[0]?.focus();
  }, []);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-2xl font-bold text-black mb-1">
          Verify OTP 🔐
        </Text>
        <Text className="text-sm text-gray-500 mb-6 text-center px-5">
          Enter the 4-digit OTP sent to your phone
        </Text>

        {/* OTP INPUTS */}
        <View className="flex-row space-x-3">
          {[0, 1, 2, 3].map((i) => (
            <TextInput
              key={i}
              className="w-14 h-14 bg-white border-2 border-gray-800 rounded-xl text-center text-2xl text-black pr-2"
              keyboardType="number-pad"
              maxLength={1}
              ref={(ref) => (inputs.current[i] = ref)}
              onChangeText={(text) => handleChange(text, i)}
            />
          ))}
        </View>

        {/* RESEND TIMER */}
        <TouchableOpacity
          disabled={timer !== 0}
          onPress={() => setTimer(30)}
        >
          <Text
            className={`mt-8 text-base ${
              timer === 0 ? "text-black" : "text-gray-300"
            }`}
          >
            {timer === 0 ? "Resend OTP 🔁" : `Resend in ${timer}s`}
          </Text>
        </TouchableOpacity>

        {/* Skip for testing */}
        <TouchableOpacity
          onPress={() => router.replace("/test-role")}
          className="mt-5"
        >
          <Text className="text-blue-600 text-base">🚀 Skip for testing</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
