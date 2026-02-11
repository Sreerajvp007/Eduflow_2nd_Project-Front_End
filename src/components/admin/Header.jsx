// src/admin/layout/AdminHeader.jsx
import { Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../features/admin/adminAuthSlice";

const AdminHeader = ({ onMenuClick }) => {
  const dispatch = useDispatch();

  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button className="lg:hidden" onClick={onMenuClick}>
          <Menu />
        </button>
        <h1 className="font-semibold">Admin Dashboard</h1>
      </div>

      <button
        onClick={() => dispatch(adminLogout())}
        className="text-sm text-gray-600 hover:text-red-500"
      >
        Logout
      </button>
    </header>
  );
};

export default AdminHeader;
