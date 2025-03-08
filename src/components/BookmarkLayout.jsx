import { Outlet } from "react-router-dom";
import Map from "./Map";

function BookmarkLayout() {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocations={[]}/>
    </div>
  );
}

export default BookmarkLayout;
