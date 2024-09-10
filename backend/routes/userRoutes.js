const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../middleware/validateTokenHandler");

//Middleware
router.use(express.json());// Parses incoming request bodies as JSON
router.use(express.static("public"));// Serves static files from "public" directory
router.use(express.urlencoded({ extended: true }));// Parses incoming request bodies with URL-encoded data

//Rotes
router.post(
  "/register",
 
  userController.userRegister
);
router.post("/login", userController.userLogin);



router.get(
  "/users",
  express.static("public/userImages"),
  userController.getUsers
);
module.exports = router;
