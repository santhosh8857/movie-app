// movie details
// description
// cast and crew
// review

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "./Navbar";
import MovieCard from "../utilities/MovieCard";
import Footer from "./Footer";

import "../../css/main/movie.css";
import "../../css/mobile/mobile.css";

const Movie = () => {
  // get the id from url
  let { id } = useParams();
  let navigate = useNavigate();

  // to store data from DB
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    axios
      .get(`https://jade-elated-tuna.cyclic.cloud/movies/${id}`)
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
              <h1 id="heading">{movie.name}</h1>
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
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/seat-selection")}
                >
                  Book Tickets &nbsp;
                  <i className="fa-solid fa-circle-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="movie-section-container" id="movie-section-container">
          <div className="movie-info-container">
            <div>
              <h2 className="heading">
                <span className="text-primary">About </span> This Movie
              </h2>
              <p className="details">{movie.description}</p>
            </div>
            <h2 className="heading">
              Cast <span className="text-primary"> & Crew</span>
            </h2>
            {movie.length !== 0 ? (
              <div className="cast-container">
                <div className="cast">
                  <img
                    src={movie.cast.hero[1]}
                    alt={movie.cast.hero[0]}
                    className="cast-img"
                  ></img>
                  <p className="details">{movie.cast.hero[0]}</p>
                </div>
                <div className="cast">
                  <img
                    src={movie.cast.heroine[1]}
                    alt={movie.cast.heroine[0]}
                    className="cast-img"
                  ></img>
                  <p className="details">{movie.cast.heroine[0]}</p>
                </div>
                <div className="cast">
                  <img
                    src={movie.cast.villain[1]}
                    alt={movie.cast.villain[0]}
                    className="cast-img"
                  ></img>
                  <p className="details">{movie.cast.villain[0]}</p>
                </div>
                <div className="cast">
                  <img
                    src={movie.cast.director[1]}
                    alt={movie.cast.director[0]}
                    className="cast-img"
                  ></img>
                  <p className="details">{movie.cast.director[0]}</p>
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="rating">
              <h2 className="heading">
                <span className="text-primary">Top </span> Reviews
              </h2>
              <div className="rating-container">
                {movie.length !== 0 ? (
                  movie.review.map((review, key) => {
                    return (
                      <div className="review" key={key}>
                        <p className="details">{review}</p>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Movie;
