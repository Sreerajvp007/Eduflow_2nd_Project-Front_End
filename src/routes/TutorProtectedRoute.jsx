import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const TutorProtectedRoute = () => {
  const { accessToken, authInitialized } = useSelector(
    (state) => state.tutorAuth
  );

  if (!authInitialized) return null;

  return accessToken
    ? <Outlet />
    : <Navigate to="/tutor/login" replace />;
};

export default TutorProtectedRoute;
