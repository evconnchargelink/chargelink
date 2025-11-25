import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function WalletRulesLawsScreen() {
  const router = useRouter();

  // Dummy wallet rules & laws (replace or expand for real compliance/legal)
  const rules = [
    "Refunds are processed as per RBI guidelines and may take up to 5 working days.",
    "All wallet transactions comply with local taxation and KYC regulations.",
    "The wallet is to be used solely for EV charging payments and related services.",
    "Your payment details are securely encrypted and never shared with third parties.",
    "Attempts to misuse, hack, or defraud will result in account suspension and possible legal action.",
    "Please ensure your UPI and card details are accurate and consistent for seamless transactions.",
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Wallet Rules & Laws ⚖️</Text>
        <Text style={styles.subtitle}>
          Please read and follow the wallet usage guidelines and compliance statements below.
        </Text>
        <View style={styles.rulesCard}>
          {rules.map((rule, idx) => (
            <Text key={idx} style={styles.ruleText}>
              • {rule}
            </Text>
          ))}
        </View>
        <TouchableOpacity
          style={styles.walletBtn}
          onPress={() => router.push("/(tabs-user)/wallet")}
        >
          <Text style={styles.walletBtnText}>Back to Wallet</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fafbfc",
  },
  container: {
    alignItems: "center",
    padding: 24,
    paddingBottom: 36,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
    color: "#222",
    marginBottom: 7,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#777",
    marginBottom: 18,
    textAlign: "center",
  },
  rulesCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 1,
  },
  ruleText: {
    fontSize: 15,
    color: "#222",
    marginBottom: 13,
    lineHeight: 20,
  },
  walletBtn: {
    backgroundColor: "#222",
    borderRadius: 12,
    marginTop: 4,
    paddingVertical: 14,
    paddingHorizontal: 38,
    alignItems: "center",
    width: "100%",
  },
  walletBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0.2,
  },
});
