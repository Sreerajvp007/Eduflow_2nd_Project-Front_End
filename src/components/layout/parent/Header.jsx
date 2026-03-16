import { useSelector } from "react-redux";
import StudentSwitcher from "../common/StudentSwitcher";

const ParentHeader = () => {

  const { profile } = useSelector((state) => state.parentProfile);

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (
    <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{greeting},</p>

        <h1 className="text-lg font-semibold">
          {profile?.fullName || "Parent"} 👋
        </h1>
      </div>

      <StudentSwitcher />
    </header>
  );
};

export default ParentHeader;