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
import sessionReducer from "../features/tutor/sessionSlice"
import tutorSessionReducer from "../features/tutor/tutorSessionSlice";
import parentSessionReducer from "../features/parent/parentSessionSlice";
import adminClasses from "../features/admin/adminClassSlice";
import adminAnalytics from "../features/admin/adminAnalyticsSlice"
import settingsReducer from "../features/tutor/settingsSlice"
import tutorCourseReducer from "../features/tutor/course/tutorCourseSlice";
import scheduleReducer from "../features/tutor/scheduleSlice";
import adminSettings from "../features/admin/adminSettingsSlice"
const store = configureStore({
  reducer: {
    admin: adminReducer,
    tutorOnboarding: tutorOnboardingReducer,
    tutorAuth: tutorAuthReducer,
    parentAuth:parentAuthReducer,
    adminUI,
    adminTutors,
    adminStudents,
     adminClasses,
     adminSettings,
     adminAnalytics,
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
    sessions: sessionReducer,
    tutorSessions: tutorSessionReducer,
    parentSessions: parentSessionReducer,
    settings: settingsReducer,

    
  },
  devTools: true,
});

export default store;


