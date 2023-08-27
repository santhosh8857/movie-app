import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "../../css/main/navbar.css";
import movieIcon from "../../images/movie.png";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

// holds search bar and logo
const Navbar = () => {
  const [enteredMovie, setEnteredMovie] = useState("");

  let navigate = useNavigate();

  const getMovieData = () => {
    axios
      .post("https://jade-elated-tuna.cyclic.cloud/movies/get-movie", {
        name: enteredMovie,
      })
      .then((resp) => {
        console.log(resp);
        if (resp.data.status) {
          setEnteredMovie("");
          let movieId = resp.data.data[0]._id;
          navigate(`/movie/${movieId}`);
        } else {
          toast(resp.data.message, { type: "error" });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    getMovieData();
    e.preventDefault();
  };

  const handleChange = (e) => {
    setEnteredMovie(e.target.value);
  };

  return (
    <>
      <ToastContainer />
      <div className="nav-container">
        <div className="navbar">
          <div className="logo" onClick={() => navigate("/")}>
            {/* <i class="fa-solid fa-ticket"></i> */}
            <img src={movieIcon} className="icon-img" alt="icon" />
            <h2>
              <span className="text-primary">Show</span> Time
            </h2>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  id="id"
                  value={enteredMovie}
                  placeholder="Enter movie for search"
                  onChange={handleChange}
                />
                <button className="btn btn-primary" type="submit">
                  Search &nbsp;
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
