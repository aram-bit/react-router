import React from "react";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

function SingleHotel() {
  const { id } = useParams();
  const { isLoading, data: hotel } = useFetch(
    `http://localhost:5000/hotels/${id}`
  );
  if (isLoading) return <Loader />;
  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{hotel.name}</h2>
        <div>
          {hotel.number_of_reviews} reviews&bull;
          {hotel.smart_location}
        </div>
        <img src={hotel.xl_picture_url} alt={hotel.name} />
      </div>
    </div>
  );
}

export default SingleHotel;
