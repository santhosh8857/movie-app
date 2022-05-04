import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";
import Movie from "./components/main/Movie";
import Seat from "./components/main/Seat";

const routing = (
  <Router>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route exact path="/movie/:id" element={<Movie />} />
      <Route exact path="/seat-selection" element={<Seat />} />
    </Routes>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode>{routing}</React.StrictMode>);
