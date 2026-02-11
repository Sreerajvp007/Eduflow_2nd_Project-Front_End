// src/admin/layout/MobileSidebar.jsx
import { X } from "lucide-react";
import { NavLink } from "react-router-dom";

const menu = [
  "Dashboard",
  "Tutor Management",
  "Students & Parents",
  "Sessions & Bookings",
  "Payments & Revenue",
  "Reviews & Feedback",
  "Reports",
  "Platform Settings",
];

const MobileSidebar = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-semibold">TutorAdmin</span>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <nav className="p-4 space-y-1 text-sm">
          {menu.map((item) => (
            <NavLink
              key={item}
              to={`/admin/${item.toLowerCase().replace(/ & | /g, "-")}`}
              onClick={onClose}
              className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {item}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileSidebar;
