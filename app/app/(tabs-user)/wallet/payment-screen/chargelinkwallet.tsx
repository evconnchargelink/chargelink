import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function ChargeLinkWallet() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ChargeLink Wallet 💼</Text>

      <Text style={styles.balance}>Available Balance: ₹0</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => alert("Wallet used (dummy)")}>
        <Text style={styles.btnText}>Use Wallet</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.navigate("/(tabs-user)/wallet/payment-method")}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 15 },
  balance: { fontSize: 18, marginBottom: 30, color: "#555" },
  btn: {
    backgroundColor: "black",
    padding: 14,
    borderRadius: 10,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  back: { marginTop: 20, color: "blue", fontSize: 16 },
});
