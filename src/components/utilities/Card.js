// each card hold the movie poster, title and favorites

import { useNavigate } from "react-router-dom";

import "../../css/utilities/card.css";

const Card = ({ movie }) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(`/movie/${movie._id}`);
  };
  return (
    <>
      <div className="card" onClick={clickHandler}>
        <div className="card-content">
          <img src={movie.poster} className="card-img" alt={movie.name}></img>
          <p className="card-rating">
            <i className="fa-solid fa-heart text-primary"></i>{" "}
            {`${movie.hearts}% ${movie.votes}k votes`}
          </p>
          <div className="movie-details">
            <p>{movie.name}</p>
            <p>{movie.category}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;

// const getMovieData = async () => {
//   await axios
//     .post("https://jade-elated-tuna.cyclic.cloud/movies/get-movie", {
//       name: enteredMovie,
//     })
//     .then((resp) => {
//       return resp.data.data[0]._id;
//     })
//     .catch((err) => console.log(err));
//   setEnteredMovie("");
// };

// const handleSubmit = async (e) => {
//   let movieId = await getMovieData();
//   console.log(movieId);
//   e.preventDefault();
// };
