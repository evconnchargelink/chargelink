import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

export default function PaymentMethod() {
    const [selected, setSelected] = useState<string | null>(null);

    const methods = [
        { id: "upi", name: "UPI", icon: "logo-google" },
        { id: "card", name: "Debit/Credit Card", icon: "card-outline" },
        { id: "wallet", name: "ChargeLink Wallet", icon: "wallet-outline" },
    ];

    const handleContinue = () => {
        if (!selected) {
            alert("Please select a payment method!");
            return;
        }

        // 🔥 Separate navigation based on selected method
        if (selected === "upi") {
            router.navigate("/(tabs-user)/wallet/payment-screen/upi");
            return;
        }

        if (selected === "card") {
            router.navigate("/(tabs-user)/wallet/payment-screen/card");
            return;
        }

        if (selected === "wallet") {
            router.navigate("/(tabs-user)/wallet/payment-screen/chargelinkwallet");
            return;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select payment method</Text>

            {methods.map((m) => (
                <TouchableOpacity
                    key={m.id}
                    style={[styles.card, selected === m.id && styles.selected]}
                    onPress={() => setSelected(m.id)}
                >
                    <Ionicons name={m.icon} size={26} color="black" />
                    <Text style={styles.cardText}>{m.name}</Text>

                    {selected === m.id && (
                        <Ionicons name="checkmark-circle" size={24} color="green" />
                    )}
                </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.btn} onPress={handleContinue}>
                <Text style={styles.btnText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.navigate("/(tabs-user)/wallet")}>
                <Text style={styles.back}>← Back</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 60 },
    title: { fontSize: 26, fontWeight: "bold", marginBottom: 25 },

    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        justifyContent: "space-between",
    },

    selected: {
        borderColor: "green",
        borderWidth: 2,
    },

    cardText: { fontSize: 16, fontWeight: "600", marginLeft: 10, flex: 1 },

    btn: {
        backgroundColor: "black",
        padding: 15,
        borderRadius: 10,
        marginTop: 30,
        alignItems: "center",
    },

    btnText: { color: "white", fontSize: 18, fontWeight: "bold" },
    back: { marginTop: 15, color: "blue", fontSize: 16 },
});
