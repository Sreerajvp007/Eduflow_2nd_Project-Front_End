
// import { useDispatch, useSelector } from "react-redux";
// import { Card, Text, Button } from "@mantine/core";
// import {
//   createPaymentOrder,
//   verifyFirstPayment,
//   prevStep,
// } from "../../../features/parent/parentCourseSlice";

// const PaymentStep = () => {
//   const dispatch = useDispatch();

//   const {
//     selectedTutor,
//     selectedSubject,
//     startDate,
//     timeSlot,
//     loading,
//   } = useSelector((state) => state.parentCourse);

//   const { activeStudent } = useSelector(
//     (state) => state.parentStudents
//   );

//   if (!activeStudent) {
//     return <Text>No student selected.</Text>;
//   }

//   const monthlyFee = selectedTutor?.hourlyRate * 20;

//   const handlePayment = async () => {
//   try {
//     const orderRes = await dispatch(
//       createPaymentOrder(monthlyFee)
//     ).unwrap();

//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY,
//       amount: orderRes.amount,
//       currency: "INR",
//       name: "Course Payment",
//       description: "Monthly course payment",
//       order_id: orderRes.id,
//        method: {
//     upi: true,
//     card: true,
//     netbanking: true,
//     wallet: true
//   },

//       handler: async function (response) {

//         await dispatch(
//           verifyFirstPayment({
//             ...response,
//             courseData: {
//               studentId: activeStudent._id,
//               tutorId: selectedTutor._id,
//               subject: selectedSubject,
//               startDate,
//               timeSlot,
//               monthlyFee,
//               classLevel: activeStudent.classLevel,
//             },
//           })
//         ).unwrap();

//       },

//       theme: {
//         color: "#6366f1",
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();

//   } catch (err) {
//     console.error(err);
//   }
// };
//   return (
//    <>
//   <div className="w-full flex justify-center px-4">
//     <Card
//       radius="xl"
//       shadow="sm"
//       className="w-full max-w-xl lg:max-w-2xl"
//       style={{
//         padding: "32px",
//         border: "1px solid #e5e7eb",
//       }}
//     >
//       {/* Subject Highlight */}
//       <div
//         style={{
//           border: "2px solid #a78bfa",
//           borderRadius: "14px",
//           padding: "14px",
//           marginBottom: "20px",
//         }}
//       >
//         <Text size="sm" c="dimmed">
//           Subject
//         </Text>
//         <Text fw={600} size="md">
//           {selectedSubject}
//         </Text>
//       </div>

//       {/* Teacher */}
//       <div className="mb-5">
//         <Text size="sm" c="dimmed" mb={4}>
//           Your Teacher
//         </Text>
//         <div className="bg-gray-100 rounded-lg px-4 py-2">
//           {selectedTutor?.fullName}
//         </div>
//       </div>

//       {/* Start Date */}
//       <div className="mb-5">
//         <Text size="sm" c="dimmed" mb={4}>
//           Starting Date
//         </Text>
//         <div className="bg-gray-100 rounded-lg px-4 py-2">
//           {startDate
//             ? new Date(startDate).toDateString()
//             : ""}
//         </div>
//       </div>

//       {/* Time Slot (NEW) */}
//       <div className="mb-5">
//         <Text size="sm" c="dimmed" mb={4}>
//           Time
//         </Text>
//         <div className="bg-gray-100 rounded-lg px-4 py-2">
//           {timeSlot}
//         </div>
//       </div>

//       {/* Monthly Fee */}
//       <div className="mb-6">
//         <Text size="sm" c="dimmed" mb={4}>
//           Monthly Fees
//         </Text>
//         <div className="bg-gray-100 rounded-lg px-4 py-2 font-semibold">
//           ₹{monthlyFee}
//         </div>
//       </div>

//       {/* Helper Text */}
//       <Text
//         size="xs"
//         c="dimmed"
//         ta="center"
//         mb="lg"
//       >
//         You can pay next payments before the due dates
//       </Text>

//       {/* Pay Button */}
//      <div className="flex flex-col sm:flex-row gap-4 mt-6">
  
//   {/* Pay Button */}
//   <Button
//     radius="xl"
//     size="lg"
//     fullWidth
//     loading={loading}
//     onClick={handlePayment}
//     className="order-1 sm:order-2"
//     style={{
//       background:
//         "linear-gradient(90deg, #6366f1, #ec4899)",
//       color: "white",
//       fontWeight: 600,
//     }}
//   >
//     Pay For This Month
//   </Button>

//   {/* Back Button */}
//   <Button
//     radius="xl"
//     size="lg"
//     variant="outline"
//     fullWidth
//     onClick={() => dispatch(prevStep())}
//     className="order-2 sm:order-1"
//     style={{
//       borderColor: "#d1d5db",
//       color: "#374151",
//       fontWeight: 500,
//     }}
//   >
//     ← Back
//   </Button>

// </div>
//     </Card>
//   </div>

  
// </>
//   );
// };

// export default PaymentStep;

import { useDispatch, useSelector } from "react-redux";
import { Card, Text, Button } from "@mantine/core";
import {
  createPaymentOrder,
  verifyFirstPayment,
  prevStep,
} from "../../../features/parent/parentCourseSlice";

const PaymentStep = () => {
  const dispatch = useDispatch();

  const {
    selectedTutor,
    selectedSubject,
    startDate,
    timeSlot,
    loading,
  } = useSelector((state) => state.parentCourse);

  const { activeStudent } = useSelector(
    (state) => state.parentStudents
  );

  if (!activeStudent) {
    return <Text>No student selected.</Text>;
  }

  if (!selectedTutor) {
    return <Text>Please select a tutor.</Text>;
  }

  const monthlyFee = Number(selectedTutor?.hourlyRate || 0) * 20;

  const handlePayment = async () => {
    console.log("Razorpay key:", import.meta.env.VITE_RAZORPAY_KEY);
    try {
      console.log("Payment clicked");

      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load.");
        return;
      }

      if (!monthlyFee || monthlyFee <= 0) {
        alert("Invalid monthly fee.");
        return;
      }

      // Create Razorpay order
      const orderRes = await dispatch(
        createPaymentOrder(monthlyFee)
      ).unwrap();

      console.log("Order response:", orderRes);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: orderRes.amount,
        currency: "INR",
        name: "Course Payment",
        description: "Monthly course payment",
        order_id: orderRes.id,

        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },

        handler: async function (response) {
          console.log("Payment success:", response);

          await dispatch(
            verifyFirstPayment({
              ...response,
              courseData: {
                studentId: activeStudent._id,
                tutorId: selectedTutor._id,
                subject: selectedSubject,
                startDate,
                timeSlot,
                monthlyFee,
                classLevel: activeStudent.classLevel,
              },
            })
          ).unwrap();
        },

        modal: {
          ondismiss: function () {
            console.log("Payment popup closed");
          },
        },

        theme: {
          color: "#6366f1",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment initialization failed");
    }
  };

  return (
    <div className="w-full flex justify-center px-4">
      <Card
        radius="xl"
        shadow="sm"
        className="w-full max-w-xl lg:max-w-2xl"
        style={{
          padding: "32px",
          border: "1px solid #e5e7eb",
        }}
      >
        {/* Subject */}
        <div
          style={{
            border: "2px solid #a78bfa",
            borderRadius: "14px",
            padding: "14px",
            marginBottom: "20px",
          }}
        >
          <Text size="sm" c="dimmed">
            Subject
          </Text>
          <Text fw={600} size="md">
            {selectedSubject}
          </Text>
        </div>

        {/* Teacher */}
        <div className="mb-5">
          <Text size="sm" c="dimmed" mb={4}>
            Your Teacher
          </Text>
          <div className="bg-gray-100 rounded-lg px-4 py-2">
            {selectedTutor?.fullName}
          </div>
        </div>

        {/* Start Date */}
        <div className="mb-5">
          <Text size="sm" c="dimmed" mb={4}>
            Starting Date
          </Text>
          <div className="bg-gray-100 rounded-lg px-4 py-2">
            {startDate
              ? new Date(startDate).toDateString()
              : ""}
          </div>
        </div>

        {/* Time Slot */}
        <div className="mb-5">
          <Text size="sm" c="dimmed" mb={4}>
            Time
          </Text>
          <div className="bg-gray-100 rounded-lg px-4 py-2">
            {timeSlot}
          </div>
        </div>

        {/* Fee */}
        <div className="mb-6">
          <Text size="sm" c="dimmed" mb={4}>
            Monthly Fees
          </Text>
          <div className="bg-gray-100 rounded-lg px-4 py-2 font-semibold">
            ₹{monthlyFee}
          </div>
        </div>

        <Text size="xs" c="dimmed" ta="center" mb="lg">
          You can pay next payments before the due dates
        </Text>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button
            radius="xl"
            size="lg"
            fullWidth
            loading={loading}
            onClick={handlePayment}
            style={{
              background:
                "linear-gradient(90deg, #6366f1, #ec4899)",
              color: "white",
              fontWeight: 600,
            }}
          >
            Pay For This Month
          </Button>

          <Button
            radius="xl"
            size="lg"
            variant="outline"
            fullWidth
            onClick={() => dispatch(prevStep())}
            style={{
              borderColor: "#d1d5db",
              color: "#374151",
              fontWeight: 500,
            }}
          >
            ← Back
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PaymentStep;