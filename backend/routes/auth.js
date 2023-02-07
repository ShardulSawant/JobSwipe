const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");

const {
  register,
  login,
  registerJobSeeker,
  loginJobSeeker,
  updateUser,
} = require("../controllers/auth");

// register and login for Company
router.post("/register", register);
router.post("/login", login);

//update company user
router.patch("/updateUser", authenticateUser, updateUser);

// register and login for Job Seeker
router.post("/register/jobseeker", registerJobSeeker);
router.post("/login/jobseeker", loginJobSeeker);

module.exports = router;
