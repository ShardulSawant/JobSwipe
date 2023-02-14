import customFetch from "../../utils/axios";
//import { logoutJobSeeker } from "./jobSeekerslice";

export const registerJobSeekerThunk = async (url, jobSeeker, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, jobSeeker);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginJobSeekerThunk = async (url, jobSeeker, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, jobSeeker);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

/* export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, user, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    console.log("User update API called");
    return resp.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Unauthorized User ! Logging out...");
    }
    console.log(error.response);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
}; */
