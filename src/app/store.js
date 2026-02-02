import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/admin/adminAuthSlice";
import tutorOnboardingReducer from '../features/tutor/onboarding/tutorOnboardingSlice'
import tutorAuthReducer from '../features/tutor/auth/tutorAuthSlice'
import parentAuthReducer from  '../features/parent/auth/parentAuthSlice'

const store = configureStore({
  reducer: {
    admin: adminReducer,
    tutorOnboarding: tutorOnboardingReducer,
    tutorAuth: tutorAuthReducer,
    parentAuth:parentAuthReducer 
    
  },
  devTools: true,
});

export default store;


