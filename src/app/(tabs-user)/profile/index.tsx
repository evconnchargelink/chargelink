import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      const loadUser = async () => {
        try {
          const storedUser = await AsyncStorage.getItem("userData");

          if (storedUser) {
            setUser(JSON.parse(storedUser));
          } else {
            setUser({
              name: "Guest User",
              email: "guest@example.com",
              phone: "0000000000",
            });
          }
        } catch (err) {
          console.log("Error loading user data", err);
          setUser({
            name: "Guest User",
            email: "guest@example.com",
            phone: "0000000000",
          });
        }
      };

      loadUser();
    }, [])
  );

  if (!user) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f7" }}>
      <ScrollView style={styles.container}>
        {/* Profile Card */}
        <View style={styles.card}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={50} color="#555" />
          </View>

          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.info}>{user.email}</Text>
          <Text style={styles.info}>{user.phone}</Text>
        </View>

        {/* ACCOUNT SECTION */}
        <Text style={styles.sectionTitle}>Account</Text>

        <View style={styles.sectionCard}>
          <ProfileItem
            icon="create-outline"
            label="Edit Profile"
            onPress={() => router.push("/(tabs-user)/profile/edit-profile")}
          />

          <ProfileItem
            icon="key-outline"
            label="Change Password"
            onPress={() => router.push("/(tabs-user)/profile/change-password")}
          />

          <ProfileItem
            icon="shield-checkmark-outline"
            label="KYC Verification"
            onPress={() => router.push("/(tabs-user)/profile/kyc")}
          />

          <ProfileItem
            icon="car-sport-outline"
            label="Vehicle Management"
            onPress={() => router.push("/(tabs-user)/profile/usage-management")}
          />

          <ProfileItem
            icon="gift-outline"
            label="Refer & Earn"
            onPress={() => router.push("/(tabs-user)/profile/refer-and-earn")}
          />
        </View>

        {/* APP SETTINGS */}
        <Text style={styles.sectionTitle}>App Settings</Text>

        <View style={styles.sectionCard}>
          <ProfileItem
            icon="notifications-outline"
            label="Notifications"
            onPress={() => router.push("/(tabs-user)/profile/notifications")}
          />

          <ProfileItem
            icon="settings-outline"
            label="Settings"
            onPress={() => router.push("/(tabs-user)/profile/settings")}
          />

          <ProfileItem
            icon="help-circle-outline"
            label="Support"
            onPress={() => router.push("/(tabs-user)/profile/support")}
          />
        </View>

        {/* LOGOUT */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={async () => {
            await AsyncStorage.removeItem("userData");
            router.replace("/(auth)/login");
          }}
        >
          <Ionicons name="log-out-outline" size={22} color="white" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.back} onPress={() => router.push("/(tabs-user)/home")}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* COMPONENT: Profile Item Row */
const ProfileItem = ({ icon, label, onPress }: any) => (
  <TouchableOpacity style={styles.row} onPress={onPress}>
    <View style={styles.rowLeft}>
      <Ionicons name={icon} size={22} color="#000" />
      <Text style={styles.rowLabel}>{label}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#777" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 4,
    marginTop: 60,
  },

  avatar: {
    backgroundColor: "#e5e7eb",
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  name: { fontSize: 24, fontWeight: "bold", marginBottom: 5 },
  info: { fontSize: 15, color: "#555" },

  sectionTitle: {
    marginTop: 25,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },

  sectionCard: {
    backgroundColor: "white",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#e5e5e5",
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  rowLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
  },

  logoutBtn: {
    backgroundColor: "#b91c1c",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 12,
    marginTop: 30,
  },

  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  back: { marginTop: 20, alignItems: "center" },
  backText: { color: "blue", fontSize: 16, fontWeight: "500" },
});
