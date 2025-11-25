import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function PricingSettings() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const name = Array.isArray(params.name) ? params.name[0] : params.name;
  const location = Array.isArray(params.location) ? params.location[0] : params.location;
  const currentPrice = Array.isArray(params.currentPrice) ? params.currentPrice[0] : params.currentPrice;
  const image = Array.isArray(params.image) ? params.image[0] : params.image;

  const [price, setPrice] = useState(currentPrice || "");

  const updatePrice = () => {
    alert(`Price updated to ₹${price}/kWh`);

    router.push({
      pathname: "/(tabs-host)/manage-charger",
      params: { id, name, price, location, image },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Update Price ⚡</Text>
        <Text style={styles.subtitle}>Set a new price for your charger</Text>

        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          placeholder="Enter new price"
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.button} onPress={updatePrice}>
          <Text style={styles.buttonText}>Save Price</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f7", // light theme background
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
    color: "#111",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginBottom: 25,
    fontSize: 16,
    color: "#111",
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
