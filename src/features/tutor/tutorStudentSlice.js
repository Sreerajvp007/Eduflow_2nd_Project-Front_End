
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";




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
          limit: 1,
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


const tutorStudentSlice = createSlice({
  name: "tutorStudents",
  initialState: {
 
    students: [],
    studentsPage: 1,
    studentsTotalPages: 1,
    studentsTotal: 0,

 
    courses: [],
    coursesPage: 1,
    coursesTotalPages: 1,
    coursesTotal: 0,

    loading: false,
    error: null,

  
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