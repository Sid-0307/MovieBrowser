import React, { useEffect, useState } from "react";
import MovieCard from "./moviecard";
import "./Home.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [results, setResults] = useState([]);
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const [upcomingresults, setUpcomingResults] = useState([]);

  const [trendingIndex, setTrendingIndex] = useState(0);
  const [trendingresults, setTrendingResults] = useState([]);

  const [popularIndex, setPopularIndex] = useState(0);
  const [popularresults, setPopularResults] = useState([]);

  const fetchMovies = async () => {
    const upcomingResponse = await fetch(
      `${process.env.REACT_APP_BASE_URL}/upcoming`
    );
    const upcomingData = await upcomingResponse.json();

    const trendingResponse = await fetch(
      `${process.env.REACT_APP_BASE_URL}/trending`
    );
    const trendingData = await trendingResponse.json();

    const popularResponse = await fetch(
      `${process.env.REACT_APP_BASE_URL}/popular`
    );
    const popularData = await popularResponse.json();

    console.log(upcomingData, trendingData, popularData);
    setResults({
      upcoming: upcomingData.results,
      trending: trendingData.results,
      popular: popularData.results,
    });
    setMovies({
      upcoming: upcomingData.results.slice(upcomingIndex, upcomingIndex + 5),
      trending: trendingData.results.slice(trendingIndex, trendingIndex + 5),
      popular: popularData.results.slice(popularIndex, popularIndex + 5),
    });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  function inc(x) {
    if (x == 1 && upcomingIndex < results.upcoming.length - 5) {
      setUpcomingIndex(upcomingIndex + 1);
      setMovies({
        upcoming: results.upcoming.slice(upcomingIndex + 1, upcomingIndex + 6),
        trending: movies.trending,
        popular: movies.popular,
      });
    } else if (x == 2 && trendingIndex < results.trending.length - 5) {
      setTrendingIndex(trendingIndex + 1);
      setMovies({
        upcoming: movies.upcoming,
        trending: results.trending.slice(trendingIndex + 1, trendingIndex + 6),
        popular: movies.popular,
      });
    } else if (x == 3 && popularIndex < results.popular.length - 5) {
      setPopularIndex(popularIndex + 1);
      setMovies({
        upcoming: movies.upcoming,
        trending: movies.trending,
        popular: results.popular.slice(popularIndex + 1, popularIndex + 6),
      });
    }
  }

  function dec(x) {
    if (x == 1 && upcomingIndex > 0) {
      console.log(upcomingIndex);
      setUpcomingIndex(upcomingIndex - 1);
      setMovies({
        upcoming: results.upcoming.slice(upcomingIndex - 1, upcomingIndex + 4),
        trending: movies.trending,
        popular: movies.popular,
      });
    } else if (x == 2 && trendingIndex > 0) {
      setTrendingIndex(trendingIndex - 1);
      setMovies({
        upcoming: movies.upcoming,
        trending: results.trending.slice(trendingIndex - 1, trendingIndex + 4),
        popular: movies.popular,
      });
    } else if (x == 3 && popularIndex > 0) {
      setPopularIndex(popularIndex - 1);
      setMovies({
        upcoming: movies.upcoming,
        trending: movies.trending,
        popular: results.popular.slice(popularIndex - 1, popularIndex + 4),
      });
    }
  }

  return (
    <div>
      <div className="row">
        <h1 className="upcoming-heading">Upcoming </h1>
        <div className="upcoming">
          <button
            onClick={() => dec(1)}
            disabled={upcomingIndex == 0}
            className="btn"
          >
            Prev
          </button>
          {!movies.upcoming && (
            <img
              src="https://media.tenor.com/t5DMW5PI8mgAAAAi/loading-green-loading.gif"
              alt="loading gif"
              className="loader"
            />
          )}
          {movies.upcoming &&
            movies.upcoming.map((m) => <MovieCard movie={m} />)}
          <button
            onClick={() => inc(1)}
            disabled={upcomingIndex == 15}
            className="btn"
          >
            Next
          </button>
        </div>
      </div>

      <div className="row">
        <h1 className="trending-heading">Trending </h1>
        <div className="trending">
          <button
            onClick={() => dec(2)}
            disabled={trendingIndex == 0}
            className="btn"
          >
            Prev
          </button>
          {!movies.trending && (
            <img
              src="https://media.tenor.com/t5DMW5PI8mgAAAAi/loading-green-loading.gif"
              alt="loading gif"
              className="loader"
            />
          )}
          {movies.trending &&
            movies.trending.map((m) => <MovieCard movie={m} />)}
          <button
            onClick={() => inc(2)}
            disabled={trendingIndex == 15}
            className="btn"
          >
            Next
          </button>
        </div>
      </div>

      <div className="row">
        <h1 className="popular-heading">Popular</h1>
        <div className="popular">
          <button
            onClick={() => dec(3)}
            disabled={popularIndex == 0}
            className="btn"
          >
            Prev
          </button>
          {!movies.popular && (
            <img
              src="https://media.tenor.com/t5DMW5PI8mgAAAAi/loading-green-loading.gif"
              alt="loading gif"
              className="loader"
            />
          )}
          {movies.popular && movies.popular.map((m) => <MovieCard movie={m} />)}
          <button
            onClick={() => inc(3)}
            disabled={popularIndex == 15}
            className="btn"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
