import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";

export default function AddMoneyScreen() {
  const [amount, setAmount] = useState("");
  const { method } = useLocalSearchParams();

  const handlePay = () => {
    if (!amount) {
      alert("Please enter an amount!");
      return;
    }
    if (!method) {
      alert("Payment method not selected!");
      return;
    }

    if (method === "upi") {
      router.navigate("/(tabs-user)/wallet/payment-screen/upi");
    }
    else if (method === "card") {
      router.navigate("/(tabs-user)/wallet/payment-screen/card");
    }
    else if (method === "wallet") {
      router.navigate("/(tabs-user)/wallet/payment-screen/chargelinkwallet");
    }
    else {
      alert("Invalid payment method!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Money</Text>

      <Text style={styles.methodText}>
        Payment Method: <Text style={{ fontWeight: "bold" }}>{method}</Text>
      </Text>

      <TextInput
        style={styles.input} placeholder="Enter amount (Rs)" keyboardType="numeric" value={amount} onChangeText={setAmount} />

      <TouchableOpacity style={styles.btn} onPress={handlePay}>
        <Text style={styles.btnText}>Proceed to Pay</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 100 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },

  methodText: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
  },

  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    textAlign: "center",
  },

  btn: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
  },

  btnText: { color: "white", fontWeight: "bold", fontSize: 16 },
});