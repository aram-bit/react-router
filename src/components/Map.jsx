import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useHotels } from "../contexts/HotelsProvider";

function Map() {
  const [mapCenter, setMapCenter] = useState([52.3, 4.8]);
  const { isLoading, hotels } = useHotels();
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
        {hotels.map((item) => (
          <Marker key={item.id} position={[item.latitude,item.longitude]}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
