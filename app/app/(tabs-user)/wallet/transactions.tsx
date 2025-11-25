import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function TransactionsScreen() {
  const router = useRouter();

  // Dummy data – backend se connect karenge later
  const transactions = [
    { id: "1", title: "Added Money", amount: "+ ₹500", date: "23 Nov 2025" },
    { id: "2", title: "Charging Payment", amount: "- ₹120", date: "22 Nov 2025" },
    { id: "3", title: "Refund", amount: "+ ₹120", date: "21 Nov 2025" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Transactions 📜</Text>

        <View style={styles.listCard}>
          <FlatList
            data={transactions}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text
                  style={[
                    styles.amount,
                    item.amount.startsWith("+")
                      ? styles.credit
                      : styles.debit,
                  ]}
                >
                  {item.amount}
                </Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
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
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 18,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#222",
    textAlign: "center",
  },
  listCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 23,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 14,
    marginVertical: 7,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
  },
  amount: {
    fontSize: 16,
    marginTop: 2,
    fontWeight: "bold",
  },
  credit: {
    color: "#14a447",
  },
  debit: {
    color: "#d42d2d",
  },
  date: {
    color: "#555",
    marginTop: 4,
    fontSize: 13,
  },
  homeBtn: {
    backgroundColor: "#222",
    marginTop: 24,
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 40,
    alignItems: "center",
  },
  homeBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.3,
  },
});
