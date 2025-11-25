import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

// Dummy data; replace with actual values fetched from context or API
const userName = "Alex";
const walletBalance = "₹2,300";
const bookingsCount = 4;

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f7" }}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* User Header */}
        <View style={styles.headerBox}>
          <Text style={styles.greet}>Welcome back, {userName} 👋</Text>
          <Text style={styles.overview}>Your EV dashboard overview</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Wallet Balance</Text>
            <Text style={styles.statValue}>{walletBalance}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Bookings</Text>
            <Text style={styles.statValue}>{bookingsCount}</Text>
          </View>
        </View>

        {/* Quick Actions (Cards) */}
        <Text style={styles.quickActionsHeader}>Quick Actions</Text>
        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => router.push("/(tabs-user)/search")}
          >
            <Text style={styles.cardTitle}>🔍 Search Chargers</Text>
            <Text style={styles.cardDesc}>Find nearby EV chargers quickly</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => router.push("/(tabs-user)/wallet")}
          >
            <Text style={styles.cardTitle}>💼 Wallet</Text>
            <Text style={styles.cardDesc}>Check your balance and transactions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => router.push("/(tabs-user)/bookings")}
          >
            <Text style={styles.cardTitle}>📖 Bookings</Text>
            <Text style={styles.cardDesc}>View and manage your bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => router.push("/(tabs-user)/profile")}
          >
            <Text style={styles.cardTitle}>👤 Profile</Text>
            <Text style={styles.cardDesc}>Update your details and preferences</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f2f2f7",
    alignItems: "center",
  },
  headerBox: {
    alignItems: "center",
    marginBottom: 8,
  },
  greet: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1d1d23",
    marginTop: 5,
  },
  overview: {
    fontSize: 15,
    color: "#555",
    marginBottom: 16,
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 24,
  },
  statBox: {
    backgroundColor: "#fff",
    borderRadius: 14,
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 18,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  statLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
  quickActionsHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2d2d3a",
    marginTop: 6,
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  cardContainer: {
    width: "100%",
  },
  cardButton: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1d1d23",
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
});
