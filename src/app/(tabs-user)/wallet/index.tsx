import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function WalletScreen() {
  const router = useRouter();

  // Dummy balance – replace with fetched value as needed
  const balance = "₹1000";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Wallet 💰</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Current Balance</Text>
          <Text style={styles.balance}>{balance}</Text>
        </View>
        <View style={styles.operationsCard}>
          {/* Add Money */}
          <TouchableOpacity
            style={styles.opBtn}
            onPress={() => router.push("/(tabs-user)/wallet/payment-method")}
          >
            <Text style={styles.opIcon}>➕</Text>
            <Text style={styles.opText}>Add Money</Text>
          </TouchableOpacity>
          {/* View Transactions */}
          <TouchableOpacity
            style={styles.opBtn}
            onPress={() => router.push("/(tabs-user)/wallet/transactions")}
          >
            <Text style={styles.opIcon}>📜</Text>
            <Text style={styles.opText}>View Transactions</Text>
          </TouchableOpacity>
          {/* Manage Payment Methods */}
          <TouchableOpacity
            style={styles.opBtn}
            onPress={() => router.push("/(tabs-user)/wallet/manage-methods")}
          >
            <Text style={styles.opIcon}>💳</Text>
            <Text style={styles.opText}>Manage Methods</Text>
          </TouchableOpacity>
          {/* Wallet Rules / Laws */}
          <TouchableOpacity
            style={styles.opBtn}
            onPress={() => router.push("/(tabs-user)/wallet/rules-laws")}
          >
            <Text style={styles.opIcon}>⚖️</Text>
            <Text style={styles.opText}>Wallet Rules & Laws</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => router.push("/(tabs-user)/home")}
        >
          <Text style={styles.homeBtnText}>Go to Home</Text>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 26,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 18,
    color: "#222",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginBottom: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    width: "90%",
  },
  label: {
    fontSize: 15,
    color: "#888",
    marginBottom: 7,
  },
  balance: {
    fontSize: 23,
    color: "#14a447",
    fontWeight: "bold",
  },
  operationsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 22,
    paddingVertical: 17,
    paddingHorizontal: 16,
    width: "92%",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    elevation: 2,
  },
  opBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#f2f2f7",
  },
  opIcon: {
    fontSize: 20,
    marginRight: 14,
  },
  opText: {
    fontSize: 16,
    color: "#222",
  },
  homeBtn: {
    backgroundColor: "#222",
    borderRadius: 12,
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 34,
    alignItems: "center",
  },
  homeBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0.2,
  },
});
