import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import onboardingAPI from "./tutorOnboardingService";

const handleAsync = (apiCall) =>
  createAsyncThunk(apiCall.typePrefix, async (data, thunkAPI) => {
    try {
      const res = await apiCall.request(data);
      return res.data;
    } catch (err) {
      const backendError = err.response?.data;

      if (backendError?.errors?.length > 0) {
        return thunkAPI.rejectWithValue(backendError.errors[0].message);
      }

      return thunkAPI.rejectWithValue(
        backendError?.message || "Something went wrong",
      );
    }
  });

export const saveProfileInfo = createAsyncThunk(
  "tutorOnboarding/saveProfileInfo",
  async (data, thunkAPI) => {
    try {
      const res = await onboardingAPI.saveProfileInfo(data);
      return res.data;
    } catch (err) {
      const backendError = err.response?.data;

      if (backendError?.errors?.length > 0) {
        return thunkAPI.rejectWithValue(backendError.errors[0].message);
      }

      return thunkAPI.rejectWithValue(
        backendError?.message || "Profile update failed",
      );
    }
  },
);

export const saveTeachingInfo = createAsyncThunk(
  "tutorOnboarding/saveTeachingInfo",
  async (data, thunkAPI) => {
    try {
      const res = await onboardingAPI.saveTeachingInfo(data);
      return res.data;
    } catch (err) {
      const backendError = err.response?.data;

      if (backendError?.errors?.length > 0) {
        return thunkAPI.rejectWithValue(backendError.errors[0].message);
      }

      return thunkAPI.rejectWithValue(
        backendError?.message || "Teaching info failed",
      );
    }
  },
);

export const saveQualifications = createAsyncThunk(
  "tutorOnboarding/saveQualifications",
  async (data, thunkAPI) => {
    try {
      const res = await onboardingAPI.saveQualifications(data);
      return res.data;
    } catch (err) {
      const backendError = err.response?.data;

      if (backendError?.errors?.length > 0) {
        return thunkAPI.rejectWithValue(backendError.errors[0].message);
      }

      return thunkAPI.rejectWithValue(
        backendError?.message || "Qualifications failed",
      );
    }
  },
);

export const saveIdVerification = createAsyncThunk(
  "tutorOnboarding/saveIdVerification",
  async (data, thunkAPI) => {
    try {
      const res = await onboardingAPI.saveIdVerification(data);
      return res.data;
    } catch (err) {
      const backendError = err.response?.data;

      if (backendError?.errors?.length > 0) {
        return thunkAPI.rejectWithValue(backendError.errors[0].message);
      }

      return thunkAPI.rejectWithValue(
        backendError?.message || "ID verification failed",
      );
    }
  },
);

export const submitForReview = createAsyncThunk(
  "tutorOnboarding/submitForReview",
  async (_, thunkAPI) => {
    try {
      const res = await onboardingAPI.submitForReview();
      return res.data;
    } catch (err) {
      const backendError = err.response?.data;

      return thunkAPI.rejectWithValue(backendError?.message || "Submit failed");
    }
  },
);

export const fetchOnboardingStatus = createAsyncThunk(
  "tutorOnboarding/fetchStatus",
  async (_, thunkAPI) => {
    try {
      const res = await onboardingAPI.getOnboardingStatus();
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch status");
    }
  },
);

export const fetchTeachingMeta = createAsyncThunk(
  "tutorOnboarding/fetchTeachingMeta",
  async (_, thunkAPI) => {
    try {
      const res = await onboardingAPI.getTeachingMeta();
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch teaching meta");
    }
  },
);

const tutorOnboardingSlice = createSlice({
  name: "tutorOnboarding",
  initialState: {
    loading: false,
    metaLoading: false,
    error: null,
    step: 1,
    profileCompletion: 0,
    tutor: null,
    teachingMeta: [],
  },

  reducers: {
    resetOnboarding: () => ({
      loading: false,
      metaLoading: false,
      error: null,
      step: 1,
      profileCompletion: 0,
      tutor: null,
      teachingMeta: [],
    }),
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchTeachingMeta.pending, (state) => {
        state.metaLoading = true;
      })
      .addCase(fetchTeachingMeta.fulfilled, (state, action) => {
        state.metaLoading = false;
        state.teachingMeta = action.payload?.result || [];
      })
      .addCase(fetchTeachingMeta.rejected, (state) => {
        state.metaLoading = false;
      })

      .addMatcher(
        (action) =>
          action.type.startsWith("tutorOnboarding/") &&
          action.type.endsWith("/pending") &&
          !action.type.includes("fetchTeachingMeta"),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )

      .addMatcher(
        (action) =>
          action.type.startsWith("tutorOnboarding/") &&
          action.type.endsWith("/fulfilled") &&
          !action.type.includes("fetchTeachingMeta"),
        (state, action) => {
          state.loading = false;

          const result = action.payload?.result;
          if (!result) return;

          state.tutor = result;
          state.step = result.onboardingStep ?? state.step;
          state.profileCompletion =
            result.profileCompletion ?? state.profileCompletion;
        },
      )

      .addMatcher(
        (action) =>
          action.type.startsWith("tutorOnboarding/") &&
          action.type.endsWith("/rejected") &&
          !action.type.includes("fetchTeachingMeta"),
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload || action.error?.message || "Something went wrong";
        },
      );
  },
});

export const { resetOnboarding } = tutorOnboardingSlice.actions;
export default tutorOnboardingSlice.reducer;
