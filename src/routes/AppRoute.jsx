import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/admin/adminLogin";
import AdminProtectedRoute from "./adminProtectedRoute";
import AdminDashboard from "../pages/admin/adminDashboard";

import TutorSignup from "../pages/tutor/tutorSignup";
import TutorProtectedRoute from "./TutorProtectedRoute";
import TutorDashboard from "../pages/tutor/TutorDashboard";
import TutorLogin from "../pages/tutor/tutorLogin";
import TutorOnboarding from "../pages/tutor/onborading/TutorOnboarding";

import ParentSignup from "../pages/parent/parentSignup";
import ParentLogin from "../pages/parent/parentLogin";
import ParentVerifyLoginOtp from "../pages/parent/ParentVerifyLoginOtp";
import ParentVerifySignupOtp from "../pages/parent/parentVerifySignupOtp";
import ParentChildDetails from "../pages/parent/ParentChildDetails";
import ParentDashboard from "../pages/parent/ParentDashboard";
import ParentProtectedRoute from "./parentprotectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

      <Route path="/tutor/signup" element={<TutorSignup />} />
      <Route path="/tutor/login" element={<TutorLogin />} />

      <Route element={<TutorProtectedRoute />}>
        <Route path="/tutor/onboarding" element={<TutorOnboarding />} />
        <Route path="/tutor/dashboard" element={<TutorDashboard />} />
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
        <Route path="/parent/dashboard" element={<ParentDashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
