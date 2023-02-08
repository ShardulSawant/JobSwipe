const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/index");

const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  // code for search funcationality for the job position

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  //code for filtering the data based on status and job type

  if (status && status !== "All") {
    queryObject.status = status;
  }
  if (jobType && jobType !== "All") {
    queryObject.jobType = jobType;
  }

  let result = Job.find(queryObject);
  //console.log(result);

  //code for sort functionality
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  //code for pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  //console.log(result);

  const jobs = await result;
  //console.log(jobs);

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  //console.log(jobs);
  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};

const getJob = async (req, res) => {
  const userId = req.user.userId;
  const jobId = req.params.id;

  const job = Job.find();
  if (!job) {
    throw new NotFoundError(`Job not found with Id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  // console.log(req.body);
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const userId = req.user.userId;
  const jobId = req.params.id;

  const {
    body: {
      company,
      position,
      jobLocation,
      salary,
      jobDescription,
      jobProfile,
      jobType,
    },
  } = req;

  console.log({
    company,
    position,
    jobLocation,
    salary,
    jobDescription,
    jobProfile,
    jobType,
  });

  if (
    !company === "" ||
    !position === "" ||
    !jobLocation === "" ||
    !salary === "" ||
    !jobDescription === "" ||
    !jobProfile === "" ||
    !jobType === ""
  ) {
    throw new BadRequestError("Fields are missing");
  }

  const updatedJob = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedJob) {
    throw new NotFoundError(`Job not found with Id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ updatedJob });
};

const deleteJob = async (req, res) => {
  const userId = req.user.userId;
  const jobId = req.params.id;

  const deletedJob = await Job.findByIdAndDelete({
    _id: jobId,
    createdBy: userId,
  });

  if (!deletedJob) {
    throw new NotFoundError(`Job not found with Id ${jobId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
