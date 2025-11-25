import React, { useRef, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const slides = [
    {
        id: "1",
        title: "Find Nearest EV Chargers",
        description: "Locate and book charging stations in seconds.",
        image: require("@/assets/images/logo.png"),
    },
    {
        id: "2",
        title: "Easy & Secure Payment",
        description: "Pay smoothly using multiple payment options.",
        image: require("@/assets/images/ev-image.jpg"),
    },
    {
        id: "3",
        title: "Grow as a Host",
        description: "Add your charger & start earning with EV users.",
        image: require("@/assets/images/logo.png"),
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
            router.replace("/(auth)/login"); // After last slide → login page
        }
    };

    const handleSkip = () => {
        router.replace("/(auth)/login");
    };

    const onScroll = (e: any) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={slides}
                ref={flatListRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                renderItem={({ item }) => (
                    <View style={styles.slide}>
                        <Image source={item.image} style={styles.image} resizeMode="contain" />
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                    </View>
                )}
            />

            {/* DOT INDICATORS */}
            <View style={styles.dotsContainer}>
                {slides.map((_, i) => (
                    <View key={i} style={[styles.dot, currentIndex === i && styles.activeDot]} />
                ))}
            </View>

            {/* BUTTONS */}
            <View style={styles.buttonContainer}>
                {currentIndex < slides.length - 1 ? (
                    <>
                        <TouchableOpacity onPress={handleSkip}>
                            <Text style={styles.skip}>Skip</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
                            <Text style={styles.nextText}>Next →</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity style={styles.startBtn} onPress={handleNext}>
                        <Text style={styles.startText}>Get Started ⚡</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white" },
    slide: { width, alignItems: "center", padding: 20 },
    image: { width: "80%", height: 250, marginTop: 40 },
    title: { fontSize: 24, fontWeight: "bold", marginTop: 30, textAlign: "center" },
    description: { fontSize: 16, color: "#666", marginTop: 10, textAlign: "center" },
    dotsContainer: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
    dot: {
        width: 8, height: 8, borderRadius: 4, backgroundColor: "#ccc", marginHorizontal: 5,
    },
    activeDot: { backgroundColor: "black", width: 10, height: 10 },
    buttonContainer: {
        position: "absolute", bottom: 40, width: "100%", flexDirection: "row",
        justifyContent: "space-between", paddingHorizontal: 30,
    },
    skip: { fontSize: 16, color: "#999" },
    nextBtn: { backgroundColor: "black", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10 },
    nextText: { color: "white", fontSize: 16 },
    startBtn: { backgroundColor: "black", paddingVertical: 14, borderRadius: 12, width: "70%", alignSelf: "center" },
    startText: { color: "white", textAlign: "center", fontSize: 16, fontWeight: "bold" },
});
