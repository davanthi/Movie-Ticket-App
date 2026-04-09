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
movieRouter.put("/update-movie/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body);
    res.send({
      success: true,
      message: "Movie updated successfully",
      data: updatedMovie,
    });
  } catch (error) {
    res.send({
      success: false,
      message: " server error Movie could not be updated",
    });
  }
});
movieRouter.delete("/delete-movie/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    res.send({
      success: true,
      message: "movie deleted Successfully",
      data: deletedMovie,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "server Error  movie could not be deleted",
    });
  }
});
movieRouter.get("/all-movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send({
      success: true,
      message: "All movies fetched successfully",
      data: movies,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "server error movies could not be fetched",
    });
  }
});
movieRouter.get("/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);
    res.send({
      success: true,
      message: "movie fetched Successfully",
      data: movie
    });
  } catch (error) {
    res.send({
      success: false,
      message: "server error movie could not be fetched",
    });
  }
});

module.exports = movieRouter;
