import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function TestRole() {
  const router = useRouter();

  const setRole = async (role: "driver" | "host") => {
    await AsyncStorage.setItem("role", role);
    if (role==="driver"){
      router.replace("/(tabs-user)/home");
    }
    else if(role==="host"){
      router.replace("/(tabs-host)/home-login");
    }
    else{
      alert("Invalid role!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Role for Testing 🚀</Text>

      <TouchableOpacity onPress={() => setRole("driver")} style={styles.btn}>
        <Text style={styles.btnText}>Set ROLE = DRIVER</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setRole("host")} style={styles.btn}>
        <Text style={styles.btnText}>Set ROLE = HOST</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 30 },
  btn: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  btnText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
