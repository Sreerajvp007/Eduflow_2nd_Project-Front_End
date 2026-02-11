import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/admin/adminAuthSlice";
import tutorOnboardingReducer from '../features/tutor/onboarding/tutorOnboardingSlice'
import tutorAuthReducer from '../features/tutor/auth/tutorAuthSlice'
import parentAuthReducer from  '../features/parent/auth/parentAuthSlice';
import adminUI from "../features/admin/adminUISlice";
import adminTutors from "../features/admin/adminTutorSlice";
import adminStudents from "../features/admin/studentSlice"

const store = configureStore({
  reducer: {
    admin: adminReducer,
    tutorOnboarding: tutorOnboardingReducer,
    tutorAuth: tutorAuthReducer,
    parentAuth:parentAuthReducer,
    adminUI,
    adminTutors,
    adminStudents, 
    
  },
  devTools: true,
});

export default store;


