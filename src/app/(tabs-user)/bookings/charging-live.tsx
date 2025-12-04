import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function ChargingLiveScreen() {
  const router = useRouter();

  // Dummy live charging data (replace with real-time values or hooks)
  const station = "GreenCharge Hub";
  const elapsed = "16 min";
  const energySoFar = "7.9 kWh";
  const estimatedAmount = "₹162";
  const percentComplete = 39; // Example: 39% complete

  return (
    <SafeAreaView className="flex-1 bg-[#f6f7fb]">
      <View className="flex-1 items-center justify-center px-6">
        {/* Charging icon and title */}
        <View className="w-[54px] h-[54px] rounded-full bg-[#fff7ea] items-center justify-center mb-3.5">
          <Text className="text-[28px] text-[#de9400]">⚡️</Text>
        </View>
        <Text className="text-[23px] font-bold text-[#de9400] mb-1">
          Charging Live
        </Text>
        <Text className="text-[15px] text-[#555] mb-5 text-center leading-6">
          Your session is now active at {station}
        </Text>

        {/* Live session stats */}
        <View className="w-11/12 bg-white rounded-2xl py-3 px-4 mb-6 shadow-md">
          <Text className="text-[11px] font-semibold text-gray-400">
            Live session
          </Text>

          <Text className="text-[13px] text-[#888] mt-2.5">Time Elapsed</Text>
          <Text className="text-[16px] font-bold text-[#222] mt-0.5">
            {elapsed}
          </Text>

          <Text className="text-[13px] text-[#888] mt-3">Energy Used</Text>
          <Text className="text-[16px] font-bold text-[#222] mt-0.5">
            {energySoFar}
          </Text>

          <Text className="text-[13px] text-[#888] mt-3">
            Estimated Amount
          </Text>
          <Text className="text-[16px] font-bold text-[#222] mt-0.5">
            {estimatedAmount}
          </Text>
        </View>

        {/* Progress bar */}
        <View className="w-11/12 h-3.5 bg-[#d6e2f0] rounded-full overflow-hidden mt-1 mb-2">
          <View
            className="h-full bg-[#de9400] rounded-full"
            style={{ width: `${percentComplete}%` }}
          />
        </View>
        <Text className="text-[15px] text-[#555] mb-7 text-center">
          {percentComplete}% complete
        </Text>

        {/* Actions */}
        <View className="w-full items-center">
          <TouchableOpacity
            className="w-full bg-[#de9400] py-3.5 rounded-xl mb-3.5 items-center"
            onPress={() => router.push("/(tabs-user)/bookings/charging-complete")}
          >
            <Text className="text-[16px] text-white font-bold tracking-[0.4px]">
              End Session
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
