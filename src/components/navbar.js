import React from "react";
import axios from "axios";
import menu from "../assets/menu.png";
import close from "../assets/close.png";
import searchIcon from "../assets/searchIcon.png";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useState } from "react";
import MovieCard from "./moviecard";

const Navbar = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  function handleChange(e) {
    setSearch(e.target.value);
  }

  return (
    <>
      <div className="Navbar">
        <img className="menu" src={menu} alt="Menu" onClick={toggleOverlay} />
        <div className="title">
          <a href="/">Movies4U</a>
        </div>
        <div className="search">
          <input
            className="searchbar"
            type="search"
            placeholder="Search movie"
            onChange={handleChange}
          />
          <a href={`/search/${search}`}>
            <button className="searchbtn">
              <img src={searchIcon} alt="Search-Icon" className="searchIcon" />
            </button>
          </a>
        </div>
      </div>
      {showOverlay && (
        <div className="overlay">
          <img
            className="overlayMenu"
            src={close}
            alt="Menu"
            onClick={toggleOverlay}
          />
          <div className="genreOverlay">
            <div className="genreItem">
              <a href="/search/Action=28">Action</a>
            </div>
            <div className="genreItem">
              <a href="/search/Comedy=35">Comedy</a>
            </div>
            <div className="genreItem">
              <a href="/search/Horror=27">Horror</a>
            </div>
            <div className="genreItem">
              <a href="/search/Thriller=53">Thriller</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
