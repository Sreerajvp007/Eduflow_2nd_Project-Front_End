import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ParentDashboard = () => {
  const navigate = useNavigate();

  const { accessToken } = useSelector(
    (state) => state.parentAuth
  );

  
  if (!accessToken) {
    navigate("/parent/login", { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-4xl mx-auto">

        {/* ===== Header ===== */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Parent Dashboard
          </h1>

          <button
            onClick={() => navigate("/parent/child-details")}
            className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            + Add Child
          </button>
        </div>

        {/* ===== Welcome Card ===== */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-800">
            Welcome 👋
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your child’s learning and track progress here.
          </p>
        </div>

        {/* ===== Child Section ===== */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-4">
            Your Children
          </h3>

          {/* 🔹 Empty state (no child yet) */}
          <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-500 mb-3">
              You haven’t added any child yet.
            </p>

            <button
              onClick={() => navigate("/parent/child-details")}
              className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Add Child
            </button>
          </div>

         
        </div>

      </div>
    </div>
  );
};

export default ParentDashboard;
