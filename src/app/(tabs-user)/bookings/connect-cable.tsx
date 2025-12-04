import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function ConnectCableScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#f6f7fb]">
      <View className="flex-1 items-center justify-center px-6">
        {/* Visual cue */}
        <View className="w-14 h-14 rounded-full bg-[#e5eaff] items-center justify-center mb-4">
          <Text className="text-[32px] text-[#2660a7]">🔌</Text>
        </View>

        <Text className="text-[22px] font-bold text-[#2660a7] mb-2">
          Connect the Cable
        </Text>
        <Text className="text-[15px] text-[#555] text-center leading-6 mb-4">
          Please connect your EV charging cable securely to the station and your
          vehicle.
        </Text>

        {/* Steps or tips */}
        <View className="w-[93%] bg-white rounded-xl py-4 px-4 mb-7 shadow-md">
          <Text className="text-[11px] font-semibold text-gray-400 mb-2">
            Steps
          </Text>
          <Text className="text-[15px] text-[#222] mb-1.5">
            1. Locate the charging port on your vehicle
          </Text>
          <Text className="text-[15px] text-[#222] mb-1.5">
            2. Plug the cable into your car and then the station
          </Text>
          <Text className="text-[15px] text-[#222] mb-1.5">
            3. Make sure all connections are firm
          </Text>
          <Text className="mt-2 text-[14px] text-[#2660a7] italic">
            Tip: If you have trouble, check for indicator lights and refer to
            station help.
          </Text>
        </View>

        {/* Actions */}
        <View className="w-full items-center">
          <TouchableOpacity
            className="w-full bg-[#2660a7] py-4 rounded-xl mb-3.5 items-center"
            onPress={() => router.push("/(tabs-user)/bookings/charging-live")}
          >
            <Text className="text-[16px] text-white font-bold tracking-[0.4px]">
              Cable Connected
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center"
            onPress={() => router.push("/(tabs-user)/home")}
          >
            <Text className="text-[15px] text-[#222] underline mt-1">
              Return Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
