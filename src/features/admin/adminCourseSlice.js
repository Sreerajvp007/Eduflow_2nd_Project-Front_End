import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../api/adminApi";

export const fetchRecentCourses = createAsyncThunk(
  "adminCourses/fetchRecent",
  async () => {
    const res = await adminApi.get("/courses/recent");
    return res.data.result;
  }
);

const adminCourseSlice = createSlice({
  name: "adminCourses",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecentCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      });
  },
});

export default adminCourseSlice.reducer;
