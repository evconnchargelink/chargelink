import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }
    router.replace("/(auth)/otp"); // redirect to OTP before tabs
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ChargeLink</Text>
      <Text style={styles.subtitle}>Welcome Back ⚡</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#b0bec5"
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#b0bec5"
        secureTextEntry
        onChangeText={setPassword}
      />

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Signup Link */}
      <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
        <Text style={styles.link}>Don't have an account? Sign up →</Text>
      </TouchableOpacity>
    </View>
  );
}

// 🎨 STYLE SAME THEME AS SIGNUP
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 25,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6F6F6F",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1.5,
    borderColor: "#4A4A4A",
    color: "black",
  },
  forgot: {
    textAlign: "right",
    marginBottom: 10,
    color: "#4A4A4A",
  },
  button: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4A4A4A",
  },
  buttonText: { color: "black", fontSize: 16, fontWeight: "bold" },
  link: { textAlign: "center", marginTop: 20, color: "#b0bec5" },
});
