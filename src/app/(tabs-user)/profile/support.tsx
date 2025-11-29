import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SupportScreen() {
  const openEmail = () => {
    Linking.openURL("mailto:support@chargelink.com");
  };

  const openCall = () => {
    Linking.openURL("tel:+919876543210");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f7" }}>
    <View style={styles.container}>
      <Text style={styles.title}>Help & Support 💬</Text>

      <View style={styles.card}>
        <TouchableOpacity style={styles.row} onPress={openEmail}>
          <Ionicons name="mail-outline" size={24} color="black" />
          <Text style={styles.text}>Email Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={openCall}>
          <Ionicons name="call-outline" size={24} color="black" />
          <Text style={styles.text}>Call Support</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => Linking.openURL("https://www.chargelink.com/support")}
        >
          <Ionicons name="globe-outline" size={24} color="black" />
          <Text style={styles.text}>Visit Help Center</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backBtn} onPress={() => router.navigate("/(tabs-user)/profile")}>
        <Text style={styles.backTxt}>← Back</Text>
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
    padding: 20,
    borderRadius: 15,
    elevation: 4,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },

  text: {
    marginLeft: 15,
    fontSize: 17,
    fontWeight: "500",
  },

  backBtn: { marginTop: 30 },
  backTxt: { color: "blue", fontSize: 16 },
});
