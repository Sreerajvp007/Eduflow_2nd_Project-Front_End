import { Home, Book, User } from "lucide-react";

const BottomNav = () => {
  return (
    <nav className="bg-white border-t flex justify-around py-2">
      <NavItem icon={<Home size={20} />} label="Home" />
      <NavItem icon={<Book size={20} />} label="Courses" />
      <NavItem icon={<User size={20} />} label="Profile" />
    </nav>
  );
};

const NavItem = ({ icon, label }) => (
  <button className="flex flex-col items-center text-xs text-gray-600">
    {icon}
    {label}
  </button>
);

export default BottomNav;
