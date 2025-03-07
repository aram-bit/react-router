import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useHotels } from "../contexts/HotelsProvider";
import { useSearchParams } from "react-router-dom";

function Map() {
  const [mapCenter, setMapCenter] = useState([52.3, 4.8]);
  const { isLoading, hotels } = useHotels();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  useEffect(()=>{
   if(lat && lng) setMapCenter([lat,lng])
  },[lat,lng])
  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={[lat || 52, lng || 4.8]}
        zoom={12}
        style={{ height: "700px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://frontendi.com" data-wpel-link="internal">ARAMIX</a> contributornps'
        />
        <ChangeCenter position={mapCenter} />
        {hotels.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
