import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const adminLogin = createAsyncThunk(
  "admin/login",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/admin/login", data);
      return res.data;
    } catch (err) {
      const backendError = err.response?.data;

      if (backendError?.errors?.length > 0) {
        return thunkAPI.rejectWithValue(backendError.errors[0].message);
      }

      return thunkAPI.rejectWithValue(backendError?.message || "Login failed");
    }
  },
);

export const adminRefresh = createAsyncThunk(
  "admin/refresh",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/auth/refresh?role=admin");
      return res.data;
    } catch {
      return thunkAPI.rejectWithValue("Session expired");
    }
  },
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    accessToken: null,
    loading: false,
    error: null,
    authInitialized: false,
  },
  reducers: {
    adminLogout: (state) => {
      state.accessToken = null;
      state.authInitialized = true;
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.result.accessToken;
        state.authInitialized = true;
        localStorage.setItem("role", "admin");
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.authInitialized = true;
      })

      .addCase(adminRefresh.fulfilled, (state, action) => {
        state.accessToken = action.payload.result.accessToken;
        state.authInitialized = true;
      })
      .addCase(adminRefresh.rejected, (state) => {
        state.accessToken = null;
        state.authInitialized = true;
        localStorage.removeItem("role");
      });
  },
});

export const { adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
