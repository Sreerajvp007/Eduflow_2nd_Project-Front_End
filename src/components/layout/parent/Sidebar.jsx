import { Home, Book, User } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="p-4 space-y-4">
      <SidebarItem icon={<Home size={18} />} label="Home" />
      <SidebarItem icon={<Book size={18} />} label="Courses" />
      <SidebarItem icon={<User size={18} />} label="Profile" />
    </div>
  );
};

const SidebarItem = ({ icon, label }) => (
  <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100 text-sm">
    {icon}
    {label}
  </button>
);

export default Sidebar;
