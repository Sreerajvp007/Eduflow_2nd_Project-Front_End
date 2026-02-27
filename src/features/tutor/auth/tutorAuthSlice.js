import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance";

export const tutorSignup = createAsyncThunk(
  "tutorAuth/signup",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/tutor/signup", data);
      return res.data;
    } catch (err) {
      const backendError = err.response?.data;

      if (backendError?.errors?.length > 0) {
        return thunkAPI.rejectWithValue(backendError.errors[0].message);
      }

      return thunkAPI.rejectWithValue(
        backendError?.message || "Tutor signup failed",
      );
    }
  },
);

export const tutorLogin = createAsyncThunk(
  "tutorAuth/login",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/tutor/login", data);
      return res.data;
    } catch (err) {
      const backendError = err.response?.data;

      if (backendError?.errors?.length > 0) {
        return thunkAPI.rejectWithValue(backendError.errors[0].message);
      }

      return thunkAPI.rejectWithValue(
        backendError?.message || "Tutor login failed",
      );
    }
  },
);
export const tutorRefresh = createAsyncThunk(
  "tutorAuth/refresh",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/auth/refresh?role=tutor");
      return res.data;
    } catch {
      return thunkAPI.rejectWithValue("Session expired");
    }
  },
);

const tutorAuthSlice = createSlice({
  name: "tutorAuth",
  initialState: {
    tutor: null,
    accessToken: null,
    loading: false,
    error: null,
    authInitialized: false,
  },

  reducers: {
    tutorLogout: (state) => {
      state.tutor = null;
      state.accessToken = null;
      state.authInitialized = true;
      localStorage.removeItem("role");
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(tutorSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(tutorSignup.fulfilled, (state, action) => {
        state.loading = false;

        state.accessToken = action.payload.result.accessToken;

        state.tutor = {
          id: action.payload.result.tutorId,
          role: action.payload.result.role,
          onboardingStatus: action.payload.result.onboardingStatus,
        };

        state.authInitialized = true;
        localStorage.setItem("role", "tutor");
      })
      .addCase(tutorSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.authInitialized = true;
      })

      .addCase(tutorLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(tutorLogin.fulfilled, (state, action) => {
        state.loading = false;

        state.accessToken = action.payload.result.accessToken;

        state.tutor = action.payload.result.tutor;

        state.authInitialized = true;
        localStorage.setItem("role", "tutor");
      })
      .addCase(tutorLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.authInitialized = true;
      })

      .addCase(tutorRefresh.fulfilled, (state, action) => {
        state.accessToken = action.payload.result.accessToken;

        state.tutor = action.payload.result.user;

        state.authInitialized = true;
      })
      .addCase(tutorRefresh.rejected, (state) => {
        state.tutor = null;
        state.accessToken = null;
        state.authInitialized = true;
        localStorage.removeItem("role");
      });
  },
});

export const { tutorLogout } = tutorAuthSlice.actions;
export default tutorAuthSlice.reducer;
