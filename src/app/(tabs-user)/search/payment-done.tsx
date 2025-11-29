import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function PaymentDone() {
  const { stationId, name, slot, amount } = useLocalSearchParams();

  return (
    <View style={styles.container}>

      {/* Success Icon */}
      <View style={styles.iconWrap}>
        <Ionicons name="checkmark-circle" size={100} color="#10B981" />
      </View>

      <Text style={styles.title}>Payment Successful 🎉</Text>
      <Text style={styles.subtitle}>Your booking is confirmed</Text>

      {/* Summary Card */}
      <View style={styles.card}>
        <Text style={styles.label}>Station Name:</Text>
        <Text style={styles.value}>{name}</Text>

        <Text style={styles.label}>Slot:</Text>
        <Text style={styles.value}>{slot}</Text>

        <Text style={styles.label}>Amount Paid:</Text>
        <Text style={[styles.value, styles.amount]}>₹{amount}</Text>
      </View>

      {/* Rate Button */}
      <TouchableOpacity
        style={styles.rateBtn}
        onPress={() =>
          router.push({
            pathname: "/(tabs-user)/search/rating",
            params: { stationId, name },
          })
        }
      >
        <Text style={styles.rateText}>Rate Charger</Text>
      </TouchableOpacity>

      {/* Back to Home */}
      <TouchableOpacity
        style={styles.homeBtn}
        onPress={() => router.navigate("/(tabs-user)/home")}
      >
        <Text style={styles.homeText}>Back to Home</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },

  iconWrap: {
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#666",
    marginTop: 5,
    marginBottom: 20,
    fontSize: 16,
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    width: "90%",
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

  rateBtn: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 12,
    width: "90%",
    alignItems: "center",
    marginBottom: 15,
  },

  rateText: { 
    color: "white", 
    fontSize: 18, 
    fontWeight: "600" 
  },

  homeBtn: {
    borderWidth: 2,
    borderColor: "#444",
    padding: 14,
    borderRadius: 12,
    width: "90%",
    alignItems: "center",
  },

  homeText: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: "#444" 
  },
});
