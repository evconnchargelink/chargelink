// app/(tabs-host)/_layout.tsx

import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "../../components/haptic-tab";
import { IconSymbol } from "../../components/ui/icon-symbol";
import { Colors } from "../../constants/theme";
import { useColorScheme } from "../../hooks/use-color-scheme";

export default function HostTabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // tabBarStyle: { display: "none" },
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      {/* 🏠 HOME LOGIN */}
      <Tabs.Screen
        name="home-login"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      {/* 💰 EARNINGS */}
      <Tabs.Screen
        name="earnings"
        options={{
          title: "Earnings",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="rupeesign" color={color} />
          ),
        }}
      />

      {/* ⚙ MANAGE CHARGER */}
      <Tabs.Screen
        name="manage-charger"
        options={{
          title: "Manage",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="gear" color={color} />
          ),
        }}
      />

      {/* 👤 PROFILE */}
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
