import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";

const MapComponent = () => {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  if (!location)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: location?.latitude || 0,
        longitude: location?.longitude || 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
    </MapView>
  );
};

export default MapComponent;
