const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/index");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  console.log(jobs);
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const userId = req.user.userId;
  const jobId = req.params.id;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`Job not found with Id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
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