import { View, Text, StyleSheet } from "react-native";

export default function MapFallback() {
  return (
    <View style={styles.center}>
      <Text>Map works only on mobile device</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
