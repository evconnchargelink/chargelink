import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function ConnectCableScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Visual cue (can replace with an SVG or local asset) */}
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>🔌</Text>
        </View>
        <Text style={styles.title}>Connect the Cable</Text>
        <Text style={styles.subtitle}>
          Please connect your EV charging cable securely to the station and your vehicle.
        </Text>

        {/* Steps or tips */}
        <View style={styles.stepsCard}>
          <Text style={styles.step}>1. Locate the charging port on your vehicle</Text>
          <Text style={styles.step}>2. Plug the cable into your car and then the station</Text>
          <Text style={styles.step}>3. Make sure all connections are firm</Text>
          <Text style={styles.tip}>
            Tip: If you have trouble, check for indicator lights and refer to station help.
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => router.push("/(tabs-user)/bookings/charging-live")}
          >
            <Text style={styles.continueText}>Cable Connected</Text>
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
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#e5eaff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    fontSize: 32,
    color: "#2660a7",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2660a7",
    marginBottom: 9,
  },
  subtitle: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 16,
  },
  stepsCard: {
    width: "93%",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  step: {
    fontSize: 15,
    color: "#222",
    marginBottom: 7,
  },
  tip: {
    marginTop: 10,
    fontSize: 14,
    color: "#2660a7",
    fontStyle: "italic",
  },
  actions: {
    width: "100%",
    alignItems: "center",
  },
  continueBtn: {
    width: "100%",
    backgroundColor: "#2660a7",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 13,
    alignItems: "center",
  },
  continueText: {
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
    marginTop: 4,
  },
});
