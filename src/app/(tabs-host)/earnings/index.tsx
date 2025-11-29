import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type WeeklyData = {
  day: string;
  amount: number;
};

export default function Earnings() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // 🔹 Simulate API call with 1.5s delay
    const fetchMockData = async () => {
      setLoading(true);
      setTimeout(() => {
        const mockWeekly: WeeklyData[] = [
          { day: "Mon", amount: 120 },
          { day: "Tue", amount: 150 },
          { day: "Wed", amount: 180 },
          { day: "Thu", amount: 90 },
          { day: "Fri", amount: 200 },
          { day: "Sat", amount: 170 },
        ];
        setWeeklyData(mockWeekly);
        setTotal(mockWeekly.reduce((sum, d) => sum + d.amount, 0));
        setLoading(false);
      }, 1500);
    };

    fetchMockData();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  const data = {
    labels: weeklyData.map(d => d.day),
    datasets: [{ data: weeklyData.map(d => d.amount) }],
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.6,
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/(tabs-host)/home-login")}>
        <Ionicons name="arrow-back-circle-outline" size={36} />
      </TouchableOpacity>

      <Text style={styles.title}>Weekly Earnings 💵</Text>
      <Text style={styles.subtitle}>Total: ₹{total}</Text>

      <BarChart
        data={data}
        width={Dimensions.get("window").width - 30}
        height={250}
        yAxisLabel="₹"
        chartConfig={chartConfig}
        style={{ borderRadius: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 20, color: "green" },
});
