import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationsScreen() {
  const [chargingUpdates, setChargingUpdates] = useState(true);
  const [walletAlerts, setWalletAlerts] = useState(true);
  const [promoAlerts, setPromoAlerts] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f7" }}>
    <View style={styles.container}>
      <Text style={styles.title}>Notifications 🔔</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Charging Updates</Text>
          <Switch value={chargingUpdates} onValueChange={setChargingUpdates} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Wallet Alerts</Text>
          <Switch value={walletAlerts} onValueChange={setWalletAlerts} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Promotions & Offers</Text>
          <Switch value={promoAlerts} onValueChange={setPromoAlerts} />
        </View>
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
    justifyContent: "space-between",
    marginBottom: 22,
  },

  label: { fontSize: 17, fontWeight: "500" },

  backBtn: { marginTop: 30 },
  backTxt: { color: "blue", fontSize: 16 },
});
