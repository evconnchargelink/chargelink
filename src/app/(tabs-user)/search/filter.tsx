import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

export default function SearchFilter() {
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // Filters
  const [distance, setDistance] = useState("10");
  const [chargerType, setChargerType] = useState<string[]>([]);
  const [availability, setAvailability] = useState("");
  const [priceRange, setPriceRange] = useState("any");

  const toggleType = (type: string) => {
    if (chargerType.includes(type)) {
      setChargerType(chargerType.filter((t) => t !== type));
    } else {
      setChargerType([...chargerType, type]);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setDistance("10");
    setChargerType([]);
    setAvailability("");
    setPriceRange("any");
  };

  const applyFilters = () => {
    router.navigate({
      pathname: "/(tabs-user)/search",
      params: {
        search,
        distance,
        chargerType: JSON.stringify(chargerType),
        availability,
        priceRange,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Stations 🔍</Text>

      {/* Search Bar */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={22} color="#777" />
        <TextInput
          style={styles.input}
          placeholder="Search by station name or location"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Filter Button */}
      <TouchableOpacity
        style={styles.filterBtn}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="options-outline" size={22} color="white" />
        <Text style={styles.filterText}>Open Filters</Text>
      </TouchableOpacity>

      {/* Apply Search */}
      <TouchableOpacity style={styles.searchBtn} onPress={applyFilters}>
        <Text style={styles.searchBtnText}>Apply Search</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity
        style={{ marginTop: 25 }}
        onPress={() => router.navigate("/(tabs-user)/search")}
      >
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      {/* Filter Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Filters</Text>

          {/* Distance */}
          <Text style={styles.sectionTitle}>Distance</Text>
          <View style={styles.row}>
            {["5", "10", "20", "50"].map((d) => (
              <TouchableOpacity
                key={d}
                style={[
                  styles.option,
                  distance === d && styles.selectedOption,
                ]}
                onPress={() => setDistance(d)}
              >
                <Text
                  style={[
                    styles.optionText,
                    distance === d && styles.optionTextSelected,
                  ]}
                >
                  {d} km
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Charger Type */}
          <Text style={styles.sectionTitle}>Charger Type</Text>
          <View style={styles.row}>
            {["CCS2", "Type2", "CHAdeMO", "GB/T"].map((t) => (
              <TouchableOpacity
                key={t}
                style={[
                  styles.option,
                  chargerType.includes(t) && styles.selectedOption,
                ]}
                onPress={() => toggleType(t)}
              >
                <Text
                  style={[
                    styles.optionText,
                    chargerType.includes(t) && styles.optionTextSelected,
                  ]}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Availability */}
          <Text style={styles.sectionTitle}>Availability</Text>
          <View style={styles.row}>
            {["available", "busy"].map((a) => (
              <TouchableOpacity
                key={a}
                style={[
                  styles.option,
                  availability === a && styles.selectedOption,
                ]}
                onPress={() => setAvailability(a)}
              >
                <Text
                  style={[
                    styles.optionText,
                    availability === a && styles.optionTextSelected,
                  ]}
                >
                  {a === "available" ? "Available" : "Busy"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Price Range */}
          <Text style={styles.sectionTitle}>Price Range</Text>
          <View style={styles.row}>
            {["any", "low", "medium", "high"].map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.option,
                  priceRange === p && styles.selectedOption,
                ]}
                onPress={() => setPriceRange(p)}
              >
                <Text
                  style={[
                    styles.optionText,
                    priceRange === p && styles.optionTextSelected,
                  ]}
                >
                  {p.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Buttons */}
          <TouchableOpacity style={styles.applyBtn} onPress={applyFilters}>
            <Text style={styles.applyText}>Apply Filters</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 25 }}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.back}>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 70, paddingHorizontal: 20 },
  title: { fontSize: 26, fontWeight: "bold" },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 12,
    marginTop: 20,
  },

  input: { flex: 1, marginLeft: 10, fontSize: 16 },

  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 12,
    marginTop: 20,
  },

  filterText: { color: "white", marginLeft: 10, fontSize: 16, fontWeight: "600" },

  searchBtn: {
    marginTop: 25,
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  searchBtnText: { color: "white", fontSize: 17, fontWeight: "600" },
  back: { fontSize: 16, color: "blue", fontWeight: "500", textAlign: "center" },

  modalContainer: { flex: 1, padding: 20, paddingTop: 60 },
  modalTitle: { fontSize: 26, fontWeight: "bold" },

  sectionTitle: {
    fontSize: 18,
    marginTop: 25,
    marginBottom: 10,
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
  },

  selectedOption: {
    backgroundColor: "#111827",
  },

  optionText: { fontSize: 15, color: "#333" },
  optionTextSelected: { color: "white" },

  applyBtn: {
    marginTop: 30,
    backgroundColor: "#111827",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  applyText: { color: "white", fontSize: 17, fontWeight: "600" },

  resetBtn: {
    marginTop: 15,
    borderWidth: 2,
    borderColor: "#666",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  resetText: { color: "#444", fontSize: 16, fontWeight: "500" },
});
