import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function BookingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Main Title */}
        <Text style={styles.title}>My Bookings 📅</Text>
        <Text style={styles.subtitle}>
          Access all your charging sessions, past/upcoming/cancelled bookings, live status, invoice and reviews.
        </Text>

        <View style={styles.cardGrid}>
          {/* Upcoming Bookings */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/(tabs-user)/bookings/upcoming")}
          >
            <Text style={styles.cardIcon}>🚗</Text>
            <Text style={styles.cardTitle}>Upcoming</Text>
            <Text style={styles.cardDesc}>View bookings to be completed</Text>
          </TouchableOpacity>

          {/* Past Bookings */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/(tabs-user)/bookings/past")}
          >
            <Text style={styles.cardIcon}>📜</Text>
            <Text style={styles.cardTitle}>Past</Text>
            <Text style={styles.cardDesc}>See completed charging sessions</Text>
          </TouchableOpacity>

          {/* Cancelled Bookings */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/(tabs-user)/bookings/cancelled")}
          >
            <Text style={styles.cardIcon}>❌</Text>
            <Text style={styles.cardTitle}>Cancelled</Text>
            <Text style={styles.cardDesc}>View cancelled bookings</Text>
          </TouchableOpacity>

          {/* Charging Live */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/(tabs-user)/bookings/charging-live")}
          >
            <Text style={styles.cardIcon}>⚡️</Text>
            <Text style={styles.cardTitle}>Charging Live</Text>
            <Text style={styles.cardDesc}>Track an ongoing charging session</Text>
          </TouchableOpacity>

          {/* Charging Complete */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/(tabs-user)/bookings/charging-complete")}
          >
            <Text style={styles.cardIcon}>✅</Text>
            <Text style={styles.cardTitle}>Charging Complete</Text>
            <Text style={styles.cardDesc}>Review your latest finished session</Text>
          </TouchableOpacity>

          {/* Booking Details */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/(tabs-user)/bookings/details")}
          >
            <Text style={styles.cardIcon}>📖</Text>
            <Text style={styles.cardTitle}>Booking Details</Text>
            <Text style={styles.cardDesc}>See detail for any booking</Text>
          </TouchableOpacity>

          {/* Invoice / Rating */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/(tabs-user)/search/invoice")}
          >
            <Text style={styles.cardIcon}>🧾</Text>
            <Text style={styles.cardTitle}>Invoice & Ratings</Text>
            <Text style={styles.cardDesc}>View and rate your session</Text>
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
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 12,
    color: "#222",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#555",
    marginBottom: 26,
    textAlign: "center",
    lineHeight: 22,
  },
  cardGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 8,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 7,
    elevation: 3,
  },
  cardIcon: {
    fontSize: 24,
    marginBottom: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 3,
    textAlign: "center",
  },
  cardDesc: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginBottom: 3,
    lineHeight: 18,
  },
});

