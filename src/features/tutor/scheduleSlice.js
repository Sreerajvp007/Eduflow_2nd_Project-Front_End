import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const fetchSchedule = createAsyncThunk(
  "schedule/fetch",
  async () => {
    const { data } = await axiosInstance.get("/tutor/schedule");
    return data;
  }
);

export const createSessionAsync = createAsyncThunk(
  "schedule/createSession",
  async (payload) => {
    const { data } = await axiosInstance.post(
      "tutor/schedule/session",
      payload
    );
    return data;
  }
);

const slice = createSlice({
  name: "schedule",
  initialState: {
    availability: [],
    courses: [],
    sessions: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedule.fulfilled, (state, action) => {
        state.availability = action.payload.availability;
        state.courses = action.payload.courses;
        state.sessions = action.payload.sessions;
      })
      .addCase(createSessionAsync.fulfilled, (state, action) => {
        state.sessions.push(action.payload);
      });
  },
});

export default slice.reducer;