import StudentSwitcher from "../common/StudentSwitcher";

const ParentHeader = () => {
  return (
    <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">Good Morning,</p>
        <h1 className="text-lg font-semibold">Sarah 👋</h1>
      </div>

      <StudentSwitcher />
    </header>
  );
};

export default ParentHeader;
