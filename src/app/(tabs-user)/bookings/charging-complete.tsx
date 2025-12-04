import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function ChargingCompleteScreen() {
  const router = useRouter();

  // Dummy session data – replace with real props/state/hooks
  const station = "GreenCharge Hub";
  const sessionTime = "42 min";
  const energy = "19.8 kWh";
  const amount = "₹384";

  return (
    <SafeAreaView className="flex-1 bg-[#f6f7fb]">
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-16 h-16 rounded-full bg-[#e5ffe2] items-center justify-center mb-4">
          <Text className="text-[36px] text-[#21a438]">✅</Text>
        </View>

        <Text className="text-2xl font-bold text-[#188832] mb-1">
          Charging Complete!
        </Text>
        <Text className="text-base text-[#555] mb-5 text-center leading-6">
          You have successfully finished charging your EV.
        </Text>

        {/* Session Summary */}
        <View className="w-11/12 bg-white rounded-2xl py-4 px-5 mb-7 shadow-md">
          <Text className="text-xs font-semibold text-gray-400 mb-1">
            Session summary
          </Text>

          <Text className="text-sm text-[#888] mt-2">Station</Text>
          <Text className="text-base font-bold text-[#222] mt-0.5">
            {station}
          </Text>

          <Text className="text-sm text-[#888] mt-3">Session Time</Text>
          <Text className="text-base font-bold text-[#222] mt-0.5">
            {sessionTime}
          </Text>

          <Text className="text-sm text-[#888] mt-3">Energy Used</Text>
          <Text className="text-base font-bold text-[#222] mt-0.5">
            {energy}
          </Text>

          <Text className="text-sm text-[#888] mt-3">Amount Paid</Text>
          <Text className="text-base font-bold text-[#222] mt-0.5">
            {amount}
          </Text>
        </View>

        {/* Actions */}
        <View className="w-full items-center">
          <TouchableOpacity
            className="w-full bg-[#188832] py-3.5 rounded-xl mb-3 items-center"
            onPress={() => router.push("/(tabs-user)/search/invoice")}
          >
            <Text className="text-base font-bold text-white tracking-[0.4px]">
              View Invoice
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full border-2 border-[#188832] py-3.5 rounded-xl mb-5 items-center"
            onPress={() => router.push("/(tabs-user)/search/rating")}
          >
            <Text className="text-base font-bold text-[#188832] tracking-[0.4px]">
              Rate Experience
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-1 items-center"
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
