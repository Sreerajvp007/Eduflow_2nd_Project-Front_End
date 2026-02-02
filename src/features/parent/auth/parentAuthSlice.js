import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance";


export const sendParentSignupOtp = createAsyncThunk(
  "parent/sendSignupOtp",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/parent/send-otp", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to send OTP"
      );
    }
  }
);


export const verifyParentSignupOtp = createAsyncThunk(
  "parent/verifySignupOtp",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/parent/verify-otp", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "OTP verification failed"
      );
    }
  }
);


export const sendParentLoginOtp = createAsyncThunk(
  "parent/sendLoginOtp",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/parent/login/send-otp", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to send OTP"
      );
    }
  }
);


export const verifyParentLoginOtp = createAsyncThunk(
  "parent/verifyLoginOtp",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/parent/login/verify-otp", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "OTP verification failed"
      );
    }
  }
);


export const parentRefresh = createAsyncThunk(
  "parent/refresh",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/auth/refresh?role=parent");
      return res.data;
    } catch {
      return thunkAPI.rejectWithValue("Session expired");
    }
  }
);

const parentAuthSlice = createSlice({
  name: "parentAuth",
  initialState: {
    accessToken: null,
    loading: false,
    error: null,
    authInitialized: false,
  },
  reducers: {
    parentLogout: (state) => {
      state.accessToken = null;
      state.authInitialized = true;
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(sendParentSignupOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendParentSignupOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendParentSignupOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

     
      .addCase(verifyParentSignupOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyParentSignupOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.result.accessToken;
        state.authInitialized = true; 
        localStorage.setItem("role", "parent");
      })
      .addCase(verifyParentSignupOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.authInitialized = true;
      })

   
      .addCase(sendParentLoginOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendParentLoginOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendParentLoginOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

   
      .addCase(verifyParentLoginOtp.fulfilled, (state, action) => {
        state.accessToken = action.payload.result.accessToken;
        state.authInitialized = true;
        localStorage.setItem("role", "parent");
      })

   
      .addCase(parentRefresh.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.authInitialized = true;
      })
      .addCase(parentRefresh.rejected, (state) => {
        state.accessToken = null;
        state.authInitialized = true;
        localStorage.removeItem("role");
      });
  },
});

export const { parentLogout } = parentAuthSlice.actions;
export default parentAuthSlice.reducer;
