import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance";

export const fetchClasses = createAsyncThunk(
  "adminClasses/fetchClasses",
  async () => {
    const res = await api.get("/admin/classes");

    return res.data.result;
  },
);

export const createClass = createAsyncThunk(
  "adminClasses/createClass",
  async (data) => {
    const res = await api.post("/admin/classes", data);

    return res.data.result;
  },
);

export const updateSubjectsForBoard = createAsyncThunk(
  "adminClasses/updateSubjects",
  async ({ classId, board, subjects }) => {
    const res = await api.put(`/admin/classes/${classId}/subjects`, {
      board,
      subjects,
    });

    return res.data.result;
  },
);

export const deleteClass = createAsyncThunk(
  "adminClasses/deleteClass",
  async (id) => {
    await api.delete(`/admin/classes/${id}`);

    return id;
  },
);

const adminClassSlice = createSlice({
  name: "adminClasses",

  initialState: {
    list: [],
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchClasses.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      .addCase(createClass.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      .addCase(updateSubjectsForBoard.fulfilled, (state, action) => {
        const index = state.list.findIndex((c) => c._id === action.payload._id);

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(deleteClass.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c._id !== action.payload);
      });
  },
});

export default adminClassSlice.reducer;
