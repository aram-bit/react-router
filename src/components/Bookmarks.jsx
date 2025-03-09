import React from "react";
import Loader from "./Loader";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";
import { useBookmark } from "../contexts/BookmarkListProvider";

function Bookmarks() {
  const { isLoading, bookmarks, currBookmark, deleteBookmark } = useBookmark();
  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };
  if (isLoading) return <Loader />;
  if (!bookmarks.length) return <p> there is not any bookmark</p>;
  return (
    <div>
      <h2>BookmarkList</h2>

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
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp; <strong>{item.cityName}</strong> &nbsp;
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <HiTrash className="trash" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmarks;
