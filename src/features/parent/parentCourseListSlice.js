// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../utils/axiosInstance";

// export const fetchParentCourses = createAsyncThunk(
//   "parentCourses/fetch",
//   async (studentId, thunkAPI) => {
//     try {
//       const res = await axiosInstance.get(
//         `/parent/courses?studentId=${studentId}`,
//       );
//       return res.data.result;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message);
//     }
//   },
// );

// export const fetchParentCourseOverview = createAsyncThunk(
//   "parentCourses/fetchOverview",
//   async (courseId, thunkAPI) => {
//     try {
//       const res = await axiosInstance.get(
//         `/parent/courses/${courseId}/overview`,
//       );
//       return res.data.result;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message);
//     }
//   },
// );

// const parentCourseListSlice = createSlice({
//   name: "parentCourses",
//   initialState: {
//     courses: [],
//     selectedCourse: null,
//     sessions: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearSelectedCourse: (state) => {
//       state.selectedCourse = null;
//       state.sessions = [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder

//       .addCase(fetchParentCourses.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchParentCourses.fulfilled, (state, action) => {
//         state.loading = false;
//         state.courses = action.payload;
//       })
//       .addCase(fetchParentCourses.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(fetchParentCourseOverview.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchParentCourseOverview.fulfilled, (state, action) => {
//         state.loading = false;
//         state.selectedCourse = action.payload.course;
//         state.sessions = action.payload.sessions;
//       })
//       .addCase(fetchParentCourseOverview.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearSelectedCourse } = parentCourseListSlice.actions;

// export default parentCourseListSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

/* ===============================
   FETCH COURSES (WITH PAGINATION)
================================ */
export const fetchParentCourses = createAsyncThunk(
  "parentCourses/fetch",
  async ({ studentId, page = 1 }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `/parent/courses`,
        {
          params: {
            studentId,
            page,
            limit: 3,
          },
        }
      );

      return res.data; // returning full response now
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message
      );
    }
  }
);

/* ===============================
   FETCH COURSE OVERVIEW (UNCHANGED)
================================ */
export const fetchParentCourseOverview = createAsyncThunk(
  "parentCourses/fetchOverview",
  async (courseId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `/parent/courses/${courseId}/overview`,
      );
      return res.data.result;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message
      );
    }
  },
);

const parentCourseListSlice = createSlice({
  name: "parentCourses",

  initialState: {
    courses: [],
    selectedCourse: null,
    sessions: [],
    loading: false,
    error: null,

    /* ✅ Added pagination state */
    page: 1,
    totalPages: 1,
    total: 0,
  },

  reducers: {
    clearSelectedCourse: (state) => {
      state.selectedCourse = null;
      state.sessions = [];
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===============================
         COURSE LIST
      ================================ */
      .addCase(fetchParentCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParentCourses.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ Update to support pagination response
        state.courses = action.payload.result;

        if (action.payload.pagination) {
          state.total = action.payload.pagination.total;
          state.page = action.payload.pagination.page;
          state.totalPages = action.payload.pagination.pages;
        }
      })
      .addCase(fetchParentCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===============================
         COURSE OVERVIEW (UNCHANGED)
      ================================ */
      .addCase(fetchParentCourseOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParentCourseOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCourse = action.payload.course;
        state.sessions = action.payload.sessions;
      })
      .addCase(fetchParentCourseOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedCourse } = parentCourseListSlice.actions;

export default parentCourseListSlice.reducer;