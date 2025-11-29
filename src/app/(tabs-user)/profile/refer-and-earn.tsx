import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReferAndEarn() {
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    const load = async () => {
      const storedUser = await AsyncStorage.getItem("userData");
      if (storedUser) {
        const user = JSON.parse(storedUser);

        // generate referral code based on name + random
        const code =
          (user.name?.split(" ")[0] || "USER").toUpperCase() +
          Math.floor(1000 + Math.random() * 9000);

        setReferralCode(code);
      } else {
        setReferralCode("USER1234");
      }
    };
    load();
  }, []);

  const copyCode = () => {
    Clipboard.setStringAsync(referralCode);
    Alert.alert("Copied!", "Referral code copied to clipboard.");
  };

  const shareApp = async () => {
    try {
      await Share.share({
        message: `Hey! Use my referral code ${referralCode} and earn rewards on your first EV charge.\nDownload the ChargeLink app now!`,
      });
    } catch (error) {
      console.log("Share error:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f7" }}>
    <View style={styles.container}>
      <Text style={styles.title}>Refer & Earn 🎁</Text>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Your Referral Code</Text>

        <View style={styles.refBox}>
          <Text style={styles.refCode}>{referralCode}</Text>
          <TouchableOpacity onPress={copyCode}>
            <Ionicons name="copy-outline" size={22} color="#000" />
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>
          Share your code with friends and earn rewards when they complete their
          first EV charging!
        </Text>

        <TouchableOpacity style={styles.shareBtn} onPress={shareApp}>
          <Ionicons name="share-social-outline" size={20} color="white" />
          <Text style={styles.shareText}>Share Code</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.navigate("/(tabs-user)/profile")} style={{ marginTop: 25 }}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 70, paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center" },

  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    marginTop: 20,
    elevation: 5,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },

  refBox: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    padding: 15,
    borderRadius: 12,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  refCode: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
  },

  text: {
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
    fontSize: 15,
  },

  shareBtn: {
    flexDirection: "row",
    backgroundColor: "black",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  shareText: {
    color: "white",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },

  back: { fontSize: 16, color: "blue", fontWeight: "500", textAlign: "center" },
});
