import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeLogin() {
  const router = useRouter();
  const [stats, setStats] = useState({ earnings: 0, chargers: 0 });

  // 🔥 Fetch from AsyncStorage
  const fetchStatsFromStorage = async () => {
    try {
      const earnings = await AsyncStorage.getItem("totalEarnings");
      const chargers = await AsyncStorage.getItem("activeChargers");

      setStats({
        earnings: earnings ? Number(earnings) : 0,
        chargers: chargers ? Number(chargers) : 0,
      });
    } catch (error) {
      console.log("Error fetching stats:", error);
    }
  };

  // Screen load hone par SAVE + FETCH
  useEffect(() => {
    const setInitialValues = async () => {
      try {
        const earnings = await AsyncStorage.getItem("totalEarnings");

        // Only save if not already stored
        if (!earnings) {
          await AsyncStorage.setItem("totalEarnings", "5000");
          await AsyncStorage.setItem("activeChargers", "8");
        }
      } catch (error) {
        console.log("Error setting initial values:", error);
      }
    };

    setInitialValues();
    fetchStatsFromStorage();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome, Host 👋</Text>
        <Text style={styles.subtitle}>Manage chargers & track earnings</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>₹{stats.earnings}</Text>
          <Text style={styles.statLabel}>Total Earnings</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.chargers}</Text>
          <Text style={styles.statLabel}>Active Chargers</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={() => router.push("/(tabs-host)/add-charger")}
        >
          <Text style={styles.cardTitle}>+ Add New Charger</Text>
          <Text style={styles.cardDesc}>Register your EV charger</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cardButton}
          onPress={() => router.push("/(tabs-host)/manage-charger")}
        >
          <Text style={styles.cardTitle}>Manage Chargers</Text>
          <Text style={styles.cardDesc}>
            Edit, enable/disable, update price
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },

  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: { fontSize: 28, fontWeight: "bold", color: "black" },
  subtitle: { fontSize: 16, color: "#6F6F6F", marginTop: 4 },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  statCard: {
    backgroundColor: "white",
    flex: 1,
    marginHorizontal: 5,
    padding: 20,
    borderRadius: 14,
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statNumber: { fontSize: 22, fontWeight: "bold", color: "black" },
  statLabel: { fontSize: 14, color: "#6F6F6F", marginTop: 4 },

  actions: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  cardButton: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 14,
    marginVertical: 10,
    elevation: 4,
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "black" },
  cardDesc: { fontSize: 14, color: "#6F6F6F", marginTop: 4 },
});
