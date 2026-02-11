import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance";

/* ================= THUNKS ================= */

export const fetchStudents = createAsyncThunk(
  "adminStudents/fetch",
  async (params) => {
    const { data } = await api.get("/admin/students", { params });
    return data;
  }
);

export const fetchStudentDetails = createAsyncThunk(
  "adminStudents/details",
  async (id) => {
    const { data } = await api.get(`/admin/students/${id}`);
    return data.result;
  }
);

/* ================= SLICE ================= */

const studentSlice = createSlice({
  name: "adminStudents",
  initialState: {
    list: [],
    pagination: {},
    details: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.result;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchStudentDetails.fulfilled, (state, action) => {
        state.details = action.payload;
      });
  },
});

export default studentSlice.reducer;
