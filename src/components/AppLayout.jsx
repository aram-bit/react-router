import React from "react";
import { Outlet } from "react-router-dom";
import Map from "./Map";

function AppLayOut() {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map />
    </div>
  );
}

export default AppLayOut;
