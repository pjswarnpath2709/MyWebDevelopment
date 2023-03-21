import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Spinner from "./Spinner";

const MapComponent = ({ address }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!address) {
      return;
    }

    const searchAddress = async () => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          address
        )}&format=json&addressdetails=1&limit=1`
      );
      const data = await response.json();

      if (data.length > 0) {
        setLocation([data[0].lat, data[0].lon]);
      }
    };

    searchAddress();
  }, [address]);

  const defaultIcon = new L.Icon({
    iconUrl:
      "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <div style={{ height: "200px", border: "2px solid black" }}>
      {location ? (
        <MapContainer
          center={[...location]}
          zoom={1}
          style={{ height: "100%" }}
        >
          <TileLayer
            url={process.env.REACT_APP_MAP_URL}
            // attribution={process.env.REACT_APP_MAP_ATTRIBUTION}
          />
          {location && (
            <Marker position={[...location]} icon={defaultIcon}>
              <Popup>{address}</Popup>
            </Marker>
          )}
        </MapContainer>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default MapComponent;
