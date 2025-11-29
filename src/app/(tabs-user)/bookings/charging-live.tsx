import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function ChargingLiveScreen() {
  const router = useRouter();

  // Dummy live charging data (replace with real-time values or hooks)
  const station = "GreenCharge Hub";
  const elapsed = "16 min";
  const energySoFar = "7.9 kWh";
  const estimatedAmount = "₹162";
  const percentComplete = 39; // Example: 39% complete

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Charging icon and title */}
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>⚡️</Text>
        </View>
        <Text style={styles.title}>Charging Live</Text>
        <Text style={styles.subtitle}>
          Your session is now active at {station}
        </Text>

        {/* Live session stats */}
        <View style={styles.liveCard}>
          <Text style={styles.label}>Time Elapsed</Text>
          <Text style={styles.value}>{elapsed}</Text>
          <Text style={styles.label}>Energy Used</Text>
          <Text style={styles.value}>{energySoFar}</Text>
          <Text style={styles.label}>Estimated Amount</Text>
          <Text style={styles.value}>{estimatedAmount}</Text>
        </View>

        {/* Progress bar */}
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${percentComplete}%` }]} />
        </View>
        <Text style={styles.progressText}>{percentComplete}% complete</Text>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.stopBtn}
            onPress={() => router.push("/(tabs-user)/bookings/charging-complete")}
          >
            <Text style={styles.stopBtnText}>End Session</Text>
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
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#fff7ea",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  icon: {
    fontSize: 28,
    color: "#de9400",
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#de9400",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 15,
    color: "#555",
    marginBottom: 18,
    textAlign: "center",
    lineHeight: 22,
  },
  liveCard: {
    width: "92%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 13,
    paddingHorizontal: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  label: {
    fontSize: 13,
    color: "#888",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginTop: 2,
  },
  progressBarBg: {
    width: "88%",
    height: 18,
    backgroundColor: "#d6e2f0",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 8,
    marginTop: 4,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#de9400",
    borderRadius: 10,
  },
  progressText: {
    fontSize: 15,
    color: "#555",
    marginBottom: 28,
    textAlign: "center",
  },
  actions: {
    width: "100%",
    alignItems: "center",
  },
  stopBtn: {
    width: "100%",
    backgroundColor: "#de9400",
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 14,
    alignItems: "center",
  },
  stopBtnText: {
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
