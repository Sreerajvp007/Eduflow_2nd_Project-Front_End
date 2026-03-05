

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

/*
====================================
FETCH TUTOR REVIEWS
====================================
*/

export const fetchTutorReviews = createAsyncThunk(
  "feedback/fetchTutorReviews",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/tutor/reviews", {
        params,
      });

      return res.data.result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tutor reviews"
      );
    }
  }
);

/*
====================================
FETCH ADMIN REVIEWS
====================================
*/

export const fetchAdminReviews = createAsyncThunk(
  "feedback/fetchAdminReviews",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/admin/feedback/reviews", {
        params,
      });

      return res.data.result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch admin reviews"
      );
    }
  }
);

/*
====================================
FETCH ADMIN REPORTS
====================================
*/

export const fetchAdminReports = createAsyncThunk(
  "feedback/fetchAdminReports",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/admin/feedback/reports", {
        params,
      });

      return res.data.result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch admin reports"
      );
    }
  }
);

/*
====================================
INITIAL STATE
====================================
*/

const initialState = {
  reviews: [],
  reports: [],

  avgRating: 0,
  totalReviews: 0,

  totalPages: 1,
  currentPage: 1,

  loading: false,
  error: null,
};

/*
====================================
SLICE
====================================
*/

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,

  reducers: {
    clearFeedbackState: (state) => {
      state.reviews = [];
      state.reports = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /*
      ============================
      TUTOR REVIEWS
      ============================
      */

      .addCase(fetchTutorReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTutorReviews.fulfilled, (state, action) => {
        state.loading = false;

        state.reviews = action.payload.reviews;
        state.avgRating = action.payload.avgRating;
        state.totalReviews = action.payload.totalReviews;

        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })

      .addCase(fetchTutorReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /*
      ============================
      ADMIN REVIEWS
      ============================
      */

      .addCase(fetchAdminReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminReviews.fulfilled, (state, action) => {
        state.loading = false;

        state.reviews = action.payload.reviews;
        state.totalReviews = action.payload.totalReviews;

        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })

      .addCase(fetchAdminReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /*
      ============================
      ADMIN REPORTS
      ============================
      */

      .addCase(fetchAdminReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminReports.fulfilled, (state, action) => {
        state.loading = false;

        state.reports = action.payload.reports;

        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })

      .addCase(fetchAdminReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFeedbackState } = feedbackSlice.actions;

export default feedbackSlice.reducer;