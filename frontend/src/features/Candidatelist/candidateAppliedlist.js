import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

const initialFiltersState = {
  search: "",
  jobPosition: "All",
  jobPositionId: "",
};

const initialState = {
  isLoading: true,
  jobPositionOptions: [],
  candidateList: [],
  totalCandidates: 0,
  numOfPages: 3,
  page: 1,
  ...initialFiltersState,
};

export const getallCandidates = createAsyncThunk(
  "allCandidates/getAllCandidates",
  async (_, thunkAPI) => {
    const { page, search, jobPosition } = thunkAPI.getState().allCandidates;
    //console.log(jobPosition);
    try {
      let url = `/jobs/jobApplicants?jobPosition=${jobPosition}`;
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      console.log("candidate API called");
      //console.log(resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const postShortlistCandidate = createAsyncThunk(
  "allCandidates/postShortlistCandidate",
  async ({ jobSeekerId }, thunkAPI) => {
    const jobPosition = thunkAPI.getState().allCandidates;
    try {
      // const resp = await customFetch.get(
      //   "/jobs/RejectCandidate",
      //   { jobSeekerId, JobPosition },
      //   {
      //     headers: {
      //       authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      //     },
      //   }
      // );
      console.log(jobSeekerId);
      console.log(jobPosition);
      console.log("Shorlisted Candidate API called");
      //return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const postRejectCandidate = createAsyncThunk(
  "allCandidates/postRejectCandidate",
  async ({ jobSeekerId }, thunkAPI) => {
    const jobPosition = thunkAPI.getState().allCandidates.jobPosition;
    try {
      // const resp = await customFetch.get(
      //   "/jobs/RejectCandidate",
      //   { jobSeekerId, JobPosition },
      //   {
      //     headers: {
      //       authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      //     },
      //   }
      // );
      console.log("Reject Candidate API called");
      console.log(jobSeekerId);
      console.log(jobPosition);
      //return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getAllJobPositions = createAsyncThunk(
  "/jobs/jobPositons",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("/jobs/jobPositons", {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      console.log("job position API called");
      //console.log(resp.data.jobPositions);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const allCandidates = createSlice({
  name: "allCandidates",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearallCandidatesState: (state) => initialState,
  },
  extraReducers: {
    [getallCandidates.pending]: (state) => {
      state.isLoading = true;
    },
    [getallCandidates.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.candidateList = payload.jobSeekerArray;
      state.numOfPages = payload.numOfPages;
      state.totalJobs = payload.totalJobs;
    },
    [getallCandidates.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [getAllJobPositions.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllJobPositions.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.jobPositionOptions = payload.jobPositions;
    },
    [getAllJobPositions.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [postRejectCandidate.pending]: (state) => {
      state.isLoading = true;
    },
    [postRejectCandidate.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Candidate rejected");
    },
    [postRejectCandidate.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllJobSeekerState,
} = allCandidates.actions;

export default allCandidates.reducer;
