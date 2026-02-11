import { Users, UserCheck, BookOpen, DollarSign } from "lucide-react";
import PendingTutorTable from "../components/PendingTutorTable";

const stats = [
  {
    title: "Total Students",
    value: "1,234",
    change: "+12% vs last month",
    icon: Users,
  },
  {
    title: "Total Tutors",
    value: "256",
    change: "+8% vs last month",
    icon: UserCheck,
  },
  {
    title: "Total Courses",
    value: "45",
    change: "+5% vs last week",
    icon: BookOpen,
  },
  {
    title: "Revenue Summary",
    value: "$12,500",
    change: "+5% vs last month",
    icon: DollarSign,
    highlight: true,
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* ===== PAGE TITLE ===== */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of platform activity and recent requests
        </p>
      </div>

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`bg-white rounded-xl border p-6 shadow-sm transition
                ${
                  item.highlight
                    ? "ring-1 ring-indigo-200"
                    : ""
                }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {item.title}
                </p>
                <Icon className="text-gray-400" size={20} />
              </div>

              <p className="text-2xl font-semibold text-gray-900 mt-3">
                {item.value}
              </p>

              <p className="text-xs text-green-600 mt-2">
                {item.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* ===== PENDING TUTORS ===== */}
      <div className="bg-white rounded-xl border shadow-sm">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Pending Tutor Verifications
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Tutors waiting for admin approval
          </p>
        </div>

        <div className="p-6">
          <PendingTutorTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
