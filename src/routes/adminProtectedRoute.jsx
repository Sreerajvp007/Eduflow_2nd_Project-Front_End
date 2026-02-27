import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const { accessToken, authInitialized } = useSelector(
    (state) => state.admin
  );

  if (!authInitialized) return null;

  return accessToken
    ? <Outlet />
    : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;

