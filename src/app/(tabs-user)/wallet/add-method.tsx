import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function AddMethodScreen() {
  const router = useRouter();

  const [type, setType] = useState("Credit Card");
  const [details, setDetails] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    // Replace with API/backend submit logic
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      router.push("/(tabs-user)/wallet/manage-methods");
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Payment Method 💳</Text>
        <View style={styles.formCard}>
          <Text style={styles.label}>Method Type</Text>
          <View style={styles.typeRow}>
            <TouchableOpacity
              style={[
                styles.typeBtn,
                type === "Credit Card" && styles.typeBtnActive,
              ]}
              onPress={() => setType("Credit Card")}
            >
              <Text style={styles.typeText}>Credit Card</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeBtn,
                type === "UPI" && styles.typeBtnActive,
              ]}
              onPress={() => setType("UPI")}
            >
              <Text style={styles.typeText}>UPI</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>{type === "Credit Card" ? "Card Number" : "UPI ID"}</Text>
          <TextInput
            style={styles.input}
            placeholder={type === "Credit Card" ? "Enter card number (**** 1234)" : "e.g. yourname@upi"}
            value={details}
            onChangeText={setDetails}
            keyboardType={type === "Credit Card" ? "numeric" : "default"}
          />
          <Text style={styles.label}>Name (Label for this method)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. HDFC, Axis, Personal"
            value={name}
            onChangeText={setName}
          />
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
            disabled={!details || !name}
          >
            <Text style={styles.submitText}>
              Add {type === "Credit Card" ? "Card" : "UPI"}
            </Text>
          </TouchableOpacity>
          {success && (
            <Text style={styles.successMsg}>Payment method added!</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.push("/(tabs-user)/wallet/manage-methods")}
        >
          <Text style={styles.backBtnText}>Back to Manage Methods</Text>
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
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 15,
    textAlign: "center",
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 22,
    paddingHorizontal: 18,
    marginBottom: 22,
    width: "95%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 1,
  },
  label: {
    fontSize: 15,
    color: "#567",
    marginBottom: 6,
    marginTop: 10,
  },
  typeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  typeBtn: {
    backgroundColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 10,
    marginHorizontal: 2,
  },
  typeBtnActive: {
    backgroundColor: "#2686d9",
  },
  typeText: {
    fontSize: 15,
    color: "#222",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 12,
    marginBottom: 3,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    fontSize: 15,
    color: "#222",
  },
  submitBtn: {
    backgroundColor: "#2686d9",
    borderRadius: 12,
    marginTop: 16,
    paddingVertical: 14,
    alignItems: "center",
    width: "100%",
    opacity: 1,
  },
  submitText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  successMsg: {
    color: "#14a447",
    fontSize: 16,
    marginTop: 16,
    textAlign: "center",
  },
  backBtn: {
    backgroundColor: "#222",
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 36,
    marginTop: 15,
    alignItems: "center",
    width: "95%",
  },
  backBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0.2,
  },
});
