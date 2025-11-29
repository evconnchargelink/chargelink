import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const chargers = [
  {
    id: "1",
    name: "EV Plaza - Sector 17",
    distance: "0.8 km",
    slots: "2 / 4 free",
    price: "₹18/kWh",
  },
  {
    id: "2",
    name: "FastCharge Station",
    distance: "1.4 km",
    slots: "1 / 6 free",
    price: "₹20/kWh",
  },
  {
    id: "3",
    name: "GreenCharge Hub",
    distance: "2.1 km",
    slots: "3 / 5 free",
    price: "₹17/kWh",
  },
];

export default function ChargersScreen() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#f2f2f7]">
      {/* Top bar */}
      <View className="flex-row items-center px-4 pt-2 pb-3">
        <TouchableOpacity
          onPress={() => setMenuVisible(!menuVisible)}
          className="mr-3"
        >
          <Ionicons name="menu" size={26} color="#111827" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-[#111827]">
          Chargers
        </Text>
      </View>

      {/* Menu overlay + sidebar */}
      {menuVisible && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
          className="absolute inset-0 bg-black/40 z-10"
        >
          <View className="absolute left-0 top-0 h-full w-64 bg-white pt-10 px-5 rounded-tr-3xl rounded-br-3xl shadow-lg">
            {/* Header */}
            <View className="flex-row items-center mb-5">
              <View className="w-12 h-12 rounded-full border-2 border-black" />
              <View className="ml-3">
                <Text className="text-sm font-semibold text-black">
                  Ronak Paul
                </Text>
                <Text className="text-[11px] text-gray-500">
                  ronakpaul832@gmail.com
                </Text>
              </View>
            </View>

            <View className="h-[1px] bg-black mb-6" />

            {/* Menu items */}
            <View className="space-y-6">
              <SidebarItem
                icon="🏠"
                label="Home"
                onPress={() => {
                  setMenuVisible(false);
                  router.push("/(tabs-user)/home");
                }}
              />
              <SidebarItem
                icon="📅"
                label="Bookings"
                onPress={() => {
                  setMenuVisible(false);
                  router.push("/(tabs-user)/bookings");
                }}
              />
              <SidebarItem
                icon="🚗"
                label="Car Details"
                onPress={() => {
                  setMenuVisible(false);
                  router.push("/(tabs-user)/profile/usage-management");
                }}
              />
              <SidebarItem
                icon="👛"
                label="Wallet"
                onPress={() => {
                  setMenuVisible(false);
                  router.push("/(tabs-user)/wallet");
                }}
              />
              <SidebarItem
                icon="🔔"
                label="Notifications"
                onPress={() => {
                  setMenuVisible(false);
                  router.push("/(tabs-user)/profile/notifications");
                }}
              />
              <SidebarItem
                icon="⚙️"
                label="Settings"
                onPress={() => {
                  setMenuVisible(false);
                  router.push("/(tabs-user)/profile/settings");
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      )}

      {/* List */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {chargers.map((item) => (
          <TouchableOpacity
            key={item.id}
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
            className="mb-3 w-full rounded-2xl bg-white px-4 py-3 shadow-sm flex-row items-center justify-between"
          >
            <View className="flex-1 pr-3">
              <Text className="text-base font-semibold text-[#111827]">
                {item.name}
              </Text>
              <Text className="mt-1 text-sm text-[#6b7280]">
                {item.distance} • {item.slots}
              </Text>
              <Text className="mt-1 text-xs font-medium text-[#111827]">
                {item.price}
              </Text>
            </View>

            <View className="items-end">
              <View className="mb-2 rounded-full bg-emerald-100 px-2 py-1">
                <Text className="text-[10px] font-semibold text-emerald-700">
                  Available
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color="#9ca3af"
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// Small helper component for sidebar rows
function SidebarItem({
  icon,
  label,
  onPress,
}: {
  icon?: string;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center"
    >
      {icon ? (
        <Text className="text-lg mr-3">{icon}</Text>
      ) : (
        <View className="w-5 h-5 rounded-[4px] border-[1.5px] border-black mr-3" />
      )}
      <Text className="text-sm text-black">{label}</Text>
    </TouchableOpacity>
  );
}
