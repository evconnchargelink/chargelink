import React, { useState, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function AddCharger() {
  const router = useRouter();
  const [chargerName, setChargerName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);

  // 👇 SCREEN OPEN HOTE HI AUTO RESET
  useFocusEffect(
    useCallback(() => {
      setImage(null);     // RESET IMAGE
      setChargerName(""); // OPTIONALLY RESET
      setLocation("");
      setPrice("");

      return () => {}; // cleanup
    }, [])
  );

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    router.push({
      pathname: "/(tabs-host)/manage-charger",
      params: { id: Date.now().toString() + Math.random().toString(), 
        location, 
        name: chargerName, 
        price, 
        image 
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Charger ⚡</Text>

      <TextInput style={styles.input} placeholder="Charger Name" onChangeText={setChargerName} value={chargerName} />
      <TextInput style={styles.input} placeholder="Location" onChangeText={setLocation} value={location} />
      <TextInput style={styles.input} placeholder="Price per kWh (₹)" keyboardType="numeric" onChangeText={setPrice} value={price} />

      <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
        <Text style={styles.uploadText}>Upload Photo 📸</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.previewImage} />}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save Charger</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12, marginBottom: 15 },
  uploadBtn: { backgroundColor: "blue", paddingVertical: 12, borderRadius: 10, alignItems: "center", marginBottom: 10 },
  uploadText: { color: "white", fontWeight: "bold" },
  previewImage: { width: "100%", height: 150, marginTop: 10, borderRadius: 10 },
  button: { backgroundColor: "black", paddingVertical: 14, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
