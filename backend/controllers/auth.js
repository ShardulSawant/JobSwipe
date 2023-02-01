const User = require("../models/User");
const JobSeeker = require("../models/JobSeeker");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");

//Register for Company
const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
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
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

//Regsiter for Job seeker
const registerJobSeeker = async (req, res) => {
  const jobseeker = await JobSeeker.create({ ...req.body });

  const token = jobseeker.createJWT();

  res
    .status(StatusCodes.CREATED)
    .json({ jobseeker: { name: jobseeker.name }, token });
};

//Login for JobSeeker
const loginJobSeeker = async (req, res) => {
  const { email, password } = req.body;

  //Validation to check if email and password is entered by the user
  if (!email || !password) {
    throw new BadRequestError("Provide email and password");
  }

  //Check for user using email
  const jobseeker = await JobSeeker.findOne({ email });

  //Check if user exist
  if (!jobseeker) {
    throw new UnauthenticatedError("Invalid credentails");
  }

  //Validation for password check
  const isPasswordCorrect = await jobseeker.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentails");
  }

  const token = jobseeker.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ jobseeker: { name: jobseeker.name }, token });
};

module.exports = { register, login, registerJobSeeker, loginJobSeeker };
