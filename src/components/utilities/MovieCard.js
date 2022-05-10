import "../../css/utilities/moviecard.css";
import "../../css/mobile/mobile.css";

const MovieCard = ({ movie }) => {
  return (
    <>
      <div className="movie-card">
        <div className="movie-card-content">
          <img
            src={movie.poster}
            className="movie-card-img"
            alt={movie.name}
          ></img>
          <p className="movie-card-rating">
            <i className="fa-solid fa-heart text-primary"></i>{" "}
            {`${movie.hearts}% ${movie.votes}k votes`}
          </p>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
