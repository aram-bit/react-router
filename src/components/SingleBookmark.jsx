import React, { useEffect } from "react";
import { useBookmark } from "../contexts/BookmarkListProvider";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const { id } = useParams();
  const { getBookmark, isLoadingCurrBookmark, currBookmark } = useBookmark();
  const navigate = useNavigate();
  useEffect(() => {
    getBookmark(id);
  }, [id]);
  if (isLoadingCurrBookmark || !currBookmark) return <Loader />;
  return (
    <div>
      <h2>{currBookmark.cityName}</h2>
      <button className="btn btn--back" onClick={() => navigate(-1)}>
        &larr; back
      </button>
      <div className="bookmarkItem">
        <ReactCountryFlag svg countryCode={currBookmark.countryCode} />
        &nbsp;<strong>{currBookmark.cityName}</strong> &nbsp;
        <span>{currBookmark.country}</span>
      </div>
    </div>
  );
}

export default SingleBookmark;
