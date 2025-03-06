import React from "react";
import Header from "./components/Header";
import "./App.css"
import LocationList from "./components/LocationList";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<LocationList/>}/>
      </Routes>
    </div>
  );
}

export default App;
