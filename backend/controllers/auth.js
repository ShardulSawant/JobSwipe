const User = require("../models/User");
const JobSeeker = require("../models/JobSeeker");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");

//Register for Company
const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
      location: user.location,
      token,
    },
  });
};

//Login for Company
const login = async (req, res) => {
  const { email, password } = req.body;

  //Validation to check if email and password is entered by the user
  if (!email || !password) {
    throw new BadRequestError("Provide email and password");
  }

  //Check for user using email
  const user = await User.findOne({ email });

  //Check if user exist
  if (!user) {
    throw new UnauthenticatedError("Invalid credentails");
  }

  //Validation for password check
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentails");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      name: user.name,
      location: user.location,
      token,
    },
  });
};

//Regsiter for Job seeker
const registerJobSeeker = async (req, res) => {
  /*  console.log("API Reached");
  console.log(req.body); */
  const jobSeeker = await JobSeeker.create({ ...req.body });

  const token = jobSeeker.createJWT();

  res.status(StatusCodes.CREATED).json({
    jobSeeker: {
      name: jobSeeker.name,
      email: jobSeeker.email,
      jobSeekerCity: jobSeeker.jobSeekerCity,
      jobSeekerCountry: jobSeeker.jobSeekerCountry,
      jobType: jobSeeker.jobType,
      languages: jobSeeker.languages,
      workExperience: jobSeeker.workExperience,
      skills: jobSeeker.skills,
      education: jobSeeker.education,
      certification: jobSeeker.certification,
      token,
    },
  });
};

//Login for JobSeeker
const loginJobSeeker = async (req, res) => {
  const { email, password } = req.body;

  //Validation to check if email and password is entered by the user
  if (!email || !password) {
    throw new BadRequestError("Provide email and password");
  }

  //Check for user using email
  const jobSeeker = await JobSeeker.findOne({ email });
  //Check if user exist
  if (!jobSeeker) {
    throw new UnauthenticatedError("Invalid credentails");
  }
  //Validation for password check
  const isPasswordCorrect = await jobSeeker.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentails");
  }

  const token = jobSeeker.createJWT();
  res.status(StatusCodes.OK).json({
    jobSeeker: {
      name: jobSeeker.name,
      email: jobSeeker.email,
      jobSeekerCity: jobSeeker.jobSeekerCity,
      jobSeekerCountry: jobSeeker.jobSeekerCountry,
      jobType: jobSeeker.jobType,
      languages: jobSeeker.languages,
      workExperience: jobSeeker.workExperience,
      skills: jobSeeker.skills,
      education: jobSeeker.education,
      certification: jobSeeker.certification,
      token,
    },
  });
};

const updateUser = async (req, res) => {
  const { name, email, location } = req.body;
  if (!name || !email || !location) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.name = name;
  user.email = email;
  user.location = location;

  await user.save();

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      name: user.name,
      location: user.location,
      token,
    },
  });
};

module.exports = {
  register,
  login,
  registerJobSeeker,
  loginJobSeeker,
  updateUser,
};
