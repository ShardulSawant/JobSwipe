const User = require("../models/User");
const JobSeeker = require("../models/JobSeeker");
const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/index");

const getJobSuggesion = async (req, res) => {
  const jobSeekerId = req.jobSeeker.jobSeekerId;
  try {
    if (!jobSeekerId) {
      throw new BadRequestError("Job Seeker Id is missing");
    }
    const jobseeker = await JobSeeker.findById(jobSeekerId);

    if (!jobseeker) {
      throw new BadRequestError("Job seeker not found");
    }

    const jobseekerSkills = jobseeker.skills;
    //console.log(jobseekerSkills.join(" "));

    const jobs = await Job.find(
      {
        $text: { $search: jobseekerSkills.join(" ") },
        $and: [
          { _id: { $nin: jobseeker.liked } },
          { _id: { $nin: jobseeker.disliked } },
        ],
      },
      {
        score: { $meta: "textScore" },
      }
    )
      .sort({
        score: { $meta: "textScore" },
      })
      .limit(10);
    if (jobs.length <= 0) {
      throw new BadRequestError("No Jobs found");
    } else {
      res.status(StatusCodes.OK).json({ jobs });
    }
  } catch (error) {
    throw new BadRequestError(error);
  }
};

const postJobLiked = async (req, res) => {
  const jobSeekerId = req.jobSeeker.jobSeekerId;
  const jobId = req.body.jobId;
  console.log("postJobLiked");
  try {
    var jobSeekerData, jobData;
    //Fetch jobSeeker and job post data
    jobSeekerData = await JobSeeker.findById(jobSeekerId);
    //push the liked data
    jobSeekerData.liked.push(jobId);
    //console.log(jobSeekerData);
    //update data with liked job
    await JobSeeker.findOneAndUpdate(
      {
        $and: [{ _id: jobSeekerId }, { liked: { $ne: jobId } }],
      },
      jobSeekerData
    );
    res.status(StatusCodes.OK).send("Job post liked by user");
  } catch (error) {
    throw new BadRequestError(error);
  }
};

const postJobDisliked = async (req, res) => {
  const jobSeekerId = req.jobSeeker.jobSeekerId;
  const jobId = req.body.jobId;
  console.log("postJobDisliked");
  try {
    var jobSeekerData, jobData;
    //Fetch jobSeeker and job post data
    jobSeekerData = await JobSeeker.findById(jobSeekerId);
    //push the liked data
    jobSeekerData.disliked.push(jobId);
    //console.log(jobSeekerData);
    //update data with liked job
    await JobSeeker.findOneAndUpdate(
      {
        $and: [{ _id: jobSeekerId }, { disliked: { $ne: jobId } }],
      },
      jobSeekerData
    );
    res.status(StatusCodes.OK).send("Job post disliked by user");
  } catch (error) {
    throw new BadRequestError(error);
  }
};

module.exports = {
  getJobSuggesion,
  postJobLiked,
  postJobDisliked,
};
