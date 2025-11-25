import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// Dummy data for cancelled bookings
const cancelledData = [
  {
    id: "1",
    station: "EV Plaza - Sector 17",
    date: "2025-10-14",
    reason: "User cancelled",
  },
  {
    id: "2",
    station: "GreenCharge Hub",
    date: "2025-09-30",
    reason: "No slot available",
  },
];

export default function CancelledBookings() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Cancelled Bookings ❌</Text>
        <Text style={styles.subtitle}>
          {cancelledData.length > 0
            ? "Here are your recently cancelled bookings"
            : "Nothing cancelled yet"}
        </Text>

        {cancelledData.length > 0 && (
          <View style={styles.listCard}>
            <FlatList
              data={cancelledData}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.bookingItem}>
                  <View style={styles.iconCircle}>
                    <Text style={styles.icon}>❌</Text>
                  </View>
                  <View>
                    <Text style={styles.station}>{item.station}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                    <Text style={styles.reason}>{item.reason}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        )}

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.push("/(tabs-user)/bookings")}
        >
          <Text style={styles.backBtnText}>Back to Bookings</Text>
        </TouchableOpacity>
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
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 8,
    color: "#222",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#777",
    marginBottom: 24,
    textAlign: "center",
  },
  listCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  bookingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#f2f2f7",
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ffeaea",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
    color: "#e03232",
  },
  station: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  date: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  reason: {
    fontSize: 13,
    color: "#b38181",
    marginTop: 2,
  },
  backBtn: {
    marginTop: 30,
    backgroundColor: "#4A4A4A",
    paddingVertical: 12,
    paddingHorizontal: 38,
    borderRadius: 12,
    alignItems: "center",
  },
  backBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0.4,
  },
});
