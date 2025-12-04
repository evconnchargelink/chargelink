import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

type StoredUser = {
  name: string;
  email: string;
  phone: string;
  avatarUri?: string;
};

export default function EditProfileScreen() {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUri, setAvatarUri] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("userData");

      if (storedUser) {
        const u = JSON.parse(storedUser) as StoredUser;
        setUser(u);
        setName(u.name);
        setEmail(u.email);
        setPhone(u.phone);
        if (u.avatarUri) setAvatarUri(u.avatarUri);
      } else {
        setName("Guest User");
        setEmail("guest@example.com");
        setPhone("0000000000");
      }
    };

    loadUser();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow photo access to set a profile picture.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!name || !email || !phone) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    const updatedUser: StoredUser = {
      name,
      email,
      phone,
      avatarUri,
    };

    await AsyncStorage.setItem("userData", JSON.stringify(updatedUser));

    Alert.alert("Success", "Profile updated successfully!");
    router.push("/(tabs-user)/profile");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f2f2f7]">
      <View className="flex-1 pt-[70px] px-5">
        <Text className="text-[26px] font-bold mb-3 text-center">
          Edit Profile
        </Text>

        {/* avatar picker */}
        <View className="items-center mb-4">
          <TouchableOpacity
            className="w-24 h-24 rounded-full bg-[#e5e7eb] items-center justify-center overflow-hidden"
            onPress={pickImage}
          >
            {avatarUri ? (
              <Image
                source={{ uri: avatarUri }}
                className="w-24 h-24"
                resizeMode="cover"
              />
            ) : (
              <Ionicons name="person" size={40} color="#555" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage} className="mt-2">
            <Text className="text-[13px] font-medium text-blue-600">
              Change photo
            </Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white rounded-2xl p-5 shadow-md mb-6">
          <View className="flex-row items-center bg-[#F3F4F6] px-3 py-3 rounded-xl mb-4">
            <Ionicons name="person-outline" size={22} color="#666" />
            <TextInput
              className="flex-1 ml-2.5 text-base text-black"
              placeholder="Full Name"
              placeholderTextColor="#9ca3af"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View className="flex-row items-center bg-[#F3F4F6] px-3 py-3 rounded-xl mb-4">
            <Ionicons name="mail-outline" size={22} color="#666" />
            <TextInput
              className="flex-1 ml-2.5 text-base text-black"
              placeholder="Email Address"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="flex-row items-center bg-[#F3F4F6] px-3 py-3 rounded-xl mb-1">
            <Ionicons name="call-outline" size={22} color="#666" />
            <TextInput
              className="flex-1 ml-2.5 text-base text-black"
              placeholder="Phone Number"
              placeholderTextColor="#9ca3af"
              keyboardType="number-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>

        <TouchableOpacity
          className="bg-black py-3.5 rounded-xl items-center"
          onPress={handleSave}
        >
          <Text className="text-white text-[16px] font-semibold">
            Save Changes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-5 items-center"
          onPress={() => router.push("/(tabs-user)/profile")}
        >
          <Text className="text-[16px] font-medium text-blue-600">
            ← Back
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
