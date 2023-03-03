const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getAllJobPositions,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  getAllLikedJobs,
} = require("../controllers/jobs");

router.route("/").post(createJob).get(getAllJobs);
router.route("/jobPositons").get(getAllJobPositions);
router.route("/jobApplicants").get(getAllLikedJobs);
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);

module.exports = router;
