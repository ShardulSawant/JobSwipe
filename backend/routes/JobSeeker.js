const express = require("express");
const router = express.Router();

const {
  getJobSuggesion,
  postJobLiked,
  postJobDisliked,
} = require("../controllers/JobSeeker");

router.route("/jobSuggestion").get(getJobSuggesion);
router.route("/jobSeekerLiked").post(postJobLiked);
router.route("/jobSeekerDisliked").post(postJobDisliked);

module.exports = router;
