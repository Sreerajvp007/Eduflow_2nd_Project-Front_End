// src/admin/layout/DesktopSidebar.jsx
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

const DesktopSidebar = () => {
  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 bg-white border-r">
      <div className="flex flex-col w-full">
        <div className="h-16 flex items-center px-6 font-semibold text-lg">
          TutorAdmin
        </div>

        <nav className="flex-1 px-4 space-y-1 text-sm">
          {menu.map((item) => (
            <NavLink
              key={item}
              to={`/admin/${item.toLowerCase().replace(/ & | /g, "-")}`}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition
                 ${
                   isActive
                     ? "bg-indigo-50 text-indigo-600"
                     : "text-gray-600 hover:bg-gray-100"
                 }`
              }
            >
              {item}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
