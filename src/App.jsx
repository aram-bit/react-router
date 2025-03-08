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
import BookmarkListProvider from "./contexts/BookmarkListProvider";
import Bookmarks from "./components/Bookmarks";
import SingleBookmark from "./components/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark";
function App() {
  return (
    <BookmarkListProvider>
      <HotelsProvider>
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayOut />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
          <Route path="/bookmarks" element={<BookmarkLayout />}>
            <Route index element={<Bookmarks/>} />
            <Route path="add" element={<AddNewBookmark/>} />
            <Route path=":id" element={<SingleBookmark/>} />

          </Route>
        </Routes>
      </HotelsProvider>
    </BookmarkListProvider>
  );
}

export default App;
