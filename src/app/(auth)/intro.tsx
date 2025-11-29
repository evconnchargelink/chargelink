import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Find Nearest EV Chargers",
    description: "Locate and book charging stations in seconds.",
    image: require("../../assets/images/ev-image.jpg"),
  },
  {
    id: "2",
    title: "Easy & Secure Payment",
    description: "Pay smoothly using multiple payment options.",
    image: require("../../assets/images/ev-image.jpg"),
  },
  {
    id: "3",
    title: "Grow as a Host",
    description: "Add your charger & start earning with EV users.",
    image: require("../../assets/images/ev-image.jpg"),
  },
];

export default function Intro() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace("/(auth)/login");
    }
  };

  const handleSkip = () => {
    router.replace("/(auth)/login");
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <FlatList
          data={slides}
          ref={flatListRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{ width }}
              className="items-center px-5 pt-6"
            >
              <Image
                source={item.image}
                resizeMode="contain"
                className="w-4/5 h-64 mt-8"
              />
              <Text className="mt-8 text-2xl font-bold text-center text-black">
                {item.title}
              </Text>
              <Text className="mt-3 text-base text-center text-gray-600">
                {item.description}
              </Text>
            </View>
          )}
        />

        {/* Dots - slightly above bottom */}
        <View className="flex-row justify-center mb-6">
          {slides.map((_, i) => (
            <View
              key={i}
              className={`mx-1 rounded-full ${
                currentIndex === i
                  ? "w-2.5 h-2.5 bg-black"
                  : "w-2 h-2 bg-gray-300"
              }`}
            />
          ))}
        </View>

        {/* Buttons - just above safe-area bottom */}
        <View className="pb-4 px-8 flex-row justify-between">
          {currentIndex < slides.length - 1 ? (
            <>
              <TouchableOpacity onPress={handleSkip}>
                <Text className="text-base text-gray-400">Skip</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleNext}
                className="bg-black px-6 py-2.5 rounded-xl"
              >
                <Text className="text-base text-white">Next →</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={handleNext}
              className="bg-black py-3.5 rounded-xl w-7/12 self-center"
            >
              <Text className="text-base font-semibold text-center text-white">
                Get Started ⚡
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}