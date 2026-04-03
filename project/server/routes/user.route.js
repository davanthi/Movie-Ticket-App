const express = require("express");
const User = require("../models/user.model.js");
const userRouter = express.Router();
userRouter.post("/register", async (req, res) => {
  try {
    const ExistingUser = await User.findOne({ email: req.body.email });
    if (ExistingUser) {
      res.send({
        success: false,
        message: "user already exists with the email",
      });
    }
    // const newUser= await User.create(req.body)
    const newUser = await User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "user registered successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
  //
});
module.exports = userRouter;
