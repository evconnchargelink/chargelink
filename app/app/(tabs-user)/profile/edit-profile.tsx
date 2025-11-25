import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfileScreen() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("userData");

      if (storedUser) {
        const u = JSON.parse(storedUser);
        setUser(u);
        setName(u.name);
        setEmail(u.email);
        setPhone(u.phone);
      } else {
        // dummy fallback
        setName("Guest User");
        setEmail("guest@example.com");
        setPhone("0000000000");
      }
    };

    loadUser();
  }, []);

  const handleSave = async () => {
    if (!name || !email || !phone) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    const updatedUser = { name, email, phone };

    await AsyncStorage.setItem("userData", JSON.stringify(updatedUser));

    Alert.alert("Success", "Profile updated successfully!");
    router.push("/(tabs-user)/profile");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f7" }}>
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <View style={styles.card}>
        <View style={styles.inputBox}>
          <Ionicons name="person-outline" size={22} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={22} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputBox}>
          <Ionicons name="call-outline" size={22} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="number-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.back} onPress={() => router.push("/(tabs-user)/profile")}>
        <Text style={styles.backText}>← Back</Text>
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
    marginBottom: 25,
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
  },

  saveText: { color: "white", fontSize: 16, fontWeight: "600" },

  back: { marginTop: 20, alignItems: "center" },
  backText: { color: "blue", fontSize: 16, fontWeight: "500" },
});
