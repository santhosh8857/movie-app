const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  movieImg: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  movieLength: {
    type: String,
  },
  rating: {
    type: Number,
  },
  cast: {
    type: Object,
  },
});

const movie = mongoose.model("movie", MovieSchema);

module.exports = movie;
