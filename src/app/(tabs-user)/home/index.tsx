import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

// Dummy data; replace with real API/context
const nearbyChargers = [
  { id: "1", name: "EV Plaza - Sector 17", distance: "0.8 km", slots: "2 / 4 free" },
  { id: "2", name: "FastCharge Station", distance: "1.4 km", slots: "1 / 6 free" },
  { id: "3", name: "GreenCharge Hub", distance: "2.1 km", slots: "3 / 5 free" },
];

export default function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView className="mt-4 mb-6 flex-1 bg-[#f2f2f7]">
      {/* Top bar */}
      <View className="flex-row items-center px-4 pt-2 pb-3">
        <TouchableOpacity
          onPress={() => setMenuVisible(!menuVisible)}
          className="mr-3"
        >
          <Ionicons name="menu" size={26} color="#111827" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-[#111827]">
          Chargelink
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
                <TouchableOpacity onPress={()=>{
                  router.replace("/(tabs-user)/profile")
                }}>
                <Text className="text-sm font-semibold text-black">
                  ABC
                </Text>
                <Text className="text-[11px] text-gray-500">
                  abc12@gmail.com
                </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="h-[1px] bg-black mb-6" />

            {/* Menu items */}
            <View className="space-y-6">
              <SidebarItem
                icon="⚡"
                label="Chargers"
                onPress={() => {
                  setMenuVisible(false);
                  router.push("/(tabs-user)/chargers");
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

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Battery low banner */}
        <TouchableOpacity
          onPress={() => router.push("/(tabs-user)/search")}
          className="w-full bg-white rounded-3xl px-4 py-4 mb-4 shadow-sm flex-row items-center justify-between"
        >
          <View>
            <Text className="text-2xl font-semibold text-[#111827]">
              Battery low?
            </Text>
            <Text className="text-s text-[#6b7280] mt-1">
              Find the nearest charger in one tap
            </Text>
          </View>
          <Ionicons name="flash-outline" size={30} color="#f59e0b" />
        </TouchableOpacity>

        {/* Quick actions grid (2 x 2) */}
        <View className="mb-5">
          <View className="flex-row justify-between mb-3">
            <TouchableOpacity
              onPress={() => router.push("/search")}
              className="w-[48%] bg-white rounded-2xl px-4 py-4 shadow-sm"
            >
              <Text className="text-base font-semibold text-[#111827] mb-1">
                🔍 Search
              </Text>
              <Text className="text-xs text-[#6b7280]">
                Look up nearby chargers
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(tabs-user)/map")}
              className="w-[48%] bg-white rounded-2xl px-4 py-4 shadow-sm"
            >
              <Text className="text-base font-semibold text-[#111827] mb-1">
                🗺️ Map
              </Text>
              <Text className="text-xs text-[#6b7280]">
                View chargers on map
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={() => router.push("/(tabs-user)/bookings")}
              className="w-[48%] bg-white rounded-2xl px-4 py-4 shadow-sm"
            >
              <Text className="text-base font-semibold text-[#111827] mb-1">
                📖 Bookings
              </Text>
              <Text className="text-xs text-[#6b7280]">
                Upcoming & past sessions
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(tabs-user)/wallet")}
              className="w-[48%] bg-white rounded-2xl px-4 py-4 shadow-sm"
            >
              <Text className="text-base font-semibold text-[#111827] mb-1">
                💼 Wallet
              </Text>
              <Text className="text-xs text-[#6b7280]">
                Balance & payments
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Nearby chargers list */}
        <View>
          <View className="flex-row items-center justify-between mb-4 mt-4">
            <Text className="text-base font-semibold text-[#111827]">
              Nearby chargers
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs-user)/search")}
            >
              <Text className="text-sm font-medium text-[#2563eb]">
                See all
              </Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-8">
            {nearbyChargers.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  router.push({
                    pathname: "/(tabs-user)/search/charger",
                    params: { id: item.id, name: item.name },
                  })
                }
                className="mb-3 w-full bg-white rounded-2xl px-4 py-7 flex-row items-center justify-between shadow-sm"
              >
                <View className="flex-1 pr-3">
                  <Text className="text-base font-semibold text-[#111827]">
                    {item.name}
                  </Text>
                  <Text className="text-sm text-[#6b7280] mt-1">
                    {item.distance} • {item.slots}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#9ca3af"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
