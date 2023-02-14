const mongoose = require("mongoose");

const JobMatchSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Types.ObjectId,
      ref: "Job",
      required: [true, "Please provide a job post Id"],
    },
    jobSeekerId: {
      type: mongoose.Types.ObjectId,
      ref: "JobSeeker",
      required: [true, "Please provide a job Seeker Id"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobMatch", JobMatchSchema);
