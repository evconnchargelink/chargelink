import React, { useRef, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function OTP() {
  const router = useRouter();
  const [timer, setTimer] = useState<number>(30); // 🔥 Now Type Fixed
  const inputs = useRef<Array<TextInput | null>>([]);

  // Auto focus & next input
  const handleChange = (text: string, index: number) => {
    if (text) {
      if (index < 3) {
        inputs.current[index + 1]?.focus();
      } else {
        router.replace("/(auth)/basic-details");
      }
    }
  };

  // Timer countdown
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Optional: Clear all inputs when screen opens
  useEffect(() => {
    inputs.current.forEach((input) => input?.clear());
    inputs.current[0]?.focus();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP 🔐</Text>
      <Text style={styles.subtitle}>Enter the 4-digit OTP sent to your phone</Text>

      {/* OTP INPUTS */}
      <View style={styles.otpRow}>
        {[0, 1, 2, 3].map((i) => (
          <TextInput
            key={i}
            style={styles.otpInput}
            keyboardType="number-pad"   // 👈 More accurate for mobile
            maxLength={1}
            ref={(ref) => (inputs.current[i] = ref)}
            onChangeText={(text) => handleChange(text, i)}
          />
        ))}
      </View>

      {/* RESEND TIMER */}
      <TouchableOpacity disabled={timer !== 0} onPress={() => setTimer(30)}>
        <Text style={[styles.resend, { color: timer === 0 ? "black" : "#b0bec5" }]}>
          {timer === 0 ? "Resend OTP 🔁" : `Resend in ${timer}s`}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace("/test-role")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: "blue", fontSize: 16 }}>🚀 Skip for testing</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", color: "black" },
  subtitle: { fontSize: 14, color: "#6F6F6F", marginBottom: 25, textAlign: "center", paddingHorizontal: 20 },

  otpRow: { flexDirection: "row", gap: 12 },
  otpInput: {
    width: 55,
    height: 55,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#4A4A4A",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 22,
    color: "black",
  },

  resend: { marginTop: 30, fontSize: 16 },
});
