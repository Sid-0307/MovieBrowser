import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "./moviecard";
import axios from "axios";
import "./search.css";
const Search = () => {
  const { movie } = useParams();
  const genre = movie.split("=")[0];
  const genreID = movie.split("=")[1];
  const [flag, setFlag] = useState(0);
  const [searchResults, setSearchResults] = useState([]);

  async function fetchSearchResults() {
    if (genreID) {
      await axios
        .post("http://localhost:3001/genre", { genre: genreID })
        .then((response) => {
          setSearchResults(response.data.results);
          if (response.data.results.length == 0) setFlag(1);
        });
    } else {
      await axios
        .post("http://localhost:3001/search", { movie: movie })
        .then((response) => {
          if (response.data.results.length == 0) setFlag(1);
          console.log(response.data.results.length, flag);
          setSearchResults(response.data.results);
        });
    }
  }

  useEffect(() => {
    fetchSearchResults();
  }, []);

  return (
    <div className="row-search">
      {!genreID && (
        <h1 className="search-heading">
          Search results for <span className="search-moviename">{movie}</span>
        </h1>
      )}
      {genreID && (
        <h1 className="search-heading">
          Search results for genre{" "}
          <span className="search-moviename">{genre}</span>
        </h1>
      )}
      <div className="search-result">
        {searchResults.length == 0 && flag == 0 && (
          <img
            src="https://media.tenor.com/t5DMW5PI8mgAAAAi/loading-green-loading.gif"
            alt="loading gif"
            className="loader"
          />
        )}
        {searchResults.map((s) => (
          <MovieCard movie={s} />
        ))}
        {searchResults.length == 0 && flag == 1 && (
          <div className="no-movies">No.</div>
        )}
      </div>
    </div>
  );
};

export default Search;
