const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "MYAPI";
const mongoose = require("mongoose");

const mime = require("mime-types");

const path = require("path");

//user signup starts
// User registration function
const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Secure password
    const hashPassword = await bcrypt.hash(password, 10);
    // User creation
    const user = new User({
      name,
      email,
      password: hashPassword,
    });
    // User existence check
    const isExists = await User.findOne({ email });
    if (isExists) {
      return res.status(409).json({
        success: false,
        msg: "Email already exists",
      });
    }
    // Save user data to the database
    const userData = await user.save();
    return res.status(201).json({
      success: true,
      msg: "Registered successfully",
      user: userData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};
//user signup ends

//user login starts
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    //console.log(req.body, "req");
    const existingUser = await User.findOne({ email: email });
    // console.log(existingUser, "existuser");
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        error: error.message,
        message: "User not exist",
      });
    }
    //compare a plain-text password (password) with a hashed password
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    // console.log("Entered Password:", password);
    // console.log("Stored Hashed Password:", existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Wrong credentials" });
    }
    jwt.sign({ User }, SECRET_KEY, { expiresIn: "3000s" }, (err, token) => {
      res.json({ token });
    });
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },

      process.env.secretKey
    );
    res.status(200).json({ success: true, user: existingUser, token: token });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};
//user login ends

// User profile update starts
const updateUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }

  try {
    const userIdHex = req.params.id;
    console.log(userIdHex, "hex");

    // Validate and convert userId to ObjectId
    const userId = mongoose.Types.ObjectId.createFromHexString(userIdHex);
    console.log(userId, "userId");

    // Check if the user with the given id exists
    const existingUser = await User.findByIdAndUpdate(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields if provided
    const { newUsername, newEmail } = req.body;
    if (newUsername) existingUser.name = newUsername;
    if (newEmail) existingUser.email = newEmail;

    // Save the updated user
    const updatedUser = await existingUser.save();

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error); // Log error for debugging
    res
      .status(500)
      .json({
        success: false,
        msg: "An error occurred while updating the user.",
      });
  }
};
//user profile update ends
//get all users starts
const getUsers = async (req, res) => {
  try {
    // Retrieve all users from the database
    const allUsers = await User.find();
    
    // Map over the users and modify the image URL
    const updatedUser = allUsers.map((user) => {
      const updatedUser = user.toObject();
      return updatedUser;
    });

    res.status(200).json({ success: true, users: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
//get all users ends
module.exports = { userRegister, userLogin, updateUser, getUsers };
