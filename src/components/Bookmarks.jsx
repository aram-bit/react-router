import React from "react";
import { useBookmark } from "../contexts/BookmarkListProvider";
import Loader from "./Loader";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";

function Bookmarks() {
  const { isLoading, bookmarks, currBookmark } = useBookmark();
  if (isLoading) return <Loader />;
  return (
    <div>
      <h2>Bookmarks list</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`bookmarkItem ${
                  item.id === currBookmark?.id ? "current-bookmark" : ""
                }`}
              >
                <ReactCountryFlag svg countryCode={item.countryCode} />
                &nbsp;<strong>{item.cityName}</strong> &nbsp;
                <span>{item.country}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmarks;
