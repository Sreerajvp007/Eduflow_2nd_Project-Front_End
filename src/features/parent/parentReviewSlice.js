import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance";

/* ---------------- ADD REVIEW ---------------- */

export const submitReview = createAsyncThunk(
  "reviews/submitReview",
  async (payload, { rejectWithValue }) => {
    try {

      const res = await api.post("/parent/reviews", payload);

      return res.data;

    } catch (err) {

      return rejectWithValue(err.response?.data?.message);

    }
  }
);

/* ---------------- REPORT TUTOR ---------------- */

export const reportTutor = createAsyncThunk(
  "reviews/reportTutor",
  async (payload, { rejectWithValue }) => {
    try {

      const res = await api.post("/parent/reports", payload);

      return res.data;

    } catch (err) {

      return rejectWithValue(err.response?.data?.message);

    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",

  initialState: {
    loading: false,
    success: false,
    error: null
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(submitReview.pending, (state) => {
        state.loading = true;
      })

      .addCase(submitReview.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(submitReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(reportTutor.pending, (state) => {
        state.loading = true;
      })

      .addCase(reportTutor.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(reportTutor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  }

});

export default reviewSlice.reducer;