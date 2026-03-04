import { useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/axiosInstance";

const CoursePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const course = location.state?.course;

  const handlePayment = async () => {
    const orderRes = await api.post("/payments/create-order", {
      amount: course.monthlyFee,
    });

    const order = orderRes.data;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: "INR",
      name: "ParentFlow",
      description: "Course Payment",
      order_id: order.id,
handler: async function (response) {

  await api.post("/payments/verify-next", {
    ...response,
    courseId: course._id,
  });

  alert("Payment successful");

  // reload course overview
  navigate(`/parent/courses/${course._id}`, { replace: true });

},
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  if (!course) {
    return (
      <div className="p-6 text-center">
        Course not found
      </div>
    );
  }

  const dueDate = new Date(course.nextPaymentDate).toLocaleDateString();

 return (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

    <div className="w-full max-w-xl">

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">
        Complete Payment
      </h2>

      {/* Payment Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6">

        {/* Course Info */}
        <div className="flex items-center gap-4 mb-6">

          <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center font-semibold text-indigo-600">
            {course.subject.charAt(0)}
          </div>

          <div>
            <p className="font-semibold text-gray-800">
              {course.subject}
            </p>

            <p className="text-sm text-gray-500">
              Tutor: {course.tutorId?.fullName}
            </p>

            <p className="text-sm text-gray-500">
              Student: {course.studentId?.name}
            </p>
          </div>

        </div>

        {/* Payment Details */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-3">

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Monthly Fee</span>
            <span className="font-semibold text-gray-800">
              ₹{course.monthlyFee}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Next Payment Due</span>
            <span className="font-semibold text-gray-800">
              {new Date(course.nextPaymentDate).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Billing Cycle</span>
            <span className="font-semibold text-gray-800">
              Monthly
            </span>
          </div>

        </div>

      </div>

      {/* Info Card */}
      <div className="mt-6 bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm rounded-xl p-4">

        After completing this payment, your course access will continue and
        the next billing cycle will begin from the due date.

      </div>

      {/* Pay Button */}
      <button
        onClick={handlePayment}
        className="
        w-full mt-6
        py-3
        rounded-full
        font-semibold
        text-white
        bg-gradient-to-r from-red-500 to-pink-500
        shadow-md
        hover:shadow-lg
        transition
        "
      >
        Pay ₹{course.monthlyFee}
      </button>

    </div>

  </div>
);
};

export default CoursePayment;