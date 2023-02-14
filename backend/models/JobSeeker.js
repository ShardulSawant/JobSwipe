const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Company model schema
/* Job seekers:
_id (unique identifier)
name (string)
email (string)
password (string)
resume (string)
skills (array of strings)
location (string)
job_type (string)
category (string)
created_at (date) */

const JobSeekerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide Jobseeker name"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Please provide Job Seeker email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
    },
    jobSeekerCity: {
      type: String,
      required: [true, "Please provide Jobseeker city"],
    },
    jobSeekerCountry: {
      type: String,
      required: [true, "Please provide Jobseeker country"],
    },
    jobType: {
      type: String,
      enum: ["Full time", "part time", "Limited Contract"],
      default: "Full time",
    },
    languages: [
      {
        language: {
          type: String,
          required: [true, "Please provide job seekers language"],
          default: "English",
        },
        level: {
          type: String,
          enum: ["A1", "A2", "B1", "B2"],
          default: "A1",
        },
      },
    ],
    workExperience: {
      type: String,
    },
    skills: [
      {
        type: String,
        required: [true, "Please provide skills"],
      },
    ],
    education: [
      {
        degree: {
          type: String,
          required: [true, "Please provide degree"],
        },
        fieldOfStudy: {
          type: String,
          required: [true, "Please provide field of study"],
        },
      },
    ],
    certification: [{ type: String }],
    liked: [],
    disliked: [],
  },

  { timestamps: true }
);

JobSeekerSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

JobSeekerSchema.methods.createJWT = function () {
  return jwt.sign(
    { jobSeekerId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

JobSeekerSchema.methods.comparePassword = async function (candidatePassword) {
  console.log(candidatePassword);
  console.log(this.password);
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("JobSeeker", JobSeekerSchema);
