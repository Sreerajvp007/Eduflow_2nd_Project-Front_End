import { useSelector } from "react-redux";
import { CheckCircle, Clock, XCircle } from "lucide-react";

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
  const { tutor } = useSelector(
    (state) => state.tutorOnboarding
  );

  const status = tutor?.onboardingStatus || "submitted";
  const statusConfig =
    STATUS_MAP[status] || STATUS_MAP.submitted;

  const StatusIcon = statusConfig.icon;

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
          Your profile has been submitted and is being reviewed
          by our admin team.
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

        {/* Footer Text */}
        {status === "rejected" ? (
          <p className="text-xs text-red-600">
            Your profile was rejected. Please check admin
            feedback and update your details.
          </p>
        ) : (
          <p className="text-xs text-gray-500">
            You will be notified once your profile is approved.
            This usually takes 24–48 hours.
          </p>
        )}
      </div>
    </div>
  );
};

export default OnboardingComplete;
