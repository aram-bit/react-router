import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { useHotels } from "../contexts/HotelsProvider";

function Hotels() {
  const { isLoading, hotels,currHotel} = useHotels();
  if (isLoading) return <Loader />;
  return (
    <div className="searchList">
      <h2>Search Results ({hotels.length})</h2>
      {hotels.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div className={`searchItem ${item.id===currHotel?.id?"current-hotel":""}`}>
              <img src={item.picture_url.url} alt={item.name} />
              <div className="searchItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                €&nbsp;{item.price}&nbsp;
                <span>night</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Hotels;
