import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

interface MapProps {
  latitude: number;
  longitude: number;
}

interface ProfileMapProps extends MapProps {
  googleMapsApiKey: string;
}

export const Map = ({ latitude, longitude }: MapProps) => {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  if (googleMapsApiKey === undefined) {
    return <div>Error</div>;
  }

  return (
    <ProfileMap
      googleMapsApiKey={googleMapsApiKey}
      latitude={latitude}
      longitude={longitude}
    />
  );
};

const ProfileMap = ({
  googleMapsApiKey,
  latitude,
  longitude,
}: ProfileMapProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
  });

  if (!isLoaded) return <div>Loading...</div>;

  if (!latitude || !longitude) return <div>Cannot get geolocation</div>;

  return (
    <GoogleMap
      zoom={16}
      center={{ lat: latitude, lng: longitude }}
      mapContainerClassName="map-container"
      mapContainerStyle={{ width: "100%", aspectRatio: 2 / 1 }}
    >
      <Marker position={{ lat: latitude, lng: longitude }} />
    </GoogleMap>
  );
};
