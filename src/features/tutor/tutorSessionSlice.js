import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";

export const fetchTutorSessions = createAsyncThunk(
  "tutorSessions/fetch",
  async ({ page = 1, status = "all", search = "" }) => {
    const res = await axios.get("/tutor/sessions", {
      params: { page, status, search },
    });

    return res.data;
  },
);

export const startTutorSession = createAsyncThunk(
  "tutorSessions/start",
  async (sessionId) => {
    const res = await axios.put(`/tutor/sessions/start/${sessionId}`);
    return res.data.result;
  },
);

export const endTutorSession = createAsyncThunk(
  "tutorSessions/end",
  async (sessionId) => {
    const res = await axios.put(`/tutor/sessions/end/${sessionId}`);
    return res.data.result;
  },
);

const tutorSessionSlice = createSlice({
  name: "tutorSessions",

  initialState: {
    sessions: [],
    loading: false,
    page: 1,
    totalPages: 1,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchTutorSessions.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchTutorSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload.sessions;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })

      .addCase(fetchTutorSessions.rejected, (state) => {
        state.loading = false;
      })

      .addCase(startTutorSession.fulfilled, (state, action) => {
        const index = state.sessions.findIndex(
          (s) => s._id === action.payload._id,
        );

        if (index !== -1) {
          state.sessions[index].status = "live";
        }
      })

      .addCase(endTutorSession.fulfilled, (state, action) => {
        const index = state.sessions.findIndex(
          (s) => s._id === action.payload._id,
        );

        if (index !== -1) {
          state.sessions[index].status = "completed";
        }
      });
  },
});

export default tutorSessionSlice.reducer;
