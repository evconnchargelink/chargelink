import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function UploadPictures() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
    });
    if (!res.canceled) setImage(res.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Charger Pictures 📸</Text>

      {image && <Image source={{ uri: image }} style={styles.preview} />}

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick Image</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  preview: { width: 250, height: 250, borderRadius: 12, marginBottom: 20 },
  button: {
    backgroundColor: "black", paddingVertical: 14,
    paddingHorizontal: 30, borderRadius: 10,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
