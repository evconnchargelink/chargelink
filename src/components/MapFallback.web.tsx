import { View, Text, StyleSheet } from "react-native";

export default function MapFallback() {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>🌐 Map not supported on Web</Text>
      <Text style={styles.text}>📱 Use Expo Go on mobile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: {color:'white'},
});
