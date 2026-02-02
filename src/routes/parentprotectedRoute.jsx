import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ParentProtectedRoute = () => {
  const { accessToken, authInitialized } = useSelector(
    (state) => state.parentAuth
  );

  
  if (!authInitialized) return null;

  return accessToken
    ? <Outlet />
    : <Navigate to="/parent/login" replace />;
};

export default ParentProtectedRoute;
