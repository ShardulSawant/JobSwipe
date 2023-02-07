const mongoose = require("mongoose");

/* Job listings:
_id (unique identifier)
title (string)
company (string)
location (string)
salary (number)
job_description (string)
qualifications (array of strings)
job_type (string)
category (string)
is_active (boolean)
created_at (date) */

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide job position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["Open", "Closed", "Filled"],
      default: "Open",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
    jobCity: {
      type: String,
      required: [true, "Please provide Job city"],
    },
    jobCountry: {
      type: String,
      required: [true, "Please provide job country"],
    },
    salary: {
      type: String,
      required: [true, "Please provide Job salary"],
    },
    jobDescription: {
      type: String,
      required: [true, "Please provide Job Description"],
    },
    jobProfile: {
      type: String,
      required: [true, "Please provide Job profile"],
    },
    jobType: {
      type: String,
      enum: ["Full time", "part time", "Limited Contract"],
      default: "Full time",
    },
    jobMode: {
      type: String,
      enum: ["On-site", "Remote/Home office", "Hybrid"],
      default: "On-site",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
