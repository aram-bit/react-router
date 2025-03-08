import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000/hotels";
const HotelContext = createContext();
function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const [currHotel, setCurrHotel] = useState(null);
  const [isLoadingCurrHotel, setIsLoadingCurrHotel] = useState(false);
  const { isLoading, data: hotels } = useFetch(
    BASE_URL,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );
  async function getHotel(id) {
    setIsLoadingCurrHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrHotel(data);
      setIsLoadingCurrHotel(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrHotel(false);
    }
  }
  return (
    <HotelContext.Provider
      value={{
        isLoading,
        hotels,
        getHotel,
        isLoadingCurrHotel,
        currHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export default HotelsProvider;
export function useHotels() {
  return useContext(HotelContext);
}
