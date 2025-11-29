import  { useState, useEffect, useRef, type JSX } from 'react';
import { APIProvider, Map, AdvancedMarker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

// Types
interface LatLng {
  lat: number;
  lng: number;
}

interface DirectionsProps {
  origin: LatLng;
  destination: LatLng;
}

// Component to handle directions
function Directions({ origin, destination }: DirectionsProps): null {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  // Initialize directions service
  useEffect(() => {
    if (!routesLibrary) return;
    setDirectionsService(new routesLibrary.DirectionsService());
  }, [routesLibrary]);

  // Initialize and cleanup directions renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;

    // Create renderer
    const renderer = new routesLibrary.DirectionsRenderer({
      map: map,
      suppressMarkers: true, // We'll use custom markers
      polylineOptions: {
        strokeColor: '#1976D2',
        strokeWeight: 6,
        strokeOpacity: 0.9
      }
    });

    directionsRendererRef.current = renderer;

    // Cleanup
    return () => {
      renderer.setMap(null);
      directionsRendererRef.current = null;
    };
  }, [routesLibrary, map]);

  // Request and display route
  useEffect(() => {
    if (!directionsService || !directionsRendererRef.current) {
      console.log('Service or renderer not ready');
      return;
    }
    if (!origin || !destination) {
      console.log('Origin or destination missing');
      return;
    }

    console.log('🗺️ Requesting directions...');
    console.log('From:', origin);
    console.log('To:', destination);

    const request: google.maps.DirectionsRequest = {
      origin: new google.maps.LatLng(origin.lat, origin.lng),
      destination: new google.maps.LatLng(destination.lat, destination.lng),
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        console.log('✅ Route received successfully!');
        console.log('Route:', result);
        directionsRendererRef.current?.setDirections(result);
      } else {
        console.error('❌ Directions request failed:', status);
        if (status === google.maps.DirectionsStatus.REQUEST_DENIED) {
          console.error('REQUEST_DENIED - Check if Directions API is enabled in Google Cloud Console');
        } else if (status === google.maps.DirectionsStatus.ZERO_RESULTS) {
          console.error('ZERO_RESULTS - No route found between these points');
        }
      }
    });
  }, [directionsService, origin, destination]);

  return null;
}

export default function MapWithRouting(): JSX.Element {
  // Starting location (your current example)
  const [origin] = useState<LatLng>({ lat: 22.54992, lng: 72.93993 });
  
  // Destination (example - change this to your desired destination)
  const [destination] = useState<LatLng>({ lat: 26.9124, lng: 75.7873 });
  
  // Current position that will update during driving
  const [currentPosition, setCurrentPosition] = useState<LatLng>(origin);
  
  // Track if we're simulating movement
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Watch real GPS position
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log('Geolocation not supported');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position: GeolocationPosition) => {
        const newPos: LatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentPosition(newPos);
        console.log('📍 Position updated:', newPos);
      },
      (error: GeolocationPositionError) => {
        console.error('Error watching position:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Optional: Simulate movement for testing (remove in production)
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setCurrentPosition((prev: LatLng) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <APIProvider apiKey={import.meta.env.VITE_MAPS_API_KEY as string}>
        {/* hide controls */}
        <Map
          style={{ width: "100%", height: "100%" }}
          defaultCenter={currentPosition}
          defaultZoom={13}
          gestureHandling="greedy"
          disableDefaultUI={true}
          mapId="92b5cb93229cb323b16c57b8"
        >
          {/* Route - must be inside Map */}
          <Directions origin={currentPosition} destination={destination} />

          {/* Current position marker */}
          <AdvancedMarker 
            position={currentPosition}
          >
            <div style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: '#4285F4',
              border: '3px solid white',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
            }} />
          </AdvancedMarker>

          {/* Destination marker */}
          <AdvancedMarker 
            position={destination}
          >
            <div style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: '#EA4335',
              border: '3px solid white',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
            }} />
          </AdvancedMarker>
        </Map>
      </APIProvider>

      {/* Control panel for testing */}
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        display: "none",
        background: 'white',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        zIndex: 1000
      }}>
        <div style={{ marginBottom: '10px', fontSize: '14px' }}>
          <strong>Current Position:</strong><br/>
          {currentPosition.lat.toFixed(5)}, {currentPosition.lng.toFixed(5)}
        </div>
        <button
          onClick={() => setIsSimulating(!isSimulating)}
          style={{
            padding: '8px 16px',
            background: isSimulating ? '#EA4335' : '#4285F4',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          {isSimulating ? 'Stop Simulation' : 'Simulate Movement'}
        </button>
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Check browser console for route status
        </div>
      </div>
    </div>
  );
}