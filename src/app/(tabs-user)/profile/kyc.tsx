import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f7" }}>
    <View style={styles.container}>
      <Text style={styles.title}>KYC Verification 🔐</Text>

      <View style={styles.card}>
        <View style={styles.inputBox}>
          <Ionicons name="person-outline" size={22} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="card-outline" size={22} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Aadhaar Number"
            keyboardType="number-pad"
            maxLength={12}
            value={aadhaar}
            onChangeText={setAadhaar}
          />
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="document-text-outline" size={22} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="PAN Number"
            autoCapitalize="characters"
            maxLength={10}
            value={pan}
            onChangeText={setPan}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit}>
        <Text style={styles.saveText}>Submit KYC</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.navigate("/(tabs-user)/profile")} style={{ marginTop: 20 }}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 70, paddingHorizontal: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, textAlign: "center" },

  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    elevation: 4,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },

  saveBtn: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 25,
  },

  saveText: { color: "white", fontSize: 16, fontWeight: "bold" },

  back: { fontSize: 16, color: "blue", fontWeight: "500" },
});
