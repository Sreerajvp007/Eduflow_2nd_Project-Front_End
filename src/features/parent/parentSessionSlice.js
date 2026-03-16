import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";

export const fetchParentSessions = createAsyncThunk(
  "parentSessions/fetch",
  async ({ status }) => {

    const res = await axios.get("/parent/sessions", {
      params: { status }
    });

    return res.data.sessions;
  }
);

const parentSessionSlice = createSlice({
  name: "parentSessions",

  initialState: {
    sessions: [],
    loading: false,
  },

  extraReducers: (builder) => {

    builder
      .addCase(fetchParentSessions.pending,(state)=>{
        state.loading = true;
      })

      .addCase(fetchParentSessions.fulfilled,(state,action)=>{
        state.loading = false;
        state.sessions = action.payload;
      })

      .addCase(fetchParentSessions.rejected,(state)=>{
        state.loading = false;
      });
  }
});

export default parentSessionSlice.reducer;