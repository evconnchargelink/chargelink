import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("driver");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password || !phone) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }

    router.replace("/(auth)/otp");  // 🔁 OTP page after signup ✔
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ChargeLink</Text>

      {/* NAME */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#b0bec5"
        onChangeText={setName}
      />

      {/* EMAIL */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#b0bec5"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      {/* PASSWORD */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#b0bec5"
        secureTextEntry
        onChangeText={setPassword}
      />

      {/* PHONE + COUNTRY CODE */}
      <View style={styles.phoneContainer}>
        <Picker selectedValue={countryCode} onValueChange={setCountryCode} style={styles.picker}>
          <Picker.Item label="+91 🇮🇳" value="+91" />
          <Picker.Item label="+1 🇺🇸" value="+1" />
          <Picker.Item label="+44 🇬🇧" value="+44" />
        </Picker>

        <TextInput
          style={styles.phoneInput}
          placeholder="Phone Number"
          placeholderTextColor="#b0bec5"
          keyboardType="phone-pad"
          onChangeText={setPhone}
        />
      </View>

      {/* ROLE SELECTION */}
      <View style={styles.roleContainer}>
        <Text style={styles.roleLabel}>Signup As:</Text>
        <View style={styles.roleButtons}>
          
          {/* DRIVER */}
          <TouchableOpacity
            style={[styles.roleBtn, role === "driver" && styles.roleActive]}
            onPress={() => setRole("driver")}
          >
            <View style={styles.roleRow}>
              <Ionicons name="car-sport-outline" size={20} color={role === "driver" ? "white" : "black"} />
              <Text style={[styles.roleText, role === "driver" && { color: "white" }]}>Driver</Text>
            </View>
          </TouchableOpacity>

          {/* HOST */}
          <TouchableOpacity
            style={[styles.roleBtn, role === "host" && styles.roleActive]}
            onPress={() => setRole("host")}
          >
            <View style={styles.roleRow}>
              <Ionicons name="flash-outline" size={20} color={role === "host" ? "white" : "black"} />
              <Text style={[styles.roleText, role === "host" && { color: "white" }]}>Host</Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>

      {/* SIGNUP BUTTON */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      {/* LOGIN LINK */}
      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <Text style={styles.link}>Already have an account? Login →</Text>
      </TouchableOpacity>
    </View>
  );
}


/* 🎨 SAME THEME — NO STYLE BROKEN */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", justifyContent: "center", padding: 25 },
  title: { fontSize: 40, fontWeight: "bold", color: "black", textAlign: "center", marginBottom: 30 },

  input: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#4A4A4A",
    color: "black",
  },
  phoneContainer: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  picker: { flex: 0.30, backgroundColor: "white" },
  phoneInput: {
    flex: 0.65,
    padding: 12,
    borderRadius: 10,
    marginLeft: 8,
    borderWidth: 1.3,
    borderColor: "#4A4A4A",
    backgroundColor: "white",
    color: "black",
  },

  roleContainer: { marginVertical: 20 },
  roleLabel: { color: "black", marginBottom: 10, fontSize: 14, fontWeight: "bold" },
  roleButtons: { flexDirection: "row", justifyContent: "space-between" },

  roleBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#4A4A4A",
    backgroundColor: "white",
    marginHorizontal: 5,
  },
  roleActive: { backgroundColor: "black", borderColor: "#4A9032" },
  roleRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6 },
  roleText: { color: "black", fontWeight: "bold" },

  button: { backgroundColor: "white", padding: 14, borderRadius: 10, alignItems: "center", borderWidth: 2, borderColor: "#4A4A4A" },
  buttonText: { color: "black", fontSize: 16, fontWeight: "bold" },

  link: { textAlign: "center", marginTop: 20, color: "#b0bec5" },
});
