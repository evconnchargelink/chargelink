import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import React, { useState } from "react";

// Dummy initial payment methods (update with real backend data)
const initialMethods = [
  {
    id: "1",
    type: "Credit Card",
    cardNumber: "1234 5678 9012 3456",
    expiry: "12/25",
    name: "VISA",
  },
  {
    id: "2",
    type: "UPI",
    upiId: "alex@okaxis",
    name: "UPI Linked",
  },
];

export default function ManageMethodsScreen() {
  const router = useRouter();
  const [paymentMethods, setPaymentMethods] = useState(initialMethods);

  const handleRemove = (id: string) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
  };

  const renderCardDetails = (method: { id: string; type: string; cardNumber: string; expiry: string; name: string; upiId?: undefined; } | { id: string; type: string; upiId: string; name: string; cardNumber?: undefined; expiry?: undefined; }) => {
    if (!method.cardNumber) return null;
    return (
      <>
        <Text style={styles.details}>
          **** **** **** {method.cardNumber.slice(-4)}
        </Text>
        {method.expiry && <Text style={styles.expiry}>Exp: {method.expiry}</Text>}
      </>
    );
  };

  const renderUPIDetails = (method: { id: string; type: string; cardNumber: string; expiry: string; name: string; upiId?: undefined; } | { id: string; type: string; upiId: string; name: string; cardNumber?: undefined; expiry?: undefined; }) => {
    return <Text style={styles.details}>{method.upiId}</Text>;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Manage Payment Methods 💳</Text>
        <Text style={styles.subtitle}>
          View, add, or remove your wallet payment methods.
        </Text>

        <View style={styles.listCard}>
          <FlatList
            data={paymentMethods}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No payment methods available.</Text>
            }
            renderItem={({ item }) => (
              <View style={styles.methodItem}>
                <View style={styles.iconCircle}>
                  <Text style={styles.icon}>
                    {item.type === "Credit Card" ? "💳" : "🏦"}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.methodType}>{item.type}</Text>
                  {item.type === "Credit Card"
                    ? renderCardDetails(item)
                    : renderUPIDetails(item)}
                  <Text style={styles.name}>{item.name}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => handleRemove(item.id)}
                >
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => router.push("/(tabs-user)/wallet/add-method")}
        >
          <Text style={styles.addBtnText}>Add New Method</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.walletBtn}
          onPress={() => router.push("/(tabs-user)/wallet")}
        >
          <Text style={styles.walletBtnText}>Back to Wallet</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f7fb",
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
    marginBottom: 7,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#777",
    marginBottom: 21,
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
  methodItem: {
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
    backgroundColor: "#eaf7ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  icon: {
    fontSize: 19,
    color: "#2686d9",
  },
  methodType: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
  },
  details: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  expiry: {
    fontSize: 13,
    color: "#999",
    marginTop: 1,
  },
  name: {
    fontSize: 13,
    color: "#2686d9",
    marginTop: 3,
  },
  removeBtn: {
    backgroundColor: "#eee",
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 10,
    marginLeft: 8,
  },
  removeText: {
    color: "#d42d2d",
    fontSize: 14,
    fontWeight: "bold",
  },
  addBtn: {
    backgroundColor: "#2686d9",
    borderRadius: 12,
    marginTop: 26,
    paddingVertical: 14,
    paddingHorizontal: 38,
    alignItems: "center",
    width: "95%",
  },
  addBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0.2,
  },
  walletBtn: {
    backgroundColor: "#222",
    borderRadius: 12,
    marginTop: 13,
    paddingVertical: 13,
    paddingHorizontal: 40,
    alignItems: "center",
    width: "95%",
  },
  walletBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0.2,
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    paddingVertical: 20,
  },
});
