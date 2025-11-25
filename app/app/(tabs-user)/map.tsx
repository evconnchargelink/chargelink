import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Platform } from "react-native";
import * as Location from "expo-location";
import MapComponent from "@/native/MapComponent"; // 👈 important
import { router } from "expo-router";

type UserLocation ={
  latitude: number;
  longitude: number;
};

export default function MapScreen() {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      // Permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Location permission required!");
        setLoading(false);
        return;
      }

      // Get current location
      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Getting your location...</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.center}>
        <Text>Unable to fetch location.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* REAL MAP */}
      <MapComponent
        latitude={location.latitude}
        longitude={location.longitude}
        zoom={15}
      />

      {/* Back Button */}
      <Text
        style={styles.back}
        onPress={() => router.navigate("/(tabs-user)/home")}
      >
        ← Back
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  back: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 5,
    fontWeight: "bold",
  },
});
