import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { adminRefresh } from "./features/admin/adminAuthSlice";
import { tutorRefresh } from "./features/tutor/auth/tutorAuthSlice";
import { parentRefresh } from "./features/parent/auth/parentAuthSlice";

function App() {
  const dispatch = useDispatch();

  const adminInit = useSelector((state) => state.admin.authInitialized);
  const tutorInit = useSelector((state) => state.tutorAuth.authInitialized);
  const parentInit = useSelector((state)=> state.parentAuth.authInitialized)

  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!role) return;

    if (role === "admin") dispatch(adminRefresh());
    if (role === "tutor") dispatch(tutorRefresh());
    if(role === "parent") dispatch(parentRefresh())
  }, [dispatch, role]);

  if (
    role &&
    (
      (role === "admin" && !adminInit) ||
      (role === "tutor" && !tutorInit) ||
      (role === "parent" && !parentInit)
    )
  ) {
    return <div>Loading app...</div>;
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
