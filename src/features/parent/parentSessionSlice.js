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
     initialLoading: true
  },

  extraReducers: (builder) => {

    builder
     .addCase(fetchParentSessions.pending,(state)=>{
  if (state.initialLoading) {
    state.loading = true; // only first time
  }
})

.addCase(fetchParentSessions.fulfilled,(state,action)=>{
  state.loading = false;
  state.initialLoading = false; // 👈 important
  state.sessions = action.payload;
})

.addCase(fetchParentSessions.rejected,(state)=>{
  state.loading = false;
  state.initialLoading = false;
});
  }
});

export default parentSessionSlice.reducer;