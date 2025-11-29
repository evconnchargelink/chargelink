import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

export default function SearchResults() {
  const [searchText, setSearchText] = useState("");

  const results = [
    { id: "1", name: "EV Station - Sector 21", distance: "2.3 km", price: "₹18/kWh" },
    { id: "2", name: "GreenCharge Station", distance: "4.1 km", price: "₹20/kWh" },
  ];

  return (
    <View style={styles.container}>
      {/* 🔍 Search Bar */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          placeholder="Search chargers, locations..."
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
        />

        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText("")}>
            <Ionicons name="close-circle" size={18} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* FILTER + MAP */}
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => router.push("/(tabs-user)/search/filter")}
        >
          <Ionicons name="options" size={18} />
          <Text style={styles.btnText}>Filters</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.mapBtn}
          onPress={() => router.push("/(tabs-user)/map")}
        >
          <Ionicons name="map" size={18} color="white" />
          <Text style={[styles.btnText, { color: "white" }]}>Map View</Text>
        </TouchableOpacity>
      </View>

      {/* 🔥 Search Result List */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/(tabs-user)/search/charger",
                params: {
                  id: item.id,
                  name: item.name,
                  distance: item.distance,
                  price: item.price,
                },
              })
            }
          >
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.sub}>📍 {item.distance}</Text>
            <Text style={styles.price}>⚡ {item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f2f2f2" },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },

  input: { flex: 1, marginLeft: 8 },

  row: { flexDirection: "row", justifyContent: "space-between", marginVertical: 12 },

  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },

  mapBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },

  btnText: { marginLeft: 6, fontWeight: "bold" },

  card: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },

  cardTitle: { fontWeight: "bold", fontSize: 17 },
  sub: { color: "#555", marginTop: 5 },
  price: { fontWeight: "600", marginTop: 5 },
});
