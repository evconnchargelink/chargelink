import CustomText from "@/components/ui/CustomText";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import ProgressBar from "@/components/ui/ProgressBar";
import Svg, { Ellipse } from "react-native-svg";
import MapComponent from "@/components/ui/MapComponent";

export const ProgressCard = () => {
  return (
    <View className="w-full overflow-hidden">
      <View className="w-full bg-[#495ECA] rounded-2xl px-5 py-7">
        <View className="gap-y-3">
          <CustomText className="text-2xl text-white" weight="bold">
            Continue your Progess!
          </CustomText>
          <CustomText className="text-lg text-white">
            Module 1 - Soft skills
          </CustomText>
          <View className="my-2">
            <ProgressBar percentage={50} />
          </View>
        </View>
      </View>
    </View>
  );
};

const statsInfo = [
  {
    title: "Total Bookings",
    value: "4",
    iconBG: "#F3F4F6",
    iconColor: "#1900A9",
  },
  {
    title: "Total Charged",
    value: "100 kWh",
    iconBG: "#D1FAE5",
    iconColor: "#10B981",
  },
  {
    title: "Paid",
    value: "100",
    iconBG: "#FEE2E2",
    iconColor: "#EF4444",
    percentageIncrease: "",
  },
  {
    title: "Stations Visited",
    value: "120",
    iconBG: "#F3F4F6",
    iconColor: "#6B7280",
  },
];

export const BookMentorSection = () => {
  return (
    <View className="px-6">
      <View className="flex-row items-center gap-x-3">
        <CustomText className="text-2xl" weight="bold">
          Book a Mentor
        </CustomText>
        <CustomText className="text-xl">(Platinum users only)</CustomText>
      </View>

      <View className="w-full overflow-hidden my-6 relative ">
        <View className="absolute top-0 left-0 z-20">
          <Svg width="171" height="135" viewBox="0 0 171 93" fill="none">
            <Ellipse
              cx="59.6406"
              cy="17.0815"
              rx="119.212"
              ry="82.1489"
              transform="rotate(-30.8093 59.6406 17.0815)"
              fill="#00AE8F"
            />
          </Svg>
        </View>

        <View className="w-full rounded-2xl bg-[#7B9B75] flex-row items-center gap-x-5 px-3 py-5">
          <View className="z-30">
            <Image
              source={require("@/assets/images/book-a-mentor-img.png")}
              className="w-[100px] h-[100px]"
              resizeMode="contain"
            />
          </View>

          <View className="gap-y-3 z-30">
            <CustomText className="text-3xl text-white" weight="bold">
              Have any querries?
            </CustomText>
            <CustomText className="text-xl text-white">
              Module 5 - Platinum Module
            </CustomText>

            <View className="overflow-hidden">
              <View className="rounded-lg bg-[#F36454] w-[180px] items-center py-1">
                <CustomText className="text-xl text-white">
                  Book 1 on 1 sesson
                </CustomText>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const Home = () => {
  return (
    <View className="flex-1 bg-[#F4F4F4]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View className="gap-y-2  px-6">
            <CustomText className="text-3xl" weight="bold">
              Welcome Back
            </CustomText>
          </View>

          <View className="my-8  px-6">
            <View>
              <Image
                source={require("../../assets/images/banner.webp")}
                className="w-full h-48 rounded-2xl"
                resizeMode="cover"
              />
            </View>
          </View>
        </View>

        {/* stats */}
        <View className="gap-y-4 flex items-center justify-center">
          <View className="gap-x-4 flex-row items-center">
            <View
              className="gap-x-2 bg-white rounded-xl py-2 px-4 flex justify-between shadow-[0px_1px_3px_0px_#0000001A] "
              style={{ width: width * 0.45 }}
            >
              <View className="flex flex-col gap-y-2">
                <Text className="text-xl text-[#6B7280]">Total Bookings</Text>

                <View className="flex items-start space-x-2">
                  <Text className="text-lg text-[#1E1E1E] font-bold">4</Text>
                </View>
              </View>
            </View>

            <View
              className="gap-x-2 bg-white rounded-xl py-2 px-4 flex justify-between shadow-[0px_1px_3px_0px_#0000001A] "
              style={{ width: width * 0.45 }}
            >
              <View className="flex flex-col gap-y-2">
                <Text className="text-xl text-[#6B7280]">Total Charged</Text>

                <View className="flex items-start space-x-2">
                  <Text className="text-lg text-[#1E1E1E] font-bold">
                    100kwh
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="gap-x-4 flex-row items-center">
            <View
              className="gap-x-2 bg-white rounded-xl py-2 px-4 flex justify-between shadow-[0px_1px_3px_0px_#0000001A] "
              style={{ width: width * 0.45 }}
            >
              <View className="flex flex-col gap-y-2">
                <Text className="text-xl text-[#6B7280]">Total Bookings</Text>

                <View className="flex items-start space-x-2">
                  <Text className="text-lg text-[#1E1E1E] font-bold">4</Text>
                </View>
              </View>
            </View>

            <View
              className="gap-x-2 bg-white rounded-xl py-2 px-4 flex justify-between shadow-[0px_1px_3px_0px_#0000001A] "
              style={{ width: width * 0.45 }}
            >
              <View className="flex flex-col gap-y-2">
                <Text className="text-xl text-[#6B7280]">Total Charged</Text>

                <View className="flex items-start space-x-2">
                  <Text className="text-lg text-[#1E1E1E] font-bold">
                    100kwh
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="flex-1">
          <MapComponent />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
