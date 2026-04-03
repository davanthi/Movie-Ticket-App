const express = require("express");
const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const userRouter = express.Router();
//Register API
userRouter.post("/register", async (req, res) => {
  try {
    const ExistingUser = await User.findOne({ email: req.body.email });
    if (ExistingUser) {
      res.send({
        success: false,
        message: "user already exists with the email",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashPassword;

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
});
userRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.send({
        success: false,
        message: "user not found with the email please Register",
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!validPassword) {
      res.send({
        success: false,
        message: "sorry invalid password",
      });
    }
    res.send({
      success: true,
      message: "user logged in successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});
module.exports = userRouter;
