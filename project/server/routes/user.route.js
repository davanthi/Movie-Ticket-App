const express = require("express");
const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuth = require("../middlewares/authmiddleware.js");
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
      return res.send({
        success: false,
        message: "sorry invalid password",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    res.cookie("jwtToken", token, {
      httpOnly: true,
    });
    return res.send({
      success: true,
      message: "user logged in successfully",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Logging in!",
    });
  }
});
userRouter.get("/current-user", isAuth, async (req, res) => {
  try {
    const verifiedUser = await User.findById(req.userId).select("-password");
    if (!verifiedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.json({
      _id: verifiedUser._id,
      name: verifiedUser.name,
      email: verifiedUser.email,
      role: verifiedUser.role,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching current user!",
    });
  }
});
module.exports = userRouter;
