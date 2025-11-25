import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ChargerDetails() {
  const { id, name, distance, price } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate("/(tabs-user)/search")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Charger Details</Text>
      </View>

      {/* Station Name */}
      <Text style={styles.title}>{name}</Text>

      {/* Basic Info */}
      <View style={styles.card}>
        <Text style={styles.label}>📍 Distance:</Text>
        <Text style={styles.value}>{distance}</Text>

        <Text style={styles.label}>⚡ Price:</Text>
        <Text style={styles.value}>{price}</Text>

        <Text style={styles.label}>🔌 Available Slots:</Text>
        <Text style={styles.value}>4 (Dummy)</Text>
      </View>

      {/* Section: Amenities */}
      <Text style={styles.section}>Amenities</Text>
      <View style={styles.card}>
        <Text>✔ Parking Available</Text>
        <Text>✔ CCTV Security</Text>
        <Text>✔ 24/7 Support</Text>
      </View>

      {/* Section: Charger Types */}
      <Text style={styles.section}>Charger Types</Text>
      <View style={styles.card}>
        <Text>⚡ CCS2 — Fast Charging</Text>
        <Text>⚡ Type-2 — Slow Charging</Text>
      </View>

      {/* Book Now Button */}
      <TouchableOpacity
        style={styles.bookBtn}
        onPress={() =>
          router.navigate({
            pathname: "/(tabs-user)/search/booking",
            params: { stationId: id, name },
          })
        }
      >
        <Text style={styles.bookText}>Book Slot</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: "#f3f4f6" },

  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  headerTitle: { fontSize: 22, fontWeight: "bold", marginLeft: 10 },

  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },

  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },

  label: { fontWeight: "600", marginTop: 5 },
  value: { color: "#444", marginBottom: 5 },

  section: { fontSize: 20, fontWeight: "600", marginBottom: 10 },

  bookBtn: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  bookText: { color: "white", fontSize: 18, fontWeight: "600" },
});
