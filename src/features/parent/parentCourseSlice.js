
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance";



export const fetchSubjects = createAsyncThunk(
  "parentCourse/fetchSubjects",
  async ({ studentId }, { rejectWithValue }) => {
    try {
      const res = await api.get(`/parent/students/${studentId}/subjects`);
      return res.data.result;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);



export const fetchTutors = createAsyncThunk(
  "parentCourse/fetchTutors",
  async ({ studentId, subject }, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `/parent/tutors?studentId=${studentId}&subject=${subject}`
      );
      return res.data.result;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);



export const createPaymentOrder = createAsyncThunk(
  "parentCourse/createPaymentOrder",
  async (amount, { rejectWithValue }) => {
    try {
      const res = await api.post("/payments/create-order", { amount });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);


export const verifyFirstPayment = createAsyncThunk(
  "parentCourse/verifyFirstPayment",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/payments/verify-first", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);



const parentCourseSlice = createSlice({
  name: "parentCourse",

  initialState: {
    step: 1,
    subjects: [],
    tutors: [],
    selectedStudent: null,
    selectedSubject: null,
    selectedTutor: null,
    startDate: null,
    timeSlot: null,
    loading: false,
    error: null,
  },

  reducers: {
    setStudent: (state, action) => {
      state.selectedStudent = action.payload;
    },

    setSubject: (state, action) => {
      state.selectedSubject = action.payload;
    },

    setTutor: (state, action) => {
      state.selectedTutor = action.payload;
    },

    setSchedule: (state, action) => {
      state.startDate = action.payload.startDate;
      state.timeSlot = action.payload.timeSlot;
    },

    nextStep: (state) => {
      state.step += 1;
    },

    prevStep: (state) => {
      state.step -= 1;
    },

    resetFlow: (state) => {
      state.step = 1;
      state.selectedSubject = null;
      state.selectedTutor = null;
      state.startDate = null;
      state.timeSlot = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

     

      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })

      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    

      .addCase(fetchTutors.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchTutors.fulfilled, (state, action) => {
        state.loading = false;
        state.tutors = action.payload;
      })

      .addCase(fetchTutors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

     

      .addCase(createPaymentOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(createPaymentOrder.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    

      .addCase(verifyFirstPayment.pending, (state) => {
        state.loading = true;
      })

      .addCase(verifyFirstPayment.fulfilled, (state) => {
        state.loading = false;
        state.step = 5; 
      })

      .addCase(verifyFirstPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setStudent,
  setSubject,
  setTutor,
  setSchedule,
  nextStep,
  prevStep,
  resetFlow,
} = parentCourseSlice.actions;

export default parentCourseSlice.reducer;