import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React, { useContext } from "react";
import { coordinateContext } from "../../../../pages/Account";

interface ProfileMapProps {
  googleMapsApiKey: string;
}

export const Map = React.memo(() => {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  if (googleMapsApiKey === undefined) {
    return <div>Error</div>;
  }

  return <ProfileMap googleMapsApiKey={googleMapsApiKey} />;
});

const ProfileMap = ({ googleMapsApiKey }: ProfileMapProps) => {
  const { coordinate, setCoordinate } = useContext(coordinateContext);

  const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newLatLng = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setCoordinate(newLatLng);
    }
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
  });

  if (!isLoaded) return <div>Loading...</div>;

  if (coordinate.lat === 9999) return <div>Cannot get geolocation</div>;

  return (
    <GoogleMap
      zoom={16}
      center={coordinate}
      mapContainerClassName="map-container"
      mapContainerStyle={{ width: "100%", aspectRatio: 2 / 1 }}
    >
      <Marker position={coordinate} draggable onDragEnd={handleMarkerDragEnd} />
    </GoogleMap>
  );
};
