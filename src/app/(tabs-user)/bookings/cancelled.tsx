import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// Dummy data for cancelled bookings
const cancelledData = [
  {
    id: "1",
    station: "EV Plaza - Sector 17",
    date: "2025-10-14",
    reason: "User cancelled",
  },
  {
    id: "2",
    station: "GreenCharge Hub",
    date: "2025-09-30",
    reason: "No slot available",
  },
];

export default function CancelledBookings() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center px-6 py-6">
        <Text className="text-[26px] font-bold mt-2 mb-1 text-[#222] text-center">
          Cancelled Bookings ❌
        </Text>
        <Text className="text-[15px] text-[#777] mb-6 text-center">
          {cancelledData.length > 0
            ? "Here are your recently cancelled bookings"
            : "Nothing cancelled yet"}
        </Text>

        {cancelledData.length > 0 && (
          <View className="w-full bg-white rounded-2xl py-4 px-2 shadow-md">
            <FlatList
              data={cancelledData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View className="flex-row items-center py-3 border-b border-[#f2f2f7]">
                  <View className="w-9 h-9 rounded-full bg-[#ffeaea] mr-3 items-center justify-center">
                    <Text className="text-[20px] text-[#e03232]">❌</Text>
                  </View>

                  <View className="flex-1">
                    <Text className="text-[16px] font-bold text-[#222]">
                      {item.station}
                    </Text>
                    <Text className="text-[14px] text-[#555] mt-0.5">
                      {item.date}
                    </Text>
                    <Text className="text-[13px] text-[#b38181] mt-0.5">
                      {item.reason}
                    </Text>
                  </View>

                  {/* minimal status pill */}
                  <View className="ml-2 px-2 py-1 rounded-full bg-[#ffeaea]">
                    <Text className="text-[11px] font-bold text-[#e03232]">
                      Cancelled
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        )}

        <TouchableOpacity
          className="mt-8 bg-[#4A4A4A] py-3 px-10 rounded-xl items-center"
          onPress={() => router.push("/(tabs-user)/bookings")}
        >
          <Text className="text-white text-[15px] font-bold tracking-[0.4px]">
            Back to Bookings
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}