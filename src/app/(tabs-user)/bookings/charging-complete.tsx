import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function ChargingCompleteScreen() {
  const router = useRouter();

  // Dummy session data – replace with real props/state/hooks
  const station = "GreenCharge Hub";
  const sessionTime = "42 min";
  const energy = "19.8 kWh";
  const amount = "₹384";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>✅</Text>
        </View>
        <Text style={styles.success}>Charging Complete!</Text>
        <Text style={styles.subtitle}>You have successfully finished charging your EV.</Text>

        {/* Session Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.sessionLabel}>Station</Text>
          <Text style={styles.sessionValue}>{station}</Text>
          <Text style={styles.sessionLabel}>Session Time</Text>
          <Text style={styles.sessionValue}>{sessionTime}</Text>
          <Text style={styles.sessionLabel}>Energy Used</Text>
          <Text style={styles.sessionValue}>{energy}</Text>
          <Text style={styles.sessionLabel}>Amount Paid</Text>
          <Text style={styles.sessionValue}>{amount}</Text>
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
            style={styles.actionBtnOutline}
            onPress={() => router.push("/(tabs-user)/search/rating")}
          >
            <Text style={styles.actionTextOutline}>Rate Experience</Text>
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
    alignItems: "center",
    padding: 24,
    justifyContent: "center",
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#e5ffe2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    fontSize: 36,
    color: "#21a438",
  },
  success: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#188832",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 18,
    textAlign: "center",
    lineHeight: 22,
  },
  summaryCard: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 26,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  sessionLabel: {
    fontSize: 14,
    color: "#888",
    marginTop: 11,
  },
  sessionValue: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
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
    marginBottom: 12,
    alignItems: "center",
  },
  actionText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 0.4,
  },
  actionBtnOutline: {
    width: "100%",
    borderColor: "#188832",
    borderWidth: 2,
    paddingVertical: 13,
    borderRadius: 10,
    marginBottom: 22,
    alignItems: "center",
  },
  actionTextOutline: {
    fontSize: 16,
    color: "#188832",
    fontWeight: "bold",
    letterSpacing: 0.4,
  },
  homeBtn: {
    marginTop: 6,
    alignItems: "center",
  },
  homeBtnText: {
    fontSize: 15,
    color: "#222",
    textDecorationLine: "underline",
  },
});
