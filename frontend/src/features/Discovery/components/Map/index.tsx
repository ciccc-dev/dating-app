import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React, { useContext } from "react";
import { coordinateContext, isDisableContext } from "../../../../pages/Account";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

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
  const { setisDisable } = useContext(isDisableContext);

  const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newLatLng = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setCoordinate(newLatLng);
      setisDisable(false);
    }
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
  });

  if (!isLoaded) return <div>Loading...</div>;

  if (coordinate.lat === 9999) return <StyledBox>No Location Data</StyledBox>;

  return (
    <GoogleMap
      zoom={12}
      center={coordinate}
      mapContainerClassName="map-container"
      mapContainerStyle={{ width: "100%", aspectRatio: 2 / 1 }}
    >
      <Marker position={coordinate} draggable onDragEnd={handleMarkerDragEnd} />
    </GoogleMap>
  );
};

const StyledBox = styled(Box)`
  margin: 1rem;
  font-size: 1.5rem;
`;
