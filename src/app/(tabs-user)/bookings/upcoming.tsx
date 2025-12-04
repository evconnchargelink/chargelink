import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// Dummy data for upcoming bookings
const upcomingData = [
  {
    id: "1",
    station: "FastCharge Point",
    date: "2025-12-02",
    time: "11:00 – 12:00",
    vehicle: "Tata Nexon EV",
  },
  {
    id: "2",
    station: "EV Plaza - Sector 17",
    date: "2025-12-08",
    time: "15:00 – 16:00",
    vehicle: "MG ZS EV",
  },
];

export default function UpcomingBookings() {
  const router = useRouter();

  const handleOpenDetails = (item: (typeof upcomingData)[number]) => {
    router.push({
      pathname: "/(tabs-user)/bookings/details",
      params: {
        source: "upcoming",
        id: item.id,
        station: item.station,
        date: item.date,
        time: item.time,
        vehicle: item.vehicle,
        status: "Upcoming",
        amount: "", // fill when you have pricing
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f6f7fb]">
      <View className="flex-1 items-center px-6 py-6">
        <Text className="text-[26px] font-bold mt-2 mb-1 text-[#222] text-center">
          Upcoming Bookings 🚗
        </Text>
        <Text className="text-[15px] text-[#777] mb-6 text-center">
          {upcomingData.length > 0
            ? "Here are your scheduled charging sessions"
            : "No bookings yet"}
        </Text>

        {upcomingData.length > 0 && (
          <View className="w-full bg-white rounded-2xl py-4 px-2 shadow-md">
            <FlatList
              data={upcomingData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="flex-row items-center py-3 border-b border-[#f2f2f7]"
                  onPress={() => handleOpenDetails(item)}
                >
                  <View className="w-9 h-9 rounded-full bg-[#eaf7ff] mr-3 items-center justify-center">
                    <Text className="text-[20px] text-[#2686d9]">📅</Text>
                  </View>

                  <View className="flex-1">
                    <Text className="text-[16px] font-bold text-[#222]">
                      {item.station}
                    </Text>
                    <Text className="text-[14px] text-[#555] mt-0.5">
                      {item.date}, {item.time}
                    </Text>
                    <Text className="text-[13px] text-[#2686d9] mt-0.5">
                      {item.vehicle}
                    </Text>
                  </View>

                  <View className="ml-2 px-2 py-1 rounded-full bg-[#eaf7ff]">
                    <Text className="text-[11px] font-semibold text-[#2686d9]">
                      Scheduled
                    </Text>
                  </View>
                </TouchableOpacity>
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
