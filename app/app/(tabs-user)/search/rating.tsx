import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function RatingScreen() {
  const { stationId, name } = useLocalSearchParams();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a star rating!");
      return;
    }

    alert("Thank you! Rating submitted ⭐");
    router.push("/(tabs-user)/home");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rate Your Experience</Text>
      </View>

      {/* Station Name */}
      <Text style={styles.stationName}>{name}</Text>

      <Text style={styles.subtitle}>How was your charging experience?</Text>

      {/* Stars */}
      <View style={styles.starRow}>
        {[1, 2, 3, 4, 5].map((i) => (
          <TouchableOpacity key={i} onPress={() => setRating(i)}>
            <Ionicons
              name={i <= rating ? "star" : "star-outline"}
              size={40}
              color={i <= rating ? "#FBBF24" : "#999"}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Review Box */}
      <TextInput
        style={styles.input}
        placeholder="Write your feedback (optional)"
        multiline
        value={review}
        onChangeText={setReview}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Submit Rating</Text>
      </TouchableOpacity>

      {/* Back Home */}
      <TouchableOpacity onPress={() => router.push("/(tabs-user)/home")}>
        <Text style={styles.backHome}>← Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
    backgroundColor: "#f3f4f6",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
  },

  stationName: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
    fontSize: 16,
  },

  starRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 10,
  },

  input: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    minHeight: 120,
    textAlignVertical: "top",
    elevation: 2,
    marginBottom: 20,
  },

  btn: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  btnText: { color: "white", fontSize: 18, fontWeight: "600" },

  backHome: {
    textAlign: "center",
    color: "blue",
    fontSize: 16,
    fontWeight: "500",
  },
});
