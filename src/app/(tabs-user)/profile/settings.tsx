import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f7" }}>
    <View style={styles.container}>
      <Text style={styles.title}>App Settings ⚙️</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Auto App Updates</Text>
          <Switch value={autoUpdate} onValueChange={setAutoUpdate} />
        </View>
      </View>

      <TouchableOpacity
        style={styles.rowButton}
        onPress={() => router.navigate("/(tabs-user)/profile/notifications")}
      >
        <Ionicons name="notifications-outline" size={22} />
        <Text style={styles.rowButtonText}>Notification Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.rowButton}
        onPress={() => router.navigate("/(tabs-user)/profile/support")}
      >
        <Ionicons name="help-circle-outline" size={22} />
        <Text style={styles.rowButtonText}>Help & Support</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 30 }} onPress={() => router.navigate("/(tabs-user)/profile")}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 70, paddingHorizontal: 20 },

  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },

  card: {
    backgroundColor: "white",
    padding: 22,
    borderRadius: 15,
    elevation: 4,
    marginBottom: 25,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  label: { fontSize: 17, fontWeight: "500" },

  rowButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },

  rowButtonText: {
    marginLeft: 12,
    fontSize: 17,
    fontWeight: "600",
  },

  back: { fontSize: 16, color: "blue", fontWeight: "500" },
});
