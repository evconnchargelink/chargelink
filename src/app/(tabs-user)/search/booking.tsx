import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function BookingScreen() {
  const { stationId, name } = useLocalSearchParams();

  const [selectedSlot, setSelectedSlot] = useState("");

  const slots = ["08:00 AM", "10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM"];

  const handleBooking = () => {
    if (!selectedSlot) {
      alert("Please select a time slot!");
      return;
    }

    router.navigate({
      pathname: "/(tabs-user)/search/payment-summary",
      params: {
        stationId,
        name,
        slot: selectedSlot,
      },
    });
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate("/(tabs-user)/search/charger")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm Booking</Text>
      </View>

      {/* Station Details */}
      <View style={styles.infoCard}>
        <Text style={styles.label}>Station Name:</Text>
        <Text style={styles.value}>{name}</Text>

        <Text style={styles.label}>Station ID:</Text>
        <Text style={styles.value}>{stationId}</Text>
      </View>

      {/* Time Slots */}
      <Text style={styles.section}>Select Charging Slot</Text>
      <View style={styles.slotContainer}>
        {slots.map((slot) => (
          <TouchableOpacity
            key={slot}
            style={[
              styles.slot,
              selectedSlot === slot && styles.selectedSlot,
            ]}
            onPress={() => setSelectedSlot(slot)}
          >
            <Text
              style={[
                styles.slotText,
                selectedSlot === slot && styles.slotTextSelected,
              ]}
            >
              {slot}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Proceed to Payment */}
      <TouchableOpacity style={styles.btn} onPress={handleBooking}>
        <Text style={styles.btnText}>Proceed to Payment</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: "#f3f4f6" },

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

  infoCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    marginBottom: 25,
  },

  label: { fontSize: 16, fontWeight: "600" },
  value: { fontSize: 16, color: "#444", marginBottom: 10 },

  section: { fontSize: 20, fontWeight: "600", marginBottom: 10 },

  slotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 25,
  },

  slot: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
  },

  selectedSlot: {
    backgroundColor: "#111827",
  },

  slotText: { color: "#333", fontSize: 15 },
  slotTextSelected: { color: "white", fontWeight: "600" },

  btn: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  btnText: { color: "white", fontSize: 18, fontWeight: "600" },
});
