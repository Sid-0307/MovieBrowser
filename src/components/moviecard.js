import React, { useState } from "react";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      {movie.poster_path && (
        <div
          className="movie-card"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="movie-content">
            {isHovered && <h3 className="movie-title">{movie.title}</h3>}
            {isHovered && <p className="movie-overview">{movie.overview}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
