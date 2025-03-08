import { createContext, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000";
const BookmarkContext = createContext();
function BookmarkListProvider({ children }) {
  const [currBookmark, setCurrBookmark] = useState(null);
  const [isLoadingCurrBookmark, setIsLoadingCurrBookmark] = useState(false);
  const { isLoading, data: bookmarks } = useFetch(`${BASE_URL}/bookmarks`);
  async function getBookmark(id) {
    setIsLoadingCurrBookmark(true);
    setCurrBookmark(null);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrBookmark(data);
      setIsLoadingCurrBookmark(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrBookmark(false);
    }
  }
  async function createBookmark(newBookmark) {
    setIsLoadingCurrBookmark(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      console.log(data);

      setCurrBookmark(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingCurrBookmark(false);
    }
  }
  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        getBookmark,
        isLoadingCurrBookmark,
        currBookmark,
        createBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkListProvider;
export function useBookmark() {
  return useContext(BookmarkContext);
}
