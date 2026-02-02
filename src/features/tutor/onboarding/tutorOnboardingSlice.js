
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import onboardingAPI from "./tutorOnboardingService";


export const saveProfileInfo = createAsyncThunk(
  "tutorOnboarding/saveProfileInfo",
  onboardingAPI.saveProfileInfo
);

export const saveTeachingInfo = createAsyncThunk(
  "tutorOnboarding/saveTeachingInfo",
  onboardingAPI.saveTeachingInfo
);

export const saveQualifications = createAsyncThunk(
  "tutorOnboarding/saveQualifications",
  onboardingAPI.saveQualifications
);

export const saveIdVerification = createAsyncThunk(
  "tutorOnboarding/saveIdVerification",
  onboardingAPI.saveIdVerification
);

export const submitForReview = createAsyncThunk(
  "tutorOnboarding/submitForReview",
  onboardingAPI.submitForReview
);
export const fetchOnboardingStatus = createAsyncThunk(
  "tutorOnboarding/fetchStatus",
  onboardingAPI.getOnboardingStatus
);


const tutorOnboardingSlice = createSlice({
  name: "tutorOnboarding",
  initialState: {
    loading: false,
    error: null,
    step: 1,
    profileCompletion: 0,
    tutor: null,
  },

  reducers: {
    resetOnboarding: () => ({
      loading: false,
      error: null,
      step: 1,
      profileCompletion: 0,
      tutor: null,
    }),
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("tutorOnboarding/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addMatcher(
        (action) =>
          action.type.startsWith("tutorOnboarding/") &&
          action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.loading = false;

          const result = action.payload?.result;
          if (!result) return;

          state.tutor = result;
          state.step = result.onboardingStep ?? state.step;
          state.profileCompletion =
            result.profileCompletion ?? state.profileCompletion;
        }
      )

      .addMatcher(
        (action) =>
          action.type.startsWith("tutorOnboarding/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload ||
            action.error?.message ||
            "Something went wrong";
        }
      )
  },
});

export const { resetOnboarding } = tutorOnboardingSlice.actions;
export default tutorOnboardingSlice.reducer;
