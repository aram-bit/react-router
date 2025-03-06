import React from "react";
import Header from "./components/Header";
import "./App.css";
import LocationList from "./components/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayOut from "./components/AppLayout";
import Hotels from "./components/Hotels";
import HotelsProvider from "./contexts/HotelsProvider";
function App() {
  return (
 <HotelsProvider>
   <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayOut />}>
          <Route index element={<Hotels/>} />
          <Route path=":id" element={<div>single hotel</div>}/>
        </Route>
      </Routes>
 </HotelsProvider>
  );
}

export default App;
