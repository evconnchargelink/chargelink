import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function ScanQRScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* QR Code Icon */}
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>📷</Text>
        </View>
        <Text style={styles.title}>Scan Charging Station QR</Text>
        <Text style={styles.subtitle}>
          To start your charging session, please scan the QR code at your selected station using your phone’s camera.
        </Text>

        {/* Placeholder QR box */}
        <View style={styles.qrBox}>
          <Text style={styles.qrText}>QR Camera View</Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.scanBtn}
            onPress={() => router.push("/(tabs-user)/bookings/connect-cable")}
          >
            <Text style={styles.scanText}>Simulate Scan</Text>
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
    backgroundColor: "#e6f3ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  icon: {
    fontSize: 32,
    color: "#277ddb",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#277ddb",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 22,
  },
  qrBox: {
    width: 200,
    height: 200,
    backgroundColor: "#e6f3ff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 38,
    borderWidth: 2,
    borderColor: "#277ddb",
  },
  qrText: {
    fontSize: 17,
    color: "#277ddb",
    fontWeight: "bold",
  },
  actions: {
    width: "100%",
    alignItems: "center",
  },
  scanBtn: {
    width: "100%",
    backgroundColor: "#277ddb",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 13,
    alignItems: "center",
  },
  scanText: {
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
