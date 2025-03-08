import React from "react";
import Header from "./components/Header";
import "./App.css";
import LocationList from "./components/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayOut from "./components/AppLayout";
import Hotels from "./components/Hotels";
import HotelsProvider from "./contexts/HotelsProvider";
import SingleHotel from "./components/SingleHotel";
import BookmarkLayout from "./components/BookmarkLayout";
function App() {
  return (
    <HotelsProvider>
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayOut />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<SingleHotel />} />
        </Route>
        <Route path="/bookmark" element={<BookmarkLayout />}>
          <Route index element={<div>bookmarks list</div>} />
          <Route path="add" element={<div>add new bookmark</div>} />
        </Route>
      </Routes>
    </HotelsProvider>
  );
}

export default App;
