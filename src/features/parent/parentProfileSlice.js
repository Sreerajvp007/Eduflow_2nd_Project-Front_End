import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance";

export const fetchParentProfile = createAsyncThunk(
  "parentProfile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/parent/profile");
      return res.data.result;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch profile",
      );
    }
  },
);

export const updateParentProfile = createAsyncThunk(
  "parentProfile/update",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put("/parent/profile", data);
      return res.data.result;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  },
);

export const deleteParentProfile = createAsyncThunk(
  "parentProfile/delete",
  async (_, { rejectWithValue }) => {
    try {
      await api.delete("/parent/profile");
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  },
);

const parentProfileSlice = createSlice({
  name: "parentProfile",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearProfile: (state) => {
      state.profile = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* FETCH */
      .addCase(fetchParentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchParentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateParentProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateParentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateParentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteParentProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteParentProfile.fulfilled, (state) => {
        state.loading = false;
        state.profile = null;
      })
      .addCase(deleteParentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfile } = parentProfileSlice.actions;

export default parentProfileSlice.reducer;
