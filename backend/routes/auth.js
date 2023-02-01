const express = require("express");
const router = express.Router();

const {
  register,
  login,
  registerJobSeeker,
  loginJobSeeker,
} = require("../controllers/auth");

// register and login for Company
router.post("/register", register);
router.post("/login", login);

// register and login for Job Seeker
router.post("/register/jobseeker", registerJobSeeker);
router.post("/login/jobseeker", loginJobSeeker);

module.exports = router;
