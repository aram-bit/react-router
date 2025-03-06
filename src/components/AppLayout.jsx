import React from "react";
import { Outlet } from "react-router-dom";

function AppLayOut() {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      map
    </div>
  );
}

export default AppLayOut;
