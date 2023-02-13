const express = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/userController");

const router = express.Router();

// routes
// Method - POST
router.post("/login", loginController);

// Method - POST
router.post("/register", registerController);

module.exports = router;
