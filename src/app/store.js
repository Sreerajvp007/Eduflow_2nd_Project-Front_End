import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/admin/adminAuthSlice";
import tutorOnboardingReducer from '../features/tutor/onboarding/tutorOnboardingSlice'
import tutorAuthReducer from '../features/tutor/auth/tutorAuthSlice'
import parentAuthReducer from  '../features/parent/auth/parentAuthSlice';
import adminUI from "../features/admin/adminUISlice";
import adminTutors from "../features/admin/adminTutorSlice";
import adminStudents from "../features/admin/studentSlice"
import adminDashboardReducer from "../features/admin/adminDashboardSlice"
import parentCourseReducer from "../features/parent/parentCourseSlice"
import parentStudentsReducer from "../features/parent/parentStudentsSlice";
import parentProfileReducer from "../features/parent/parentProfileSlice";
import parentCourseListReducer from "../features/parent/parentCourseListSlice";

import tutorCourseReducer from "../features/tutor/course/tutorCourseSlice"
const store = configureStore({
  reducer: {
    admin: adminReducer,
    tutorOnboarding: tutorOnboardingReducer,
    tutorAuth: tutorAuthReducer,
    parentAuth:parentAuthReducer,
    adminUI,
    adminTutors,
    adminStudents,
    adminDashboard: adminDashboardReducer, 
    
    parentStudents: parentStudentsReducer,
    parentCourse: parentCourseReducer,
    parentProfile: parentProfileReducer,
    parentCourses: parentCourseListReducer,
    tutorCourses: tutorCourseReducer,
    
  },
  devTools: true,
});

export default store;


