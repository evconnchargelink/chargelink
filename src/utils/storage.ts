// utils/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

// Save data
export async function setItem(key: string, value: any) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log("Error storing data:", error);
  }
}

// Get data
export async function getItem(key: string) {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log("Error fetching data:", error);
    return null;
  }
}

// Remove data
export async function removeItem(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Error removing data:", error);
  }
}
