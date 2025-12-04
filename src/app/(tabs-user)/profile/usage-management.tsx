import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UsageManagement() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [model, setModel] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    const load = async () => {
      const saved = await AsyncStorage.getItem("vehicles");
      if (saved) setVehicles(JSON.parse(saved));
    };
    load();
  }, []);

  const saveVehicles = async (list: any[]) => {
    setVehicles(list);
    await AsyncStorage.setItem("vehicles", JSON.stringify(list));
  };

  const handleAdd = () => {
    if (!model || !number) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }

    const newVehicle = {
      id: Date.now(),
      model,
      number,
    };

    const updated = [...vehicles, newVehicle];
    saveVehicles(updated);

    setModel("");
    setNumber("");

    Alert.alert("Success", "Vehicle added successfully!");
  };

  const deleteVehicle = (id: number) => {
    const filtered = vehicles.filter((v) => v.id !== id);
    saveVehicles(filtered);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Vehicle Management 🚗</Text>

          {/* Add New Vehicle */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Add New Vehicle</Text>

            <View style={styles.inputBox}>
              <Ionicons name="car-outline" size={22} color="#666" />
              <TextInput
                style={styles.input}
                placeholder="Vehicle Model (e.g. Ola S1 Pro)"
                placeholderTextColor="#9ca3af"
                value={model}
                onChangeText={setModel}
              />
            </View>

            <View style={styles.inputBox}>
              <Ionicons name="pricetag-outline" size={22} color="#666" />
              <TextInput
                style={styles.input}
                placeholder="Vehicle Number"
                placeholderTextColor="#9ca3af"
                value={number}
                onChangeText={setNumber}
              />
            </View>

            <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
              <Text style={styles.addText}>Add Vehicle</Text>
            </TouchableOpacity>
          </View>

          {/* Saved vehicles */}
          <Text style={styles.listTitle}>Your Vehicles</Text>

          {vehicles.length === 0 ? (
            <Text style={styles.emptyText}>
              No vehicles added yet. Add one above to save it for faster
              bookings.
            </Text>
          ) : (
            <View style={styles.vehiclesWrapper}>
              {vehicles.map((item) => (
                <View key={item.id} style={styles.vehicleCard}>
                  <View>
                    <Text style={styles.vehicleModel}>{item.model}</Text>
                    <Text style={styles.vehicleNumber}>{item.number}</Text>
                  </View>

                  <TouchableOpacity onPress={() => deleteVehicle(item.id)}>
                    <Ionicons name="trash-outline" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.navigate("/(tabs-user)/profile")}
            style={styles.backBtn}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f2f2f7",
  },
  scroll: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  addBtn: {
    backgroundColor: "#000000",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  addText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  listTitle: {
    marginTop: 32,
    fontSize: 20,
    fontWeight: "600",
  },
  emptyText: {
    marginTop: 12,
    fontSize: 14,
    color: "#666666",
  },
  vehiclesWrapper: {
    marginTop: 12,
  },
  vehicleCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  vehicleModel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000000",
  },
  vehicleNumber: {
    fontSize: 15,
    color: "#555555",
    marginTop: 2,
  },
  backBtn: {
    marginTop: 32,
    marginBottom: 8,
    alignItems: "center",
  },
  backText: {
    fontSize: 16,
    color: "blue",
    fontWeight: "500",
  },
});