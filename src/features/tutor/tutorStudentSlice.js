// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../utils/axiosInstance";

// /*
//   API Example:
//   GET /tutor/my-students?page=1&limit=5&search=sonu&grade=5&status=active
// */

// export const fetchMyStudents = createAsyncThunk(
//   "tutorStudents/fetchMyStudents",
//   async (
//     { page = 1, search = "", grade = "", status = "" },
//     { rejectWithValue }
//   ) => {
//     try {
//       const res = await axiosInstance.get("/tutor/my-students", {
//         params: {
//           page,
//           limit: 5,
//           search,
//           grade,
//           status,
//         },
//       });

//       return res.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch students"
//       );
//     }
//   }
// );



// const tutorStudentSlice = createSlice({
//   name: "tutorStudents",
//   initialState: {
//     students: [],
//     loading: false,
//     error: null,

//     // Pagination
//     page: 1,
//     totalPages: 1,
//     total: 0,

//     // Filters
//     search: "",
//     grade: "",
//     status: "",
//   },
//   reducers: {
//     setSearch: (state, action) => {
//       state.search = action.payload;
//     },
//     setGrade: (state, action) => {
//       state.grade = action.payload;
//     },
//     setStatus: (state, action) => {
//       state.status = action.payload;
//     },
//     resetFilters: (state) => {
//       state.search = "";
//       state.grade = "";
//       state.status = "";
//       state.page = 1;
//     },
//     setPage: (state, action) => {
//       state.page = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMyStudents.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchMyStudents.fulfilled, (state, action) => {
//         state.loading = false;
//         state.students = action.payload.students;
//         state.total = action.payload.total;
//         state.totalPages = action.payload.totalPages;
//         state.page = action.payload.page;
//       })
//       .addCase(fetchMyStudents.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const {
//   setSearch,
//   setGrade,
//   setStatus,
//   resetFilters,
//   setPage,
// } = tutorStudentSlice.actions;

// export default tutorStudentSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

/*
  STUDENTS API:
  GET /tutor/my-students?page=1&limit=5&search=&grade=&status=

  COURSES API:
  GET /tutor/students/:studentId/courses?page=1&limit=5
*/

/* ===============================
   FETCH MY STUDENTS
================================= */
export const fetchMyStudents = createAsyncThunk(
  "tutorStudents/fetchMyStudents",
  async (
    { page = 1, search = "", grade = "", status = "" },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.get("/tutor/my-students", {
        params: {
          page,
          limit: 5,
          search,
          grade,
          status,
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch students"
      );
    }
  }
);

/* ===============================
   FETCH STUDENT COURSES
================================= */
export const fetchStudentCourses = createAsyncThunk(
  "tutorStudents/fetchStudentCourses",
  async ({ studentId, page = 1 }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/tutor/students/${studentId}/courses`,
        {
          params: {
            page,
            limit: 3,
          },
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch student courses"
      );
    }
  }
);

/* ===============================
   SLICE
================================= */
const tutorStudentSlice = createSlice({
  name: "tutorStudents",
  initialState: {
    /* Students */
    students: [],
    studentsPage: 1,
    studentsTotalPages: 1,
    studentsTotal: 0,

    /* Courses */
    courses: [],
    coursesPage: 1,
    coursesTotalPages: 1,
    coursesTotal: 0,

    loading: false,
    error: null,

    /* Filters */
    search: "",
    grade: "",
    status: "",
  },

  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.studentsPage = 1;
    },
    setGrade: (state, action) => {
      state.grade = action.payload;
      state.studentsPage = 1;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
      state.studentsPage = 1;
    },
    setStudentsPage: (state, action) => {
      state.studentsPage = action.payload;
    },
    setCoursesPage: (state, action) => {
      state.coursesPage = action.payload;
    },
    resetFilters: (state) => {
      state.search = "";
      state.grade = "";
      state.status = "";
      state.studentsPage = 1;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ================= STUDENTS ================= */
      .addCase(fetchMyStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyStudents.fulfilled, (state, action) => {
        state.loading = false;

        state.students = action.payload.result || [];
        state.studentsTotal = action.payload.pagination?.total || 0;
        state.studentsTotalPages =
          action.payload.pagination?.pages || 1;
        state.studentsPage =
          action.payload.pagination?.page || 1;
      })
      .addCase(fetchMyStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= COURSES ================= */
      .addCase(fetchStudentCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentCourses.fulfilled, (state, action) => {
        state.loading = false;

        state.courses = action.payload.result || [];
        state.coursesTotal =
          action.payload.pagination?.total || 0;
        state.coursesTotalPages =
          action.payload.pagination?.pages || 1;
        state.coursesPage =
          action.payload.pagination?.page || 1;
      })
      .addCase(fetchStudentCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSearch,
  setGrade,
  setStatus,
  setStudentsPage,
  setCoursesPage,
  resetFilters,
} = tutorStudentSlice.actions;

export default tutorStudentSlice.reducer;