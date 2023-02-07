import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
// import { getUserFromLocalStorage } from "../../utils/localStorage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { createJobThunk } from "./jobThunk";
import { logoutUser } from "../users/userSlice";

const initialState = {
  isLoading: false,
  company: "",
  position: "",
  statusOptions: ["Open", "Closed", "Filled"],
  status: "Open",
  jobCity: "",
  jobCountry: "",
  salary: "",
  jobDescription: "",
  jobProfile: "",
  jobTypeOptions: ["Full time", "part time", "Limited Contract"],
  jobType: "Full time",
  jobModeOptions: ["On-site", "Remote/Home office", "Hybrid"],
  jobMode: "On-site",
  isEditing: false,
  editJobId: "",
};

export const createJob = createAsyncThunk(
  "job/createJob",
  async (job, thunkAPI) => {
    console.log({ job });
    try {
      const resp = await customFetch.post("/jobs", job, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      console.log("Add job API called");
      thunkAPI.dispatch(clearValues);
      return resp.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue("Unauthorized User ! Logging out...");
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return initialState;
    },
  },
  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      toast.success(`New Job post created`);
    },
    [createJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { handleChange, clearValues } = jobSlice.actions;

export default jobSlice.reducer;
