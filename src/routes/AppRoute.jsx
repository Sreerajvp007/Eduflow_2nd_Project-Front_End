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
import TutorListPage from '../pages/admin/AdminTutorListPage'
import TutorDetailsPage from "../pages/admin/TutorDetailsPage";

import ParentSignup from "../pages/parent/parentSignup";
import ParentLogin from "../pages/parent/parentLogin";
import ParentVerifyLoginOtp from "../pages/parent/ParentVerifyLoginOtp";
import ParentVerifySignupOtp from "../pages/parent/parentVerifySignupOtp";
import ParentChildDetails from "../pages/parent/ParentChildDetails";
import ParentDashboard from "../pages/parent/ParentDashboard";
import ParentProtectedRoute from "./parentprotectedRoute";
import ParentLayout from "../components/layout/parent/Layout";

import NotFound from "../pages/errors/NotFound";
import Unauthorized from "../pages/errors/Unauthorized";



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />

<Route element={<AdminProtectedRoute />}>
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<AdminDashboard />} />
    <Route path="dashboard" element={<AdminDashboard />} />

    {/* ✅ Student Management */}
    <Route path="students" element={<StudentListPage />} />
    <Route path="students/:id" element={<StudentDetailsPage />} />

    {/* future admin routes */}
    <Route path="tutors" element={<TutorListPage />} />
    <Route path="tutors/:id" element={<TutorDetailsPage />} />
    {/* <Route path="settings" element={<AdminSettings />} /> */}
  </Route>
</Route>

      {/* ================= TUTOR ================= */}
      <Route path="/tutor/signup" element={<TutorSignup />} />
      <Route path="/tutor/login" element={<TutorLogin />} />

      <Route element={<TutorProtectedRoute />}>
        {/* onboarding WITHOUT layout */}
        <Route path="/tutor/onboarding" element={<TutorOnboarding />} />

        {/* dashboard WITH layout */}
        <Route path="/tutor" element={<TutorLayout />}>
          <Route index element={<TutorDashboard />} />
          <Route path="dashboard" element={<TutorDashboard />} />
          {/* future tutor routes */}
          {/* <Route path="sessions" element={<TutorSessions />} /> */}
          {/* <Route path="students" element={<TutorStudents />} /> */}
        </Route>
      </Route>




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
    <Route path="dashboard" element={<ParentDashboard />} />

    {/* future parent pages */}
    {/* <Route path="sessions" element={<ParentSessions />} /> */}
    {/* <Route path="messages" element={<ParentMessages />} /> */}
    {/* <Route path="payments" element={<ParentPayments />} /> */}
    {/* <Route path="profile" element={<ParentProfile />} /> */}
  </Route>
</Route>
       {/* ===== ERRORS ===== */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
   
    </Routes>
  );
};

export default AppRoutes;




// import { Routes, Route } from "react-router-dom";

// /* ========== ADMIN ========== */
// import AdminLogin from "../pages/admin/adminLogin";
// import AdminDashboard from "../pages/admin/adminDashboard";
// import TutorDetails from "../pages/admin/TutorDetails";
// import Courses from "../pages/admin/Courses";
// import AdminLayout from "../layouts/AdminLayout";
// import AdminProtectedRoute from "./adminProtectedRoute";

// /* ========== TUTOR ========== */
// import TutorSignup from "../pages/tutor/tutorSignup";
// import TutorLogin from "../pages/tutor/tutorLogin";
// import TutorDashboard from "../pages/tutor/TutorDashboard";
// import TutorOnboarding from "../pages/tutor/onborading/TutorOnboarding";
// import TutorProtectedRoute from "./TutorProtectedRoute";

// /* ========== PARENT ========== */
// import ParentSignup from "../pages/parent/parentSignup";
// import ParentLogin from "../pages/parent/parentLogin";
// import ParentVerifyLoginOtp from "../pages/parent/ParentVerifyLoginOtp";
// import ParentVerifySignupOtp from "../pages/parent/parentVerifySignupOtp";
// import ParentChildDetails from "../pages/parent/ParentChildDetails";
// import ParentDashboard from "../pages/parent/ParentDashboard";
// import ParentProtectedRoute from "./parentprotectedRoute";

// errors
// import NotFound from "../pages/errors/NotFound";
// import Unauthorized from "../pages/errors/Unauthorized";

// const AppRoutes = () => {
//   return (
//     <Routes>
//       {/* ================= ADMIN ================= */}
//       <Route path="/admin/login" element={<AdminLogin />} />

//       <Route element={<AdminProtectedRoute />}>
//         <Route path="/admin" element={<AdminLayout />}>
//           <Route index element={<AdminDashboard />} />
//           <Route path="dashboard" element={<AdminDashboard />} />
//           <Route path="tutors/:id" element={<TutorDetails />} />
//           <Route path="courses" element={<Courses />} />
//         </Route>
//       </Route>

//       {/* ================= TUTOR ================= */}
//       <Route path="/tutor/signup" element={<TutorSignup />} />
//       <Route path="/tutor/login" element={<TutorLogin />} />

//       <Route element={<TutorProtectedRoute />}>
//         <Route path="/tutor/onboarding" element={<TutorOnboarding />} />
//         <Route path="/tutor/dashboard" element={<TutorDashboard />} />
//       </Route>

//       {/* ================= PARENT ================= */}
//       <Route path="/parent/signup" element={<ParentSignup />} />
//       <Route path="/parent/login" element={<ParentLogin />} />

//       <Route path="/parent/verify-signup-otp" element={<ParentVerifySignupOtp />} />
//       <Route path="/parent/verify-login-otp" element={<ParentVerifyLoginOtp />} />
//       <Route path="/parent/child-details" element={<ParentChildDetails />} />

//       <Route element={<ParentProtectedRoute />}>
//         <Route path="/parent/dashboard" element={<ParentDashboard />} />
//       </Route>

       
    //   {/* ===== ERRORS ===== */}
    //   <Route path="/unauthorized" element={<Unauthorized />} />
    //   <Route path="*" element={<NotFound />} />
//     </Routes>

//   );
// };

// export default AppRoutes;

