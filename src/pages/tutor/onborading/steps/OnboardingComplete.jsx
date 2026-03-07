
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Clock, XCircle, LogOut } from "lucide-react";
import { tutorLogout } from "../../../../features/tutor/auth/tutorAuthSlice";

const STATUS_MAP = {
  submitted: {
    label: "Under Review",
    color: "text-yellow-600",
    icon: Clock,
  },
  approved: {
    label: "Approved",
    color: "text-green-600",
    icon: CheckCircle,
  },
  rejected: {
    label: "Rejected",
    color: "text-red-600",
    icon: XCircle,
  },
};

const OnboardingComplete = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tutor } = useSelector(
    (state) => state.tutorOnboarding
  );

  const status = tutor?.onboardingStatus || "submitted";
  const statusConfig =
    STATUS_MAP[status] || STATUS_MAP.submitted;

  const StatusIcon = statusConfig.icon;

  const handleLogout = () => {
    dispatch(tutorLogout());
    navigate("/tutor/login");
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <div className="bg-white rounded-xl border border-gray-200 shadow-[0_6px_18px_rgba(0,0,0,0.05)] px-8 py-8 text-center">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center">
            <StatusIcon
              className={`w-7 h-7 ${statusConfig.color}`}
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Profile Submitted
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-gray-600 mb-6">
          Your tutor profile has been successfully submitted and
          is currently under review by our admin team.
        </p>

        {/* Status Card */}
        <div className="border border-gray-200 rounded-lg p-5 text-left bg-gray-50 mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">
              Profile Status
            </span>
            <span
              className={`font-medium ${statusConfig.color}`}
            >
              {statusConfig.label}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">
              Admin Approval
            </span>
            <span className="font-medium text-gray-700">
              {status === "approved"
                ? "Completed"
                : "Pending"}
            </span>
          </div>
        </div>

        {/* Info Section */}
        <div className="text-left bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold text-blue-700 mb-2">
            What happens next?
          </h3>

          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Our admin team will verify your qualifications.</li>
            <li>• This process usually takes 24–48 hours.</li>
            <li>• Once approved, your tutor dashboard will be activated.</li>
            <li>• Students will then be able to book sessions with you.</li>
          </ul>
        </div>

        {/* Footer Text */}
        {status === "rejected" ? (
          <p className="text-xs text-red-600 mb-6">
            Your profile was rejected. Please review the
            feedback from admin and update your details.
          </p>
        ) : (
          <p className="text-xs text-gray-500 mb-6">
            You will receive a notification once your profile
            is approved.
          </p>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-full text-sm font-medium hover:bg-gray-900 transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default OnboardingComplete;
