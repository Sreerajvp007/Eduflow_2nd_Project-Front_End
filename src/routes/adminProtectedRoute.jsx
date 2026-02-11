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
// import { useSelector } from "react-redux";
// import { Navigate, Outlet, useLocation } from "react-router-dom";

// const AdminProtectedRoute = () => {
//   const location = useLocation();

//   const {
//     accessToken,
//     authInitialized,
//     admin,
//   } = useSelector((state) => state.admin || {});

//   // Still checking auth (refresh token / init)
//   if (!authInitialized) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <span className="text-gray-500 text-sm">Checking admin access...</span>
//       </div>
//     );
//   }

//   // Not logged in
//   if (!accessToken) {
//     return (
//       <Navigate
//         to="/admin/login"
//         replace
//         state={{ from: location }}
//       />
//     );
//   }

//   // Logged in but not admin (extra safety)
//   if (admin?.role !== "admin") {
//     return (
//       <Navigate
//         to="/unauthorized"
//         replace
//       />
//     );
//   }

//   // Authorized admin
//   return <Outlet />;
// };

// export default AdminProtectedRoute;
