import { format } from "date-fns";
import { useRef, useState } from "react";
import { DateRange } from "react-date-range";
import {
  HiCalendar,
  HiLogout,
  HiMinus,
  HiPlus,
  HiSearch,
} from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import useOutsideClick from "../hooks/useOutsideClick";
import {
  createSearchParams,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
function Header() {
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dateRef = useRef();
  useOutsideClick(dateRef, "calender", () => setOpenDate(false));
  const navigate = useNavigate();
  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  return (
    <div className="header">
      <NavLink to="/bookmarks">Bookmarks</NavLink>
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            type="text"
            placeholder="where to go?"
            className="headerSearchInput"
            name="destination"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem" ref={dateRef}>
          <HiCalendar className="headerIcon dateIcon" />
          <div
            className="dateDropDown"
            id="calender"
            onClick={() => setOpenDate(!openDate)}
          >
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}
          </div>
          {openDate && (
            <DateRange
              onChange={(item) => setDate([item.selection])}
              ranges={date}
              className="date"
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
            {options.adult} adult &nbsp;&bull;&nbsp; {options.children} children
            &nbsp;&bull;&nbsp;
            {options.room} room
          </div>
          {openOptions && (
            <GuestOptionList
              setOpenOptions={setOpenOptions}
              options={options}
              handleOptions={handleOptions}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
      <User/>
    </div>
  );
}

export default Header;
function GuestOptionList({ options, handleOptions, setOpenOptions }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));
  return (
    <div className="guestOptions" ref={optionsRef}>
      <OptionItem
        type="adult"
        minLimit={1}
        options={options}
        handleOptions={handleOptions}
      />
      <OptionItem
        type="children"
        minLimit={0}
        options={options}
        handleOptions={handleOptions}
      />
      <OptionItem
        type="room"
        minLimit={1}
        options={options}
        handleOptions={handleOptions}
      />
    </div>
  );
}

function OptionItem({ type, options, minLimit, handleOptions }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          onClick={() => handleOptions(type, "dec")}
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handleOptions(type, "inc")}
        >
          <HiPlus className=" icon" />
        </button>
      </div>
    </div>
  );
}
function User() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const navigate=useNavigate();
  const handleLogout=()=>{
    logout();
    navigate("/")
  }
  return (
    <div>
      {" "}
      {isAuthenticated ? (
        <div>
          <span>{user.name}</span>
          <button>
            <HiLogout className="icon" onClick={handleLogout} />
          </button>
        </div>
      ) : (
        <NavLink to="/login" className="btn btn--primary">
          login
        </NavLink>
      )}
    </div>
  );
}
