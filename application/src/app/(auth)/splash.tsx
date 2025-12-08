import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";

export default function SplashScreen() {
  const router = useRouter();

  // Logo animation values
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;

  // Plug icon animation
  const plugOpacity = useRef(new Animated.Value(0)).current;
  const plugTranslateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Step 1: Animate the main logo
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Step 2: Plug animation
      Animated.parallel([
        Animated.timing(plugOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(plugTranslateY, {
          toValue: 0,
          friction: 2,
          useNativeDriver: true,
        }),
      ]).start();
    });

    // Step 3: Navigate to intro.tsx after 3 seconds
    const timeout = setTimeout(() => {
      router.replace("/(auth)/intro");  // 👈 NEW REDIRECT
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Animated.Image
        source={require("../../assets/images/logo.png")} // 🔁 same logo
        style={[
          styles.logo,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
        resizeMode="contain"
      />

      {/* Plug Icon */}
      <Animated.View
        style={{
          opacity: plugOpacity,
          transform: [{ translateY: plugTranslateY }],
          position: "absolute",
          top: "65%",
        }}
      >
        <FontAwesome6 name="plug-circle-bolt" size={60} color="black" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: { width: 200, height: 200 },
});