import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

const initialState = {
  isLoading: true,
  suggestJobs: [],
};

export const getSuggestJobs = createAsyncThunk(
  "suggestJobs/getSuggestJobs",
  async (_, thunkAPI) => {
    let url = "/jobSeeker/jobSuggestion";
    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${
            thunkAPI.getState().jobSeeker.jobSeeker.token
          }`,
        },
      });
      console.log("GET jobs API called");
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const jobSuggestslice = createSlice({
  name: "suggestJobs",
  initialState,
  extraReducers: {
    [getSuggestJobs.pending]: (state) => {
      state.isLoading = true;
    },
    [getSuggestJobs.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.jobSuggest = payload.jobs;
    },
    [getSuggestJobs.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export default jobSuggestslice.reducer;
