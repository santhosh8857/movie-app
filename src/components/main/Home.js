// start up screen -> holds search bar,
// list of recommended movies
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Card from "../utilities/Card";

import "../../css/main/home.css";
import "../../css/main/footer.css";
import "../../css/mobile/mobile.css";

const Home = () => {
  // toggle showcase image
  const [isChange, setIsChange] = useState(true);

  // to store data from DB
  const [movies, setMovies] = useState([]);

  // fetch movies
  const getMovies = () => {
    axios
      .get("https://jade-elated-tuna.cyclic.cloud/movies")
      .then((resp) => setMovies(resp.data.data))
      .catch((err) => console.log(err));
  };

  // toggle showcase image function
  const clickHandler = () => {
    setIsChange(!isChange);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <div className="showcase" id={isChange ? "showcase1" : "showcase2"}>
          <div className="arrow">
            <p className="arrow-icon" onClick={clickHandler}>
              <i className="fa-solid fa-chevron-left"></i>
            </p>
            <p className="arrow-icon" onClick={clickHandler}>
              <i className="fa-solid fa-chevron-right"></i>
            </p>
          </div>
        </div>
        {/* card section */}

        <div className="card-section">
          <div className="card-section-container">
            <h2 className="heading">
              Our <span className="text-primary">Recommendation</span>
            </h2>

            {/* cards */}
            <div className="card-container">
              {movies.map((movie, key) => {
                return <Card movie={movie} key={key} />;
              })}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
