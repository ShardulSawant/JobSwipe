import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/users/userSlice";
import jobSlice from "./features/job/jobSlice";
import allJobsSlice from "./features/allJobs/allJobsSlice";
import jobSeekerslice from "./features/jobSeeker/jobSeekerslice";
import allCandidatesslice from "./features/Candidatelist/candidateAppliedlist";

export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: allJobsSlice,
    jobSeeker: jobSeekerslice,
    allCandidates: allCandidatesslice,
  },
});
