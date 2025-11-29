import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function BookingDetailsScreen() {
  const router = useRouter();

  // Dummy booking details – replace with props or hooks
  const booking = {
    station: "EV Plaza - Sector 17",
    date: "2025-10-14",
    timeSlot: "14:00 – 15:00",
    amount: "₹200",
    status: "Completed",
    vehicle: "Tata Nexon EV",
    bookingId: "ABCD-1234",
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Title & status icon */}
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>
            {booking.status === "Completed" ? "✅" : booking.status === "Cancelled" ? "❌" : "📅"}
          </Text>
        </View>
        <Text style={styles.title}>Booking Details</Text>
        <Text style={styles.idText}>Booking ID: {booking.bookingId}</Text>

        {/* Booking info card */}
        <View style={styles.card}>
          <Text style={styles.label}>EV Station</Text>
          <Text style={styles.value}>{booking.station}</Text>
          <Text style={styles.label}>Date & Slot</Text>
          <Text style={styles.value}>{booking.date}, {booking.timeSlot}</Text>
          <Text style={styles.label}>Vehicle</Text>
          <Text style={styles.value}>{booking.vehicle}</Text>
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.value}>{booking.amount}</Text>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>{booking.status}</Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => router.push("/(tabs-user)/search/invoice")}
          >
            <Text style={styles.actionText}>View Invoice</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => router.push("/(tabs-user)/home")}
          >
            <Text style={styles.homeBtnText}>Return Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f6f7fb",
  },
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#e5ffe2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  icon: {
    fontSize: 28,
    color: "#188832",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#188832",
    marginBottom: 3,
    textAlign: "center",
  },
  idText: {
    fontSize: 13,
    color: "#777",
    marginBottom: 14,
  },
  card: {
    width: "94%",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 36,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: "#999",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#222",
    fontWeight: "bold",
    marginTop: 2,
  },
  actions: {
    width: "100%",
    alignItems: "center",
  },
  actionBtn: {
    width: "100%",
    backgroundColor: "#188832",
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: "center",
  },
  actionText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 0.4,
  },
  homeBtn: {
    alignItems: "center",
  },
  homeBtnText: {
    fontSize: 15,
    color: "#222",
    textDecorationLine: "underline",
  },
});
