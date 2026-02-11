import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance";

/* ================= THUNKS ================= */

// LIST TUTORS
export const fetchTutors = createAsyncThunk(
  "adminTutors/fetch",
  async (params) => {
    const res = await api.get("/admin/tutors", {
      params,
    });
    return res.data;
  }
);

// TUTOR DETAILS
export const fetchTutorDetails = createAsyncThunk(
  "adminTutors/details",
  async (id) => {
    const res = await api.get(`/admin/tutors/${id}`);
    return res.data.result;
  }
);

// UPDATE STATUS
export const updateTutorStatus = createAsyncThunk(
  "adminTutors/updateStatus",
  async ({ id, status }) => {
    const res = await api.patch(`/admin/tutors/${id}/status`, {
      status,
    });
    return { id, status };
  }
);

/* ================= SLICE ================= */

const adminTutorSlice = createSlice({
  name: "adminTutors",
  initialState: {
    list: [],
    details: null,   // 👈 IMPORTANT
    loading: false,
    pagination: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ===== LIST ===== */
      .addCase(fetchTutors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTutors.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.result;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchTutors.rejected, (state) => {
        state.loading = false;
      })

      /* ===== DETAILS (THIS IS WHAT YOU ASKED) ===== */
      .addCase(fetchTutorDetails.pending, (state) => {
        state.loading = true;
        state.details = null;
      })
      .addCase(fetchTutorDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;   // ✅ HERE
      })
      .addCase(fetchTutorDetails.rejected, (state) => {
        state.loading = false;
      })

      /* ===== UPDATE STATUS ===== */
      .addCase(updateTutorStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;

        const tutor = state.list.find((t) => t._id === id);
        if (tutor) tutor.status = status;

        if (state.details?._id === id) {
          state.details.status = status;
        }
      });
  },
});

export default adminTutorSlice.reducer;
