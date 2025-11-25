import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function InvoiceScreen() {
  const router = useRouter();

  // Dummy invoice data – replace with real values as needed
  const invoice = {
    user: "Demo User",
    charger: "EV Station 21",
    amount: "₹120",
    date: "23-Nov-2025",
    status: "Paid",
    transactionId: "TRX2400117",
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Invoice 🧾</Text>
        <View style={styles.card}>
          <Text style={styles.label}>User</Text>
          <Text style={styles.value}>{invoice.user}</Text>
          <Text style={styles.label}>Charger</Text>
          <Text style={styles.value}>{invoice.charger}</Text>
          <Text style={styles.label}>Amount Paid</Text>
          <Text style={styles.value}>{invoice.amount}</Text>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{invoice.date}</Text>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.statusPaid}>✅ {invoice.status}</Text>
          <Text style={styles.label}>Transaction ID</Text>
          <Text style={styles.value}>{invoice.transactionId}</Text>
        </View>

        <TouchableOpacity 
          style={styles.linkBtn}
          onPress={() => router.push("/(tabs-user)/wallet/transactions")}
        >
          <Text style={styles.linkText}>View Transactions</Text>
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
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#222",
    textAlign: "center",
  },
  card: {
    width: "92%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 19,
    paddingHorizontal: 18,
    marginBottom: 34,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 7,
    elevation: 2,
  },
  label: {
    fontSize: 13,
    color: "#888",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#222",
    fontWeight: "bold",
    marginTop: 2,
  },
  statusPaid: {
    fontSize: 15,
    color: "#22a322",
    fontWeight: "bold",
    marginTop: 3,
    marginBottom: 6,
  },
  linkBtn: {
    alignItems: "center",
  },
  linkText: {
    color: "#1877f2",
    fontSize: 15,
    textDecorationLine: "underline",
    marginTop: 5,
  },
});
