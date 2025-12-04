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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/(tabs-user)/home")}>
          <Ionicons name="menu" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* avatar + name row */}
        <View style={styles.topRow}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={46} color="#555" />
          </View>
          <View style={styles.topText}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.info}>{user.email}</Text>
          </View>
        </View>

        {/* personal information card */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionLabel}>Personal information</Text>
          <View style={styles.sectionDivider} />

          <View style={{ marginTop: 10 }}>
            <MiniRow label="Name" value={user.name} />
            <MiniRow label="Email" value={user.email} />
            <MiniRow label="Phone" value={user.phone} />
          </View>

          <View style={styles.bottomButtonsRow}>
            <SmallButton
              icon="create-outline"
              label="Edit profile"
              onPress={() => router.push("/(tabs-user)/profile/edit-profile")}
            />
            <SmallButton
              icon="key-outline"
              label="Password"
              onPress={() => router.push("/(tabs-user)/profile/change-password")}
            />
            <SmallButton
              icon="car-sport-outline"
              label="Vehicles"
              onPress={() =>
                router.push("/(tabs-user)/profile/usage-management")
              }
            />
          </View>
        </View>

        {/* KYC card */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionLabel}>KYC information</Text>
          <View style={styles.sectionDivider} />

          <Text style={styles.kycHint}>
            Manage your identity documents and verification details here.
          </Text>

          <View style={styles.bottomButtonsRow}>
            <SmallButton
              icon="shield-checkmark-outline"
              label="KYC status"
              onPress={() => router.push("/(tabs-user)/profile/kyc")}
            />
            <SmallButton
              icon="notifications-outline"
              label="Alerts"
              onPress={() => router.push("/(tabs-user)/profile/notifications")}
            />
            <SmallButton
              icon="settings-outline"
              label="Settings"
              onPress={() => router.push("/(tabs-user)/profile/settings")}
            />
          </View>
        </View>

        {/* Support / Refer & Earn row under cards */}
        <View style={styles.rowCard}>
          <ProfileRow
            icon="gift-outline"
            label="Refer & Earn"
            onPress={() => router.push("/(tabs-user)/profile/refer-and-earn")}
          />
          <ProfileRow
            icon="help-circle-outline"
            label="Support"
            onPress={() => router.push("/(tabs-user)/profile/support")}
          />
        </View>

        {/* Logout */}
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
      </ScrollView>
    </SafeAreaView>
  );
}

/* small helper components */

const MiniRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.miniRow}>
    <Text style={styles.miniLabel}>{label}</Text>
    <Text style={styles.miniValue}>{value}</Text>
  </View>
);

const SmallButton = ({
  icon,
  label,
  onPress,
}: {
  icon: any;
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.smallButton} onPress={onPress}>
    <Ionicons name={icon} size={20} color="#111827" />
    <Text style={styles.smallButtonText}>{label}</Text>
  </TouchableOpacity>
);

const ProfileRow = ({
  icon,
  label,
  onPress,
}: {
  icon: any;
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.row} onPress={onPress}>
    <View style={styles.rowLeft}>
      <Ionicons name={icon} size={20} color="#111827" />
      <Text style={styles.rowLabel}>{label}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#777" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: "#f2f2f7",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 20,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },
  avatar: {
    backgroundColor: "#e5e7eb",
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  topText: {
    flex: 1,
  },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 2, color: "#111827" },
  info: { fontSize: 14, color: "#555" },

  sectionBox: {
    backgroundColor: "white",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 22,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  sectionDivider: {
    height: 1,
    backgroundColor: "#e5e5e5",
    marginTop: 6,
  },
  miniRow: {
    marginTop: 8,
  },
  miniLabel: {
    fontSize: 12,
    color: "#9ca3af",
  },
  miniValue: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
    marginTop: 1,
  },
  kycHint: {
    fontSize: 13,
    color: "#4b5563",
    marginTop: 10,
  },
  bottomButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  smallButton: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },
  smallButtonText: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
    color: "#111827",
    textAlign: "center",
  },

  rowCard: {
    backgroundColor: "white",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginTop: 22,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#e5e5e5",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 10,
    color: "#111827",
  },

  logoutBtn: {
    backgroundColor: "#b91c1c",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 12,
    marginTop: 28,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});
