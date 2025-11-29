import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
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

    // Get stored user
    const storedUser = await AsyncStorage.getItem("userData");
    if (!storedUser) {
      Alert.alert("Error", "No user data found!");
      return;
    }

    const user = JSON.parse(storedUser);

    // If old password doesn't match
    if (user.password && user.password !== oldPass) {
      Alert.alert("Error", "Old password is incorrect!");
      return;
    }

    // Update password
    const updatedUser = { ...user, password: newPass };
    await AsyncStorage.setItem("userData", JSON.stringify(updatedUser));

    Alert.alert("Success", "Password updated successfully!");
    router.navigate("/(tabs-user)/profile");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f7" }}>
    <View style={styles.container}>
      <Text style={styles.title}>Change Password 🔐</Text>

      <View style={styles.card}>
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={22} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Old Password"
            secureTextEntry
            value={oldPass}
            onChangeText={setOldPass}
          />
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="key-outline" size={22} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry
            value={newPass}
            onChangeText={setNewPass}
          />
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="checkmark-outline" size={22} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            secureTextEntry
            value={confirmPass}
            onChangeText={setConfirmPass}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleChange}>
        <Text style={styles.saveText}>Update Password</Text>
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
