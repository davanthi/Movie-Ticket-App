const express = require("express");
const movieRouter = express.Router();
const Movie = require("../models/movie.model.js");
movieRouter.post("/add-movie", async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.send({
      success: true,
      message: "Movie added Successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Movie could not be added",
    });
  }
});
module.exports = movieRouter;
