// import {
//   Card,
//   Text,
//   Avatar,
//   Loader,
//   Pagination,
//   Badge,
// } from "@mantine/core";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchParentPayments } from "../../features/parent/parentPaymentSlice";

// const ParentPayments = () => {

//   const dispatch = useDispatch();
  

//   const { payments, loading, page, totalPages } =
//     useSelector((state) => state.parentPayments);
//     const { activeStudent } =
//   useSelector((state) => state.parentStudents);

// useEffect(() => {

//   if (activeStudent?._id) {

//     dispatch(
//       fetchParentPayments({
//         studentId: activeStudent._id,
//         page: 1,
//       })
//     );

//   }

// }, [dispatch, activeStudent]);

//  const handlePage = (value) => {

//   dispatch(
//     fetchParentPayments({
//       studentId: activeStudent._id,
//       page: value,
//     })
//   );

// };
//   return (
//     <div className="max-w-5xl mx-auto px-4 pb-24">

//       <h2 className="text-2xl font-semibold text-gray-800 pt-6">
//         Payment History
//       </h2>

//       <div className="mt-6 space-y-4">

//         {loading && (
//           <div className="flex justify-center">
//             <Loader color="indigo" />
//           </div>
//         )}

//         {!loading && payments.length === 0 && (
//           <Card radius="xl" shadow="sm" p="lg" withBorder>
//             <Text c="dimmed" align="center">
//               No payments found
//             </Text>
//           </Card>
//         )}

//         {payments.map((payment) => (

//           <Card
//             key={payment._id}
//             radius="xl"
//             shadow="sm"
//             p="lg"
//             withBorder
//             className="hover:shadow-md transition"
//           >

//             <div className="flex justify-between items-center">

//               <div className="flex items-center gap-4">

//                 <Avatar
//                   src={payment.courseId?.tutorId?.profileImage}
//                   radius="xl"
//                 />

//                 <div>

//                   <Text fw={600}>
//                     {payment.courseId?.subject}
//                   </Text>

//                   <Text size="sm" c="dimmed">
//                     Tutor: {payment.courseId?.tutorId?.fullName}
//                   </Text>

//                 </div>

//               </div>

//               <Badge
//                 color="green"
//                 variant="light"
//               >
//                 {payment.status}
//               </Badge>

//             </div>

//             <div className="flex justify-between mt-4 text-sm text-gray-600">

//               <div>

//                 <p className="text-xs text-gray-400">
//                   Payment Date
//                 </p>

//                 <p>
//                   {new Date(payment.createdAt).toLocaleDateString()}
//                 </p>

//               </div>

//               <div>

//                 <p className="text-xs text-gray-400">
//                   Amount
//                 </p>

//                 <p className="font-semibold text-indigo-600">
//                   ₹{payment.amount}
//                 </p>

//               </div>

//               <div>

//                 <p className="text-xs text-gray-400">
//                   Billing Month
//                 </p>

//                 <p>
//                   {new Date(payment.billingMonth).toLocaleDateString()}
//                 </p>

//               </div>

//             </div>

//           </Card>

//         ))}

//       </div>

//       {totalPages > 1 && (

//         <div className="flex justify-center mt-8">

//           <Pagination
//             value={page}
//             total={totalPages}
//             onChange={handlePage}
//           />

//         </div>

//       )}

//     </div>
//   );
// };

// export default ParentPayments;
import {
  Card,
  Text,
  Avatar,
  Loader,
  Pagination,
  Badge,
  TextInput,
  Select,
  Group
} from "@mantine/core";

import { Search } from "lucide-react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchParentPayments } from "../../features/parent/parentPaymentSlice";

const ParentPayments = () => {

  const dispatch = useDispatch();

  const { payments, loading, page, totalPages } =
    useSelector((state) => state.parentPayments);

  const { activeStudent } =
    useSelector((state) => state.parentStudents);

  /* ---------------- FILTER STATES ---------------- */

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [month, setMonth] = useState("");

  /* ---------------- FETCH PAYMENTS ---------------- */

  useEffect(() => {

    if (activeStudent?._id) {

      dispatch(
        fetchParentPayments({
          studentId: activeStudent._id,
          page: 1,
          search,
          status,
          month
        })
      );

    }

  }, [dispatch, activeStudent, search, status, month]);

  /* ---------------- PAGINATION ---------------- */

  const handlePage = (value) => {

    dispatch(
      fetchParentPayments({
        studentId: activeStudent._id,
        page: value,
        search,
        status,
        month
      })
    );

  };

  return (
    <div className="max-w-5xl mx-auto px-4 pb-24">

      {/* PAGE TITLE */}

      <h2 className="text-2xl font-semibold text-gray-800 pt-6">
        Payment History
      </h2>

      {/* SEARCH + FILTERS */}

      <div className="mt-6">

        <Group grow>

          <TextInput
            placeholder="Search subject or tutor"
            leftSection={<Search size={16} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />

          <Select
            placeholder="Filter Status"
            data={[
              { value: "paid", label: "Paid" },
              { value: "failed", label: "Failed" }
            ]}
            value={status}
            onChange={setStatus}
            clearable
          />

          <TextInput
            type="month"
            value={month}
            onChange={(e) => setMonth(e.currentTarget.value)}
          />

        </Group>

     </div>

{/* PAYMENT LIST */}

<div className="mt-6 space-y-4">

  {!loading && (
    <Text size="sm" c="dimmed" mb="sm">
      {payments.length} payment{payments.length !== 1 && "s"} found
    </Text>
  )}

        {loading && (
          <div className="flex justify-center">
            <Loader color="indigo" />
          </div>
        )}

        {!loading && payments.length === 0 && (

          <Card radius="xl" shadow="sm" p="lg" withBorder>

            <Text c="dimmed" align="center">
              No payments found
            </Text>

          </Card>

        )}

        {payments.map((payment) => (

          <Card
            key={payment._id}
            radius="xl"
            shadow="sm"
            p="lg"
            withBorder
            className="hover:shadow-md transition"
          >

            {/* HEADER */}

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-4">

                <Avatar
                  src={payment.courseId?.tutorId?.profileImage}
                  radius="xl"
                />

                <div>

                  <Text fw={600}>
                    {payment.courseId?.subject}
                  </Text>

                  <Text size="sm" c="dimmed">
                    Tutor: {payment.courseId?.tutorId?.fullName}
                  </Text>

                </div>

              </div>

              <Badge
                color={payment.status === "paid" ? "green" : "red"}
                variant="light"
              >
                {payment.status}
              </Badge>

            </div>

            {/* PAYMENT DETAILS */}

            <div className="flex justify-between mt-4 text-sm text-gray-600">

              <div>

                <p className="text-xs text-gray-400">
                  Payment Date
                </p>

                <p>
                  {new Date(payment.createdAt).toLocaleDateString()}
                </p>

              </div>

              <div>

                <p className="text-xs text-gray-400">
                  Amount
                </p>

                <p className="font-semibold text-indigo-600">
                  ₹{payment.amount}
                </p>

              </div>

              <div>

                <p className="text-xs text-gray-400">
                  Billing Month
                </p>

                <p>
                  {new Date(payment.billingMonth).toLocaleDateString()}
                </p>

              </div>

            </div>

          </Card>

        ))}

      </div>

      {/* PAGINATION */}

      {totalPages > 1 && (

        <div className="flex justify-center mt-8">

          <Pagination
            value={page}
            total={totalPages}
            onChange={handlePage}
          />

        </div>

      )}

    </div>
  );
};

export default ParentPayments;