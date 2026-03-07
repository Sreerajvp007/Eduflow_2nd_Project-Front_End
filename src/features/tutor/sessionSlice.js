
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";



export const fetchSessions = createAsyncThunk(
  "sessions/fetchSessions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/tutor/sessions");
      return res.data.result;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch sessions"
      );
    }
  }
);



export const createSession = createAsyncThunk(
  "sessions/createSession",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/tutor/sessions/create", data);
      return res.data.result;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to create session"
      );
    }
  }
);



export const cancelSession = createAsyncThunk(
  "sessions/cancelSession",
  async (sessionId, { rejectWithValue }) => {
    try {
      await axios.patch(`/tutor/sessions/${sessionId}/cancel`);
      return sessionId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to cancel session"
      );
    }
  }
);



export const deleteSession = createAsyncThunk(
  "sessions/deleteSession",
  async (sessionId, { rejectWithValue }) => {
    try {
      await axios.delete(`/tutor/sessions/${sessionId}`);
      return sessionId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete session"
      );
    }
  }
);



export const fetchAvailability = createAsyncThunk(
  "sessions/fetchAvailability",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/tutor/availability");
      return res.data.result;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch availability"
      );
    }
  }
);



export const fetchTutorStudents = createAsyncThunk(
  "sessions/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/tutor/students");
      return res.data.result;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch students"
      );
    }
  }
);



export const blockAvailability = createAsyncThunk(
  "sessions/blockSlot",
  async (time, { rejectWithValue }) => {
    try {
      const res = await axios.post("/tutor/availability/block", { time });
      return res.data.result;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to block slot"
      );
    }
  }
);




export const unblockAvailability = createAsyncThunk(
  "sessions/unblockSlot",
  async (time, { rejectWithValue }) => {
    try {
      const res = await axios.post("/tutor/availability/unblock", { time });
      return res.data.result;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to unblock slot"
      );
    }
  }
);



const sessionSlice = createSlice({
  name: "sessions",

  initialState: {
    sessions: [],
    availability: [],
    students: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    

    builder.addCase(fetchSessions.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchSessions.fulfilled, (state, action) => {
      state.loading = false;
      state.sessions = action.payload;
    });

    builder.addCase(fetchSessions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  

    builder.addCase(createSession.fulfilled, (state, action) => {
      state.sessions.push(action.payload);
    });

    

    builder.addCase(cancelSession.fulfilled, (state, action) => {
      const session = state.sessions.find(
        (s) => s._id === action.payload
      );

      if (session) {
        session.status = "cancelled";
      }
    });

 

    builder.addCase(deleteSession.fulfilled, (state, action) => {
      state.sessions = state.sessions.filter(
        (s) => s._id !== action.payload
      );
    });

    

    builder.addCase(fetchAvailability.fulfilled, (state, action) => {
      state.availability = action.payload.availability;
    });

    

    builder.addCase(fetchTutorStudents.fulfilled, (state, action) => {
      state.students = action.payload;
    });

   

    builder.addCase(blockAvailability.fulfilled, (state, action) => {
      state.availability = action.payload;
    });

  

    builder.addCase(unblockAvailability.fulfilled, (state, action) => {
      state.availability = action.payload;
    });
  },
});

export default sessionSlice.reducer;