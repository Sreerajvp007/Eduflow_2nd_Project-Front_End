import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance";

export const fetchParentStudents = createAsyncThunk(
  "parentStudents/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/parent/students");
      return res.data.result;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch students",
      );
    }
  },
);

export const addStudent = createAsyncThunk(
  "parentStudents/addStudent",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/parent/students", data);

      return res.data.result;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add student",
      );
    }
  },
);

export const updateStudent = createAsyncThunk(
  "parentStudents/updateStudent",
  async ({ studentId, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/parent/students/${studentId}`, data);
      return res.data.result;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update student",
      );
    }
  },
);

const parentStudentsSlice = createSlice({
  name: "parentStudents",
  initialState: {
    students: [],
    activeStudent: null,
    loading: false,
    error: null,
  },

  reducers: {
    setActiveStudent: (state, action) => {
      state.activeStudent = action.payload;

      if (action.payload?._id) {
        localStorage.setItem("activeStudentId", action.payload._id);
      }
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchParentStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchParentStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;

        const savedId = localStorage.getItem("activeStudentId");

        if (savedId) {
          const found = action.payload.find((s) => s._id === savedId);
          state.activeStudent = found || action.payload[0] || null;
        } else {
          state.activeStudent =
            action.payload.length > 0 ? action.payload[0] : null;
        }
      })

      .addCase(fetchParentStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;

        state.students.push(action.payload);

        state.activeStudent = action.payload;

        localStorage.setItem("activeStudentId", action.payload._id);
      })

      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(
          (s) => s._id === action.payload._id,
        );

        if (index !== -1) {
          state.students[index] = action.payload;
        }

        if (state.activeStudent?._id === action.payload._id) {
          state.activeStudent = action.payload;
        }
      });
  },
});

export const { setActiveStudent } = parentStudentsSlice.actions;

export default parentStudentsSlice.reducer;
