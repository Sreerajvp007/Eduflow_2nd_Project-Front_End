import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";

export const fetchTutorProfile = createAsyncThunk(
  "settings/fetchTutorProfile",
  async () => {
    const res = await axios.get("/tutor/profile");

    return res.data.result;
  },
);
export const fetchProfileEditRequest = createAsyncThunk(
  "settings/fetchProfileEditRequest",
  async () => {
    const res = await axios.get("/tutor/profile-edit-request");

    return res.data.result;
  },
);

export const updateTutorProfile = createAsyncThunk(
  "settings/updateTutorProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/tutor/profile-edit-request", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data.result;

    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const fetchBankDetails = createAsyncThunk(
  "settings/fetchBankDetails",
  async () => {
    const res = await axios.get("/tutor/bank-details");

    return res.data.result;
  },
);

export const saveBankDetails = createAsyncThunk(
  "settings/saveBankDetails",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/tutor/bank-details", data);
      return res.data.result;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

const settingsSlice = createSlice({
  name: "settings",

  initialState: {
    profile: null,
    bankDetails: null,

    loadingProfile: false,
    loadingBank: false,
    saving: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchTutorProfile.pending, (state) => {
        state.loadingProfile = true;
      })

      .addCase(fetchTutorProfile.fulfilled, (state, action) => {
        state.loadingProfile = false;
        state.profile = action.payload;
      })

      .addCase(fetchTutorProfile.rejected, (state) => {
        state.loadingProfile = false;
      })
      .addCase(fetchProfileEditRequest.fulfilled, (state, action) => {
        state.editRequest = action.payload;
      })

      .addCase(updateTutorProfile.pending, (state) => {
        state.saving = true;
      })

      .addCase(updateTutorProfile.fulfilled, (state, action) => {
        state.saving = false;
        state.profile = action.payload;
      })

      .addCase(updateTutorProfile.rejected, (state) => {
        state.saving = false;
      })

      .addCase(fetchBankDetails.pending, (state) => {
        state.loadingBank = true;
      })

      .addCase(fetchBankDetails.fulfilled, (state, action) => {
        state.loadingBank = false;
        state.bankDetails = action.payload;
      })

      .addCase(fetchBankDetails.rejected, (state) => {
        state.loadingBank = false;
      })

      .addCase(saveBankDetails.pending, (state) => {
        state.saving = true;
      })

      .addCase(saveBankDetails.fulfilled, (state, action) => {
        state.saving = false;
        state.bankDetails = action.payload;
      })

      .addCase(saveBankDetails.rejected, (state) => {
        state.saving = false;
      });
  },
});

export default settingsSlice.reducer;
