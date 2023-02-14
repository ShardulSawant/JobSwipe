const jobSeeker = require("../models/JobSeeker");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/index");

const authJobSeeker = async (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //Attach the user to the job route
    req.jobSeeker = { jobSeekerId: payload.jobSeekerId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = authJobSeeker;
