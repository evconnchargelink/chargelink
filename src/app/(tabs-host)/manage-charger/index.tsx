import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultImage =
  "https://cdn-icons-png.flaticon.com/512/2967/2967061.png"; // Default image

type Charger = {
  id: string;
  name: string;
  location: string;
  price: string;
  image: string | null;
};

export default function ManageCharger() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [chargers, setChargers] = useState<Charger[]>([]);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null); // BLOCK LOOP 🔒

  // Load existing chargers once
  useEffect(() => {
    const loadData = async () => {
      const saved = await AsyncStorage.getItem("chargers");
      if (saved) setChargers(JSON.parse(saved));
    };
    loadData();
  }, []);

  // Add / Edit charger when params change
  useEffect(() => {
    if (!params?.id) return; // No data → return

    const newId = params.id as string;
    if (lastAddedId === newId) return; // SAME PARAM = STOP LOOP 🚫

    const newCharger: Charger = {
      id: params.id as string,
      name: params.name as string,
      location: params.location as string,
      price: `${params.price} ₹/kWh`,
      image: (params.image as string) || null,
    };

    setChargers((prev) => {
      const exists = prev.some((c) => c.id === newCharger.id);
      const updated = exists
        ? prev.map((c) => (c.id === newCharger.id ? newCharger : c)) // EDIT
        : [...prev, newCharger]; // ADD NEW

      AsyncStorage.setItem("chargers", JSON.stringify(updated));
      return updated;
    });

    setLastAddedId(newId);
  }, [params]);

  // DELETE Charger
  const deleteCharger = async (id: string) => {
    const filtered = chargers.filter((c) => c.id !== id);
    setChargers(filtered);
    await AsyncStorage.setItem("chargers", JSON.stringify(filtered));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Chargers ⚙️</Text>

      {chargers.length === 0 ? (
        <Text style={styles.noData}>⚠ No chargers available</Text>
      ) : (
        <FlatList
          data={chargers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <Image
                source={{ uri: item.image ? item.image : defaultImage }}
                style={styles.img}
              />

              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.sub}>📍 {item.location}</Text>
              <Text style={styles.price}>⚡ {item.price}</Text>

              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() =>
                    router.push({
                      pathname: "/(tabs-host)/pricing-settings",
                      params: {
                        id: item.id,
                        name: item.name,
                        location: item.location,
                        currentPrice: item.price.replace(" ₹/kWh", ""),
                        image: item.image || "",
                      },
                    })
                  }
                >
                  <Text style={styles.editText}>Edit Price</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => deleteCharger(item.id)}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  noData: { textAlign: "center", marginTop: 60, fontSize: 18 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  img: { width: 100, height: 100, borderRadius: 8, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: "bold" },
  sub: { fontSize: 14, marginBottom: 4 },
  price: { color: "green", fontSize: 16, fontWeight: "bold" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  editBtn: { backgroundColor: "black", padding: 8, borderRadius: 6 },
  deleteBtn: { backgroundColor: "red", padding: 8, borderRadius: 6 },
  editText: { color: "white" },
  deleteText: { color: "white" },
});
