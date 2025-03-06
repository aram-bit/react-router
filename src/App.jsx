import React from "react";
import Header from "./components/Header";
import "./App.css";
import LocationList from "./components/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayOut from "./components/AppLayout";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayOut />}>
          <Route index element={<div>hotels</div>} />
          <Route path=":id" element={<div>single hotel</div>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
