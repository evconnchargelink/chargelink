import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function PaymentSummary() {
  const { stationId, name, slot } = useLocalSearchParams();

  const amount = 120; // Dummy amount (API se replace kar sakte ho)

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate("/(tabs-user)/search/booking")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Summary</Text>
      </View>

      {/* Summary Card */}
      <View style={styles.card}>
        <Text style={styles.label}>Station Name:</Text>
        <Text style={styles.value}>{name}</Text>

        <Text style={styles.label}>Station ID:</Text>
        <Text style={styles.value}>{stationId}</Text>

        <Text style={styles.label}>Selected Slot:</Text>
        <Text style={styles.value}>{slot}</Text>

        <Text style={styles.label}>Amount:</Text>
        <Text style={[styles.value, styles.amount]}>₹{amount}.00</Text>
      </View>

      {/* Pay Button */}
      <TouchableOpacity
        style={styles.payBtn}
        onPress={() => router.navigate("/(tabs-user)/search/payment-done")}
      >
        <Text style={styles.payText}>Pay Now</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    padding: 20,
    backgroundColor: "#f3f4f6",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    marginBottom: 25,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },

  value: {
    fontSize: 16,
    color: "#444",
  },

  amount: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 5,
  },

  payBtn: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  payText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
