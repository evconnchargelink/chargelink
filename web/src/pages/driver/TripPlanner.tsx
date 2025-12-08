import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaBolt, FaRoute } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
import { cars } from "../../sample/car.data";
import PlannerService from "../../services/driver/planner.service";

const plannerService = new PlannerService();

/* -------------------------------------------------------------------------- */
/*                               Type Definitions                             */
/* -------------------------------------------------------------------------- */
interface Coordinate {
  lat: number;
  lng: number;
  name: string;
  description: string;
  waitingTime?: number;
}
interface RouteData {
  coordinates: Coordinate[];
}
interface FormData {
  startPoint: string;
  destination: string;
  evCarName: string;
  batteryCapacity: string;
}
interface MapCenter {
  lat: number;
  lng: number;
}

/* -------------------------------------------------------------------------- */
/*                           Route Polyline Component                         */
/* -------------------------------------------------------------------------- */

const RoutePolyline: React.FC<{ coordinates: Coordinate[] }> = ({
  coordinates,
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map || coordinates.length < 2) return;

    const polyline = new google.maps.Polyline({
      path: coordinates.map((c) => ({ lat: c.lat, lng: c.lng })),
      geodesic: true,
      strokeColor: "#003c9d",
      strokeOpacity: 0.8,
      strokeWeight: 3,
    });

    polyline.setMap(map);
    return () => polyline.setMap(null);
  }, [map, coordinates]);

  return null;
};

/* -------------------------------------------------------------------------- */
/*                          Main Trip Planner Component                       */
/* -------------------------------------------------------------------------- */

const TripPlanner: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    startPoint: "",
    destination: "",
    evCarName: "",
    batteryCapacity: "",
  });

  const [loading, setLoading] = useState(false);
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [error, setError] = useState("");
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const [mapCenter, setMapCenter] = useState<MapCenter>({
    lat: 20.5937,
    lng: 78.9629,
  });
  const [mapZoom, setMapZoom] = useState(5);

  const MAP_KEY = import.meta.env.VITE_MAPS_API_KEY;

  const [selectedVehical, setSelectedVehical] = useState({
    name: "Tata Tiago EV",
    power: 24,
    estimatedTime: 2.5,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      evCarName: selectedVehical.name,
      batteryCapacity: selectedVehical.power.toString(),
    }));
  }, [selectedVehical]);

  const vehicals = cars.map((car) => ({
    name: car.name,
    power: car.power,
    estimatedTime: car.estimatedTime,
  }));

  const getMarkerColor = (index: number, total: number) => {
    if (index === 0) return "#22c55e";
    if (index === total - 1) return "#ef4444";
    return "#f59e0b";
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await plannerService.plan(
        formData.startPoint,
        formData.destination,
        formData.evCarName,
        Number(formData.batteryCapacity)
      );

      if (!response.data) throw new Error("Invalid route response");

      const data: RouteData = response.data;
      setRouteData(data);

      if (data.coordinates.length > 0) {
        setMapCenter({
          lat: data.coordinates[0].lat,
          lng: data.coordinates[0].lng,
        });
        setMapZoom(7);
      }
    } catch (err: any) {
      setError(err.message || "Failed to plan trip");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.startPoint &&
      formData.destination &&
      formData.evCarName &&
      formData.batteryCapacity
    );
  };

  return (
    <div className="h-full bg-white p-4 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-white p-6 text-black">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <FaBolt className="w-8 h-8" /> EV Trip Planner
            </h1>
            <p className="mt-2 text-zinc-700">
              Plan your electric vehicle journey with optimal charging stops
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 p-6">
            {/* ------------------------------ FORM ------------------------------ */}
            <div className="lg:col-span-1 space-y-4">
              {/* Start Point */}
              <div>
                <label className="text-sm font-medium flex items-center gap-2">
                  <FaMapMarkerAlt className="text-green-500" /> Starting Point
                </label>
                <input
                  type="text"
                  name="startPoint"
                  value={formData.startPoint}
                  onChange={(e) =>
                    setFormData({ ...formData, startPoint: e.target.value })
                  }
                  className="border px-3 py-2 rounded-md w-full text-sm"
                  placeholder="e.g., Mumbai"
                />
              </div>

              {/* Destination */}
              <div>
                <label className="text-sm font-medium flex items-center gap-2">
                  <FaRoute className="text-red-500" /> Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                  }
                  className="border px-3 py-2 rounded-md w-full text-sm"
                  placeholder="e.g., Delhi"
                />
              </div>

              {/* Vehicle */}
              <div>
                <label className="text-sm font-medium">EV Car Name</label>
                <select
                  value={selectedVehical.name}
                  onChange={(e) => {
                    const v = vehicals.find((x) => x.name === e.target.value);
                    if (v) setSelectedVehical(v);
                  }}
                  className="border px-3 py-2 rounded-md w-full text-sm"
                >
                  {vehicals.map((v) => (
                    <option key={v.name}>
                      {v.name} ({v.power} kWh)
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading || !isFormValid()}
                className="w-full bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin" />{" "}
                    Planning...
                  </>
                ) : (
                  <>
                    <FaRoute /> Plan My Trip
                  </>
                )}
              </button>

              {error && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md">
                  {error}
                </div>
              )}

              <div className="flex flex-col space-y-6 mt-8">
                {routeData?.coordinates?.map((coord, index) => (
                  <div className="flex space-x-4">
                    <div className="w-[25px] h-[25px] rounded-full bg-black flex items-center justify-center shrink-0">
                      <p className="text-white text-xs">{index + 1}</p>
                    </div>

                    <div className="space-y-2">
                      <p>{coord.name}</p>
                      <p className="text-xs">{coord.description}</p>
                      {coord.waitingTime ? (
                        <p className="text-red-500 text-xs">Waiting time: {coord.waitingTime} minutes</p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ------------------------------ MAP ------------------------------ */}
            <div className="lg:col-span-2">
              <div className="bg-zinc-800 rounded-lg h-[500px] overflow-hidden">
                <APIProvider apiKey={MAP_KEY}>
                  <Map
                    defaultCenter={mapCenter}
                    defaultZoom={mapZoom}
                    gestureHandling="greedy"
                    disableDefaultUI={false}
                    mapId="92b5cb93229cb323b16c57b8"
                    className="w-full h-full"
                    onIdle={() => setMapReady(true)} // Fixes map crash
                  >
                    {mapReady &&
                      routeData?.coordinates?.map((coord, idx) => {
                        const isStart = idx === 0;
                        const isEnd = idx === routeData.coordinates.length - 1;
                        const label = isStart ? "S" : isEnd ? "E" : `${idx}`;

                        return (
                          <AdvancedMarker
                            key={idx}
                            position={{ lat: coord.lat, lng: coord.lng }}
                            onClick={() => setSelectedMarker(idx)}
                          >
                            <div
                              className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-white text-white font-bold shadow-md"
                              style={{
                                background: getMarkerColor(
                                  idx,
                                  routeData.coordinates.length
                                ),
                              }}
                            >
                              {label}
                            </div>
                          </AdvancedMarker>
                        );
                      })}

                    {/* Info Window */}
                    {selectedMarker !== null &&
                      routeData?.coordinates?.[selectedMarker] && (
                        <InfoWindow
                          position={{
                            lat: routeData.coordinates[selectedMarker].lat,
                            lng: routeData.coordinates[selectedMarker].lng,
                          }}
                          onCloseClick={() => setSelectedMarker(null)}
                        >
                          <div className="p-2 text-black">
                            <h3 className="font-bold">
                              {routeData.coordinates[selectedMarker].name}
                            </h3>
                            <p>
                              {
                                routeData.coordinates[selectedMarker]
                                  .description
                              }
                            </p>
                          </div>
                        </InfoWindow>
                      )}

                    {/* Polyline */}
                    {routeData?.coordinates &&
                      routeData.coordinates.length > 1 && (
                        <RoutePolyline coordinates={routeData.coordinates} />
                      )}
                  </Map>
                </APIProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
