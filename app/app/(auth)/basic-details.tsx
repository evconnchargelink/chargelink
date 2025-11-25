import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
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
    await AsyncStorage.setItem("role", role);  // SAVE ROLE HERE
    router.replace(`/(tabs-${role})`);  // ROLE WISE REDIRECT ✔
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Almost Done 🙌</Text>
      <Text style={styles.subtitle}>Complete your profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#b0bec5"
        onChangeText={setFullname}
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        placeholderTextColor="#b0bec5"
        keyboardType="numeric"
        onChangeText={setAge}
      />

      {/* ROLE CONFIRM  (Can Change Again) */}
      <TouchableOpacity
        style={[styles.roleBtn, role === "driver" && styles.active]}
        onPress={() => setRole("driver")}
      >
        <Text style={[styles.roleText, role === "driver" && { color: "white" }]}>Driver</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.roleBtn, role === "host" && styles.active]}
        onPress={() => setRole("host")}
      >
        <Text style={[styles.roleText, role === "host" && { color: "white" }]}>Host</Text>
      </TouchableOpacity>

      {/* SUBMIT */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Continue ➜</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", justifyContent: "center", padding: 25 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", color: "black" },
  subtitle: { textAlign: "center", marginBottom: 20, color: "#6F6F6F" },

  input: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#4A4A4A",
    marginBottom: 15,
    color: "black",
  },

  roleBtn: {
    padding: 14, borderWidth: 1.5, borderColor: "#4A4A4A",
    borderRadius: 10, marginBottom: 12, alignItems: "center",
  },
  active: { backgroundColor: "black", borderColor: "#4A9032" },
  roleText: { color: "black", fontWeight: "bold" },

  button: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4A4A4A",
  },
  buttonText: { color: "black", fontSize: 16, fontWeight: "bold" },
});
