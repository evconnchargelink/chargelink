import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function ScanQRScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#f6f7fb]">
      <View className="flex-1 items-center justify-center px-6">
        {/* QR Code Icon */}
        <View className="w-14 h-14 rounded-full bg-[#e6f3ff] items-center justify-center mb-4">
          <Text className="text-[32px] text-[#277ddb]">📷</Text>
        </View>

        <Text className="text-[22px] font-bold text-[#277ddb] mb-1 text-center">
          Scan Charging Station QR
        </Text>
        <Text className="text-[15px] text-[#555] text-center leading-6 mb-6">
          To start your charging session, please scan the QR code at your
          selected station using your phone&apos;s camera.
        </Text>

        {/* Placeholder QR box */}
        <View className="w-52 h-52 bg-[#e6f3ff] rounded-2xl items-center justify-center mb-9 border-2 border-[#277ddb]">
          <Text className="text-[17px] font-bold text-[#277ddb] mb-1">
            QR Camera View
          </Text>
          <Text className="text-[11px] text-[#277ddb]">
            (Camera preview here)
          </Text>
        </View>

        {/* Actions */}
        <View className="w-full items-center">
          <TouchableOpacity
            className="w-full bg-[#277ddb] py-4 rounded-xl mb-3.5 items-center"
            onPress={() => router.push("/(tabs-user)/bookings/connect-cable")}
          >
            <Text className="text-[16px] text-white font-bold tracking-[0.4px]">
              Simulate Scan
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
