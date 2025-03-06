import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function Map() {
  const [mapCenter, setMapCenter] = useState([52.3, 4.8]);

  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={12}
        style={{ height: "700px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://frontendi.com" data-wpel-link="internal">ARAMIX</a> contributornps'
        />

        <Marker position={mapCenter}>
          <Popup>tehran</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
