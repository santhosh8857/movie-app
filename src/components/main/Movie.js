// movie details
// description
// cast and crew
// review

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "./Navbar";
import MovieCard from "../utilities/MovieCard";

import "../../css/main/movie.css";

const Movie = () => {
  // get the id from url
  let { id } = useParams();

  // to store data from DB
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    axios
      .get(`https://movie-bookingapp.herokuapp.com/movies/${id}`)
      .then((resp) => setMovie(resp.data.data))
      .catch((err) => console.log(err));
  }, [id]);

  console.log(movie);

  return (
    <>
      <div>
        <Navbar />
        <div
          className="showcase-img"
          style={{ backgroundImage: `url(${movie.showcase})` }}
        >
          <div className="movie-container">
            <MovieCard movie={movie} />
            <div className="movie-details">
              <h1>{movie.name}</h1>
              <p>
                {movie.movieLength}&nbsp;&nbsp;
                <i className="fa-solid fa-circle circle-icon"></i>&nbsp;&nbsp;
                {movie.category}
              </p>
              <p>
                {movie.rating}&nbsp;&nbsp;
                <i className="fa-solid fa-circle circle-icon"></i>&nbsp;&nbsp;
                {movie.release}
              </p>
              <div>
                <button className="btn btn-primary">
                  Book Tickets &nbsp;
                  <i className="fa-solid fa-circle-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="movie-info-container"></div>
      </div>
    </>
  );
};

export default Movie;
