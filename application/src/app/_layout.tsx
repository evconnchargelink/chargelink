import "../global.css";
import { Slot } from "expo-router";
import { StatusBar as RNStatusBar, Platform } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function Layout() {

  useFocusEffect(
    React.useCallback(() => {
      RNStatusBar.setBarStyle("dark-content");
      RNStatusBar.setBackgroundColor("white");
      RNStatusBar.setTranslucent(true);
    }, [])
  );

  return (
    <SafeAreaView className="flex-1">
      <Provider store={store}>
        <Slot />
      </Provider>
    </SafeAreaView>
  );
}
