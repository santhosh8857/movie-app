const mongoose = require("mongoose");

// movie document structure
const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  poster: {
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
    type: String,
  },
  cast: {
    type: Object,
  },
  review: {
    type: Array,
  },
  hearts: {
    type: Number,
  },
  votes: {
    type: Number,
  },
});

const movie = mongoose.model("movie", MovieSchema);

module.exports = movie;
