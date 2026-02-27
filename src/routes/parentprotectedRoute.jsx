import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { parentRefresh } from "../features/parent/auth/parentAuthSlice";

const ParentProtectedRoute = () => {
  const dispatch = useDispatch();

  const { accessToken, authInitialized } = useSelector(
    (state) => state.parentAuth,
  );

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role === "parent" && !accessToken) {
      dispatch(parentRefresh());
    }
  }, [dispatch, accessToken]);

  if (!authInitialized) return null;

  return accessToken ? <Outlet /> : <Navigate to="/parent/login" replace />;
};

export default ParentProtectedRoute;
