import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/admin/adminLogin";
import AdminProtectedRoute from "./adminProtectedRoute";
import AdminDashboard from "../pages/admin/adminDashboard";
import AdminLayout from "../components/layout/admin/Layout";
import StudentListPage from "../pages/admin/StudentListPage";
import StudentDetailsPage from "../pages/admin/StudentDetailsPage";

import TutorSignup from "../pages/tutor/tutorSignup";
import TutorProtectedRoute from "./TutorProtectedRoute";
import TutorDashboard from "../pages/tutor/TutorDashboard";
import TutorLogin from "../pages/tutor/tutorLogin";
import TutorOnboarding from "../pages/tutor/onborading/TutorOnboarding";
import TutorLayout from "../components/layout/tutor/Layout";
import TutorListPage from "../pages/admin/AdminTutorListPage";
import TutorDetailsPage from "../pages/admin/TutorDetailsPage";
import TutorCourses from "../pages/tutor/TutorCoursePage";
import CourseOverview from "../pages/tutor/CourseOverview";
import MyStudents from "../pages/tutor/MyStudents";
import StudentCourses from "../pages/tutor/StudentCourses";
import SchedulePage from "../pages/tutor/SchedulePage";

import ParentSignup from "../pages/parent/parentSignup";
import ParentLogin from "../pages/parent/parentLogin";
import ParentVerifyLoginOtp from "../pages/parent/ParentVerifyLoginOtp";
import ParentVerifySignupOtp from "../pages/parent/parentVerifySignupOtp";
import ParentChildDetails from "../pages/parent/ParentChildDetails";
import ParentDashboard from "../pages/parent/ParentDashboard";
import ParentProtectedRoute from "./parentprotectedRoute";
import ParentLayout from "../components/layout/parent/Layout";
import ParentCourseFlow from "../pages/parent/ParentCourseFlow";
import Profile from "../pages/parent/Profile";
import EditProfile from "../pages/parent/profile/EditProfile";
import EditParent from "../pages/parent/profile/EditParent";
import ParentCourses from "../pages/parent/ParentCourses";
import ParentCourseOverview from "../pages/parent/ParentCourseOverview";
import AddStudent from "../pages/parent/AddStudent";
import CoursePayment from "../pages/parent/CoursePayment";
import ParentPayments from "../pages/parent/ParentPayments";
import AdminFeedbackPage from "../pages/admin/AdminFeedbackPage";
import TutorReviewsPage from "../pages/tutor/TutorReviewsPage";
import TutorPaymentsPage from "../pages/tutor/TutorPaymentsPage";
import AdminPaymentsPage from "../pages/admin/AdminPaymentsPage";

import LearningPlanForm from "../pages/tutor/LearningPlanForm";

import NotFound from "../pages/errors/NotFound";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="students" element={<StudentListPage />} />
          <Route path="students/:id" element={<StudentDetailsPage />} />

          <Route path="tutors" element={<TutorListPage />} />
          <Route path="tutors/:id" element={<TutorDetailsPage />} />
          <Route path="feedback" element={<AdminFeedbackPage />} />
          <Route path="payments" element={<AdminPaymentsPage />} />
        </Route>
      </Route>

      {/* ================= TUTOR ================= */}
      <Route path="/tutor/signup" element={<TutorSignup />} />
      <Route path="/tutor/login" element={<TutorLogin />} />

      <Route element={<TutorProtectedRoute />}>
        <Route path="/tutor/onboarding" element={<TutorOnboarding />} />

        <Route path="/tutor" element={<TutorLayout />}>
          <Route index element={<TutorDashboard />} />
          <Route path="dashboard" element={<TutorDashboard />} />
          <Route
            path="new-courses/:courseId/create-plan"
            element={<LearningPlanForm />}
          />
          <Route path="/tutor/courses" element={<TutorCourses />} />
          <Route path="courses/:courseId" element={<CourseOverview />} />
          <Route path="my-students" element={<MyStudents />} />
          <Route path="reviews" element={<TutorReviewsPage />} />
           <Route path="payments" element={<TutorPaymentsPage />} />
          <Route
    path="students/:studentId/courses"
    element={<StudentCourses />}
  />
  <Route path="schedule" element={<SchedulePage />} />
        </Route>
      </Route>

      {/* parent */}
      <Route path="/parent/signup" element={<ParentSignup />} />
      <Route path="/parent/login" element={<ParentLogin />} />
      <Route
        path="/parent/verify-signup-otp"
        element={<ParentVerifySignupOtp />}
      />

      <Route
        path="/parent/verify-login-otp"
        element={<ParentVerifyLoginOtp />}
      />
      <Route path="/parent/child-details" element={<ParentChildDetails />} />

      <Route element={<ParentProtectedRoute />}>
        <Route path="/parent" element={<ParentLayout />}>
          <Route index element={<ParentDashboard />} />
          <Route path="/parent/courses" element={<ParentCourses />} />
          <Route path="dashboard" element={<ParentDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="edit-parent" element={<EditParent />} />
          <Route path="/parent/add-student" element={<AddStudent />} />
          <Route
            path="/parent/courses/:courseId"
            element={<ParentCourseOverview />}
          />
          <Route
  path="/parent/courses/:courseId/payment"
  element={<CoursePayment />}
/>

          <Route path="request-course" element={<ParentCourseFlow />} />
          <Route path="/parent/payments" element={<ParentPayments />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
