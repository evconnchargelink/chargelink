import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function BookingDetailsScreen() {
  const router = useRouter();

  // Dummy booking details – replace with props or hooks
  const booking = {
    station: "EV Plaza - Sector 17",
    date: "2025-10-14",
    timeSlot: "14:00 – 15:00",
    amount: "₹200",
    status: "Completed",
    vehicle: "Tata Nexon EV",
    bookingId: "ABCD-1234",
  };

  const statusIcon =
    booking.status === "Completed"
      ? "✅"
      : booking.status === "Cancelled"
      ? "❌"
      : "📅";

  return (
    <SafeAreaView className="flex-1 bg-[#f6f7fb]">
      <View className="flex-1 px-6 items-center justify-center">
        {/* Title & status icon */}
        <View className="w-[52px] h-[52px] rounded-full bg-[#e5ffe2] items-center justify-center mb-4">
          <Text className="text-[28px] text-[#188832]">{statusIcon}</Text>
        </View>
        <Text className="text-[22px] font-bold text-[#188832] mb-1 text-center">
          Booking Details
        </Text>
        <Text className="text-[13px] text-[#777] mb-4">
          Booking ID: {booking.bookingId}
        </Text>

        {/* Booking info card */}
        <View className="w-[94%] bg-white rounded-xl py-4 px-4 mb-9 shadow-md">
          <Text className="text-[11px] font-semibold text-gray-400 mb-1">
            Summary
          </Text>

          <Text className="text-[14px] text-[#999] mt-2">EV Station</Text>
          <Text className="text-[16px] font-bold text-[#222] mt-0.5">
            {booking.station}
          </Text>

          <Text className="text-[14px] text-[#999] mt-3">Date &amp; Slot</Text>
          <Text className="text-[16px] font-bold text-[#222] mt-0.5">
            {booking.date}, {booking.timeSlot}
          </Text>

          <Text className="text-[14px] text-[#999] mt-3">Vehicle</Text>
          <Text className="text-[16px] font-bold text-[#222] mt-0.5">
            {booking.vehicle}
          </Text>

          <Text className="text-[14px] text-[#999] mt-3">Amount</Text>
          <Text className="text-[16px] font-bold text-[#222] mt-0.5">
            {booking.amount}
          </Text>

          <Text className="text-[14px] text-[#999] mt-3">Status</Text>
          <Text className="text-[16px] font-bold text-[#222] mt-0.5">
            {booking.status}
          </Text>
        </View>

        {/* Actions */}
        <View className="w-full items-center">
          <TouchableOpacity
            className="w-full bg-[#188832] py-3.5 rounded-xl mb-4 items-center"
            onPress={() => router.push("/(tabs-user)/search/invoice")}
          >
            <Text className="text-[16px] text-white font-bold tracking-[0.4px]">
              View Invoice
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center"
            onPress={() => router.push("/(tabs-user)/home")}
          >
            <Text className="text-[15px] text-[#222] underline">
              Return Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
