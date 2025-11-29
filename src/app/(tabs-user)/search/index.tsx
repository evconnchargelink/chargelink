import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";  // 👈 ADDED

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const chargers = [
    { id: "1", name: "EV Station - Sector 21", distance: "2.3 km", price: "₹18 / kWh" },
    { id: "2", name: "GreenCharge Point", distance: "4.1 km", price: "₹20 / kWh" },
    { id: "3", name: "SuperFast EV Charger", distance: "1.2 km", price: "₹16 / kWh" },
  ];

  return (
    <SafeAreaView className="mt-4 mb-6 flex-1 bg-gray-100">
      <View className="flex-1 p-4">

        {/* 🟢 SEARCH BAR */}
        <View className="flex-row items-center bg-white px-3 py-2 rounded-lg shadow">
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            placeholder="Search chargers, locations..."
            className="flex-1 ml-2"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText("")}>
              <Ionicons name="close-circle" size={18} color="#666" />
            </TouchableOpacity>
          )}
        </View>

        {/* ⚙ FILTER + 📍MAP BUTTON */}
        <View className="flex-row justify-between my-3">
          <TouchableOpacity
            className="flex-row items-center bg-white px-4 py-2 rounded-lg shadow"
            onPress={() => router.navigate("/(tabs-user)/search/filter")}
          >
            <Ionicons name="options" size={18} />
            <Text className="font-bold ml-2">Filters</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center bg-black px-4 py-2 rounded-lg shadow"
            onPress={() => router.push("/(tabs-user)/map")}
          >
            <Ionicons name="map" size={18} color="white" />
            <Text className="text-white font-bold ml-2">Map View</Text>
          </TouchableOpacity>
        </View>

        {/* 📋 LIST OF CHARGERS */}
        <FlatList
          data={chargers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="bg-white p-4 my-2 rounded-lg shadow"
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
              <Text className="text-lg font-bold">{item.name}</Text>
              <Text className="text-gray-600 mt-1">📍 {item.distance}</Text>
              <Text className="mt-1 font-semibold">⚡ {item.price}</Text>
            </TouchableOpacity>
          )}
        />

      </View>
    </SafeAreaView>
  );
}
