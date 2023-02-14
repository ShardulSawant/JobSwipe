import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getJobSeekerFromLocalStorage,
  addJobSeekertoLocalStorage,
  removeJobSeekerFromLocalStorage,
} from "../../utils/localStoragejobseeker";
import { loginJobSeekerThunk, registerJobSeekerThunk } from "./jobSeekerThunk";

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  jobSeeker: getJobSeekerFromLocalStorage(),
};

export const registerJobSeeker = createAsyncThunk(
  "jobseeker/registerJobSeeker",
  async (jobSeeker, thunkAPI) => {
    return registerJobSeekerThunk(
      "auth/register/jobseeker",
      jobSeeker,
      thunkAPI
    );
  }
);

export const loginJobSeeker = createAsyncThunk(
  "jobseeker/loginJobSeeker",
  async (jobSeeker, thunkAPI) => {
    return loginJobSeekerThunk("/auth/login/jobseeker", jobSeeker, thunkAPI);
  }
);

const jobSeekerSlice = createSlice({
  name: "jobSeeker",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutJobSeeker: (state, { payload }) => {
      state.jobSeeker = null;
      state.isSidebarOpen = false;
      removeJobSeekerFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: {
    [registerJobSeeker.pending]: (state) => {
      state.isLoading = true;
    },
    [registerJobSeeker.fulfilled]: (state, { payload }) => {
      const { jobSeeker } = payload;
      state.isLoading = false;
      state.jobSeeker = jobSeeker;
      addJobSeekertoLocalStorage(jobSeeker);
      toast.success(`Hello there ${jobSeeker.name}`);
    },
    [registerJobSeeker.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [loginJobSeeker.pending]: (state) => {
      state.isLoading = true;
    },
    [loginJobSeeker.fulfilled]: (state, { payload }) => {
      const { jobSeeker } = payload;
      state.isLoading = false;
      state.jobSeeker = jobSeeker;
      console.log(jobSeeker);
      addJobSeekertoLocalStorage(jobSeeker);
      toast.success(`Welcome back ${jobSeeker.name}`);
    },
    [loginJobSeeker.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { toggleSidebar, logoutJobSeeker } = jobSeekerSlice.actions;

export default jobSeekerSlice.reducer;
