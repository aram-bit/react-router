import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { useHotels } from "../contexts/HotelsProvider";

function SingleHotel() {
  const { id } = useParams();
  const { getHotel, isLoadingCurrHotel, currHotel } = useHotels();
  useEffect(() => {
    getHotel(id);
  }, [id]);
  if (isLoadingCurrHotel || !currHotel) return <Loader />;
  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currHotel.name}</h2>
        <div>
          {currHotel.number_of_reviews} reviews&bull;
          {currHotel.smart_location}
        </div>
        <img src={currHotel.xl_picture_url} alt={currHotel.name} />
      </div>
    </div>
  );
}

export default SingleHotel;
