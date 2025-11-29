import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function CardPayment() {
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const payNow = () => {
    if (!card || !expiry || !cvv) return alert("Fill all fields");
    alert("Payment Successful (Card)");
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Card Payment 💳</Text>

      <TextInput
        style={styles.input}
        placeholder="Card Number"
        keyboardType="numeric"
        value={card}
        onChangeText={setCard}
      />

      <TextInput
        style={styles.input}
        placeholder="Expiry (MM/YY)"
        value={expiry}
        onChangeText={setExpiry}
      />

      <TextInput
        style={styles.input}
        placeholder="CVV"
        keyboardType="numeric"
        secureTextEntry
        value={cvv}
        onChangeText={setCvv}
      />

      <TouchableOpacity style={styles.btn} onPress={payNow}>
        <Text style={styles.btnText}>Pay Now</Text>
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
    borderWidth: 1, borderColor: "#ccc", borderRadius: 10,
    padding: 12, marginBottom: 12
  },
  btn: {
    backgroundColor: "black",
    padding: 14,
    borderRadius: 10,
    marginTop: 10
  },
  btnText: { color: "white", textAlign: "center", fontSize: 16, fontWeight: "bold" },
  back: { marginTop: 15, color: "blue", fontSize: 16 },
});
