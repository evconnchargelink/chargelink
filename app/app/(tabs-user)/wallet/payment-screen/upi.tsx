import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { router } from "expo-router";

export default function UPIScreen() {
  const [upiId, setUpiId] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pay via UPI 🏦</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter UPI ID (e.g., username@upi)"
        placeholderTextColor="#888"
        value={upiId}
        onChangeText={setUpiId}
      />

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (!upiId) return alert("Please enter UPI ID");
          alert("UPI Request Sent");
          router.back();
        }}
      >
        <Text style={styles.btnText}>Pay</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.navigate("/(tabs-user)/wallet/payment-method")}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  btn: { backgroundColor: "black", padding: 14, borderRadius: 10 },
  btnText: { color: "white", textAlign: "center", fontWeight: "bold", fontSize: 16 },
  back: { marginTop: 15, color: "blue", fontSize: 16 },
});
