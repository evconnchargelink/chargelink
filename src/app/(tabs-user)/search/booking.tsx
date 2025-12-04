import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function BookingScreen() {
  const { stationId, name } = useLocalSearchParams<{
    stationId?: string;
    name?: string;
  }>();

  const [selectedSlot, setSelectedSlot] = useState("");

  const slots = ["08:00 AM", "10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM"];

  const handleBooking = () => {
    if (!selectedSlot) {
      alert("Please select a time slot!");
      return;
    }

    router.navigate({
      pathname: "/(tabs-user)/wallet/payment-method",
      params: {
        stationId,
        name,
        slot: selectedSlot,
      },
    });
  };

  return (
    <View className="flex-1 bg-[#f3f4f6] px-5 pt-[60px]">
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity
          onPress={() => router.navigate("/(tabs-user)/search/charger")}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-[22px] font-bold ml-3">Confirm Booking</Text>
      </View>

      {/* Station Details */}
      <View className="bg-white rounded-xl p-5 shadow-md mb-6">
        <Text className="text-[16px] font-semibold">Station Name:</Text>
        <Text className="text-[16px] text-[#444] mb-2">{name}</Text>

        <Text className="text-[16px] font-semibold">Station ID:</Text>
        <Text className="text-[16px] text-[#444]">{stationId}</Text>
      </View>

      {/* Time Slots */}
      <Text className="text-[20px] font-semibold mb-2">
        Select Charging Slot
      </Text>
      <View className="flex-row flex-wrap -m-1 mb-6">
        {slots.map((slot) => {
          const isSelected = selectedSlot === slot;
          return (
            <TouchableOpacity
              key={slot}
              className={`px-4 py-2 rounded-xl m-1 ${
                isSelected ? "bg-[#111827]" : "bg-[#E5E7EB]"
              }`}
              onPress={() => setSelectedSlot(slot)}
            >
              <Text
                className={`text-[15px] ${
                  isSelected ? "text-white font-semibold" : "text-[#333]"
                }`}
              >
                {slot}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Proceed to Payment */}
      <TouchableOpacity
        className="bg-black py-3.5 rounded-xl items-center mt-auto mb-4"
        onPress={handleBooking}
      >
        <Text className="text-white text-[18px] font-semibold">
          Proceed to Payment
        </Text>
      </TouchableOpacity>
    </View>
  );
}
