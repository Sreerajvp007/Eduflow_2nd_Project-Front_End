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
import tutorStudentReducer from "../features/tutor/tutorStudentSlice";
import parentPaymentsReducer from "../features/parent/parentPaymentSlice";
import reviewReducer  from "../features/parent/parentReviewSlice";
import feedbackReducer from "../features/common/feedbackSlice"
import paymentsReducer from "../features/common/paymentsSlice"


import tutorCourseReducer from "../features/tutor/course/tutorCourseSlice";
import scheduleReducer from "../features/tutor/scheduleSlice"
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
    tutorStudents: tutorStudentReducer,
    schedule: scheduleReducer, 
    parentPayments: parentPaymentsReducer,
    reviews: reviewReducer,
    feedback: feedbackReducer,
    payments: paymentsReducer,
    
  },
  devTools: true,
});

export default store;


