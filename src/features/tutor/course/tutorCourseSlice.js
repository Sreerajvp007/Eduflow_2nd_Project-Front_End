import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axiosInstance";

export const fetchTutorCourses = createAsyncThunk(
  "tutorCourses/fetchManaged",
  async ({ page = 1, search = "", status = "all" }, { rejectWithValue }) => {
    try {
      const res = await api.get("/tutor/courses", {
        params: {
          page,
          limit: 3,
          search,
          status,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

export const fetchNewTutorCourses = createAsyncThunk(
  "tutorCourses/fetchNew",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/tutor/new-courses");
      return res.data.result;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

export const fetchTutorCourseById = createAsyncThunk(
  "tutorCourses/fetchById",
  async (courseId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/tutor/courses/${courseId}`);
      return res.data.result;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

export const saveLearningPlan = createAsyncThunk(
  "tutorCourses/savePlan",
  async ({ courseId, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(
        `/tutor/courses/${courseId}/learning-plan`,
        data,
      );
      return res.data.result;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

export const markCourseCompleted = createAsyncThunk(
  "tutorCourses/markCompleted",
  async (courseId, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/tutor/courses/${courseId}/complete`);
      return res.data.result;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

const tutorCourseSlice = createSlice({
  name: "tutorCourses",
  initialState: {
  courses: [],
  newCourses: [],
  selectedCourse: null,
  loading: false,
  error: null,

  page: 1,
  totalPages: 1,
  total: 0,
},
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchTutorCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTutorCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.result;
state.page = action.payload.pagination.page;
state.totalPages = action.payload.pagination.pages;
state.total = action.payload.pagination.total;
      })
      .addCase(fetchTutorCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchNewTutorCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewTutorCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.newCourses = action.payload;
      })
      .addCase(fetchNewTutorCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTutorCourseById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTutorCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCourse = action.payload;
      })
      .addCase(fetchTutorCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveLearningPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveLearningPlan.fulfilled, (state, action) => {
        state.loading = false;

        const updated = action.payload;

        state.selectedCourse = updated;

        state.newCourses = state.newCourses.filter(
          (c) => c._id !== updated._id,
        );

        const index = state.courses.findIndex((c) => c._id === updated._id);

        if (index !== -1) {
          state.courses[index] = updated;
        } else {
          state.courses.unshift(updated);
        }
      })
      .addCase(saveLearningPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(markCourseCompleted.pending, (state) => {
        state.loading = true;
      })
      .addCase(markCourseCompleted.fulfilled, (state, action) => {
        state.loading = false;

        const updated = action.payload;

        state.selectedCourse = updated;

        const index = state.courses.findIndex((c) => c._id === updated._id);

        if (index !== -1) {
          state.courses[index] = updated;
        }
      })
      .addCase(markCourseCompleted.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tutorCourseSlice.reducer;
