import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function BookingsScreen() {
  const routerHook = useRouter(); // if you also use router.push via import
  const [menuVisible, setMenuVisible] = useState(false);

  // dummy handler – wire up search/filter later
  const handleSearch = () => { };
  const handleFilter = () => { };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-200">
        <TouchableOpacity
          className="pr-3"
          onPress={() => setMenuVisible(!menuVisible)}
        >
          <Ionicons name="menu" size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">Bookings</Text>
      </View>

      {/* Sidebar overlay */}
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
                icon="🏠"
                label="Home"
                onPress={() => {
                  setMenuVisible(false);
                  router.push("/(tabs-user)/home");
                }}
              />
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
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24 }}
      >
        {/* Top summary / big card */}
        <View className="w-full bg-gray-100 rounded-2xl h-32 mb-4 justify-center px-4">
          <Text className="text-base font-semibold text-gray-800 mb-1">
            Your bookings overview
          </Text>
          <Text className="text-xs text-gray-500">
            Quick snapshot of upcoming, active and past sessions.
          </Text>
        </View>

        {/* Search + filter row */}
        <View className="flex-row items-center mb-4">
          <TextInput
            className="flex-1 bg-gray-100 rounded-xl px-3 py-2 text-sm text-gray-800"
            placeholder="Search bookings"
            placeholderTextColor="#9ca3af"
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity
            className="ml-2 w-10 h-10 rounded-xl bg-gray-900 items-center justify-center"
            onPress={handleFilter}
          >
            <Text className="text-white text-base">⌕</Text>
          </TouchableOpacity>
        </View>

        {/* Booking card 1 */}
        <TouchableOpacity
          className="w-full bg-gray-100 rounded-2xl p-4 mb-4"
          onPress={() => router.push("/(tabs-user)/bookings/details")}
        >
          <Text className="text-sm font-semibold text-gray-900 mb-1">
            Booking details
          </Text>
          <Text className="text-xs text-gray-600">
            Tap to view more information about this charging session.
          </Text>
        </TouchableOpacity>

        {/* Booking card 2 */}
        <TouchableOpacity
          className="w-full bg-gray-100 rounded-2xl p-4 mb-4"
          onPress={() => router.push("/(tabs-user)/bookings/details")}
        >
          <Text className="text-sm font-semibold text-gray-900 mb-1">
            Booking details
          </Text>
          <Text className="text-xs text-gray-600">
            Tap to view more information about this charging session.
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Sidebar item component reused from other screens
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
    <TouchableOpacity onPress={onPress} className="flex-row items-center">
      {icon ? (
        <Text className="text-lg mr-3">{icon}</Text>
      ) : (
        <View className="w-5 h-5 rounded-[4px] border-[1.5px] border-black mr-3" />
      )}
      <Text className="text-sm text-black">{label}</Text>
    </TouchableOpacity>
  );
}
