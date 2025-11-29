import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // hides the default "(auth)" header
      }}
    >
      <Stack.Screen name="splash" />
      <Stack.Screen name="intro" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="basic-details" />
    </Stack>
  );
}
