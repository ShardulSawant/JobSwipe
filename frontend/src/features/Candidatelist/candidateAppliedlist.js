import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

const initialFiltersState = {
  search: "",
  jobPosition: "All",
};

const initialState = {
  isLoading: true,
  jobseekerlist: [],
  totalCandidates: 0,
  numOfPages: 3,
  page: 1,
  ...initialFiltersState,
};

export const getallCandidates = async (_, thunkAPI) => {
  try {
    console.log(thunkAPI.getState().user.user.token);
    /* const resp = await customFetch.get("/jobs/jobApplicants", {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    }); */
  } catch (error) {}
};

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
      state.jobseekerlist = payload.jobseekerlist;
      state.numOfPages = payload.numOfPages;
      state.totalJobs = payload.totalJobs;
    },
    [getallCandidates.rejected]: (state, { payload }) => {
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
