
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import { fetchDashboardStats } from "../../features/admin/adminDashboardSlice";

// import {
//   fetchPendingTutors,
//   approveTutor,
//   rejectTutor,
// } from "../../features/admin/adminTutorSlice";

// import {
//   Card,
//   Button,
//   Badge,
//   Group,
//   Text,
//   Title,
//   Loader,
//   Avatar,
//   Stack,
//   Pagination,
// } from "@mantine/core";

// const AdminDashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [page, setPage] = useState(1);

//   const { stats, loading: statsLoading } = useSelector(
//     (state) => state.adminDashboard
//   );

//   const {
//     pendingList,
//     pagination,
//     loading: tutorsLoading,
//   } = useSelector((state) => state.adminTutors);

//   useEffect(() => {
//     dispatch(fetchDashboardStats());
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(fetchPendingTutors({ page }));
//   }, [dispatch, page]);

//   const handleApprove = async (id) => {
//     await dispatch(approveTutor(id));
//     dispatch(fetchPendingTutors({ page }));
//   };

//   const handleReject = async (id) => {
//     await dispatch(rejectTutor({ id, reason: "Not eligible" }));
//     dispatch(fetchPendingTutors({ page }));
//   };

//   return (
//     <Stack className="p-4 md:p-6" gap="xl">
      
//       {/* ================= HEADER ================= */}

//       <div>
//         <Title order={2}>Admin Dashboard</Title>
//         <Text c="dimmed" size="sm" mt={4}>
//           Platform overview & tutor onboarding management
//         </Text>
//       </div>

//       {/* ================= KEY METRICS ================= */}

//       <div>
//         <Title order={4} mb="md">
//           Key Metrics
//         </Title>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

//           <StatCard
//             title="Total Students"
//             value={stats?.totalStudents ?? 0}
//             loading={statsLoading}
//           />

//           <StatCard
//             title="Total Tutors"
//             value={stats?.totalTutors ?? 0}
//             loading={statsLoading}
//           />

//           <StatCard
//             title="Total Course Purchases"
//             value={stats?.totalPurchases ?? 0}
//             loading={statsLoading}
//           />

//           <StatCard
//             title="Active Courses"
//             value={stats?.activeCourses ?? 0}
//             loading={statsLoading}
//           />

//         </div>
//       </div>

//       {/* ================= PENDING TUTORS ================= */}

//       <Card shadow="sm" radius="md" withBorder p="lg">

//         <Group justify="space-between" mb="md">

//           <Title order={4}>
//             Pending Tutor Verifications
//           </Title>

//           <Badge color="yellow" variant="light">
//             {pagination?.total ?? pendingList?.length ?? 0} Pending
//           </Badge>

//         </Group>

//         {tutorsLoading ? (

//           <Group justify="center" py="lg">
//             <Loader size="sm" />
//           </Group>

//         ) : pendingList?.length === 0 ? (

//           <div className="text-center py-10">
//             <Text size="sm" c="dimmed">
//               No pending tutor requests
//             </Text>
//           </div>

//         ) : (

//           <>
//             <div className="space-y-4">

//               {pendingList.map((tutor) => (

//                 <Card
//                   key={tutor._id}
//                   radius="md"
//                   shadow="xs"
//                   p="md"
//                   withBorder
//                   className="hover:shadow-sm transition"
//                 >

//                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

//                     {/* LEFT SIDE */}

//                     <div className="flex items-start sm:items-center gap-3 min-w-0">

//                       <Avatar radius="xl" src={tutor.profileImage}>
//                         {tutor.fullName?.charAt(0)}
//                       </Avatar>

//                       <div className="min-w-0">

//                         <Text fw={600} size="sm">
//                           {tutor.fullName}
//                         </Text>

//                         <Text size="xs" c="dimmed">
//                           {tutor.email}
//                         </Text>

//                         <Text size="xs" c="dimmed" mt={4}>
//                           Subjects: {tutor.subjects?.join(", ") || "—"}
//                         </Text>

//                         <Text size="xs" c="dimmed">
//                           Applied:{" "}
//                           {new Date(tutor.createdAt).toLocaleDateString()}
//                         </Text>

//                       </div>

//                     </div>

//                     {/* RIGHT SIDE BUTTONS */}

//                     <Group
//                       gap="xs"
//                       className="flex-wrap sm:flex-nowrap justify-start sm:justify-end"
//                     >

//                       <Button
//                         size="xs"
//                         variant="light"
//                         radius="xl"
//                         onClick={() => navigate(`/admin/tutors/${tutor._id}`)}
//                       >
//                         View
//                       </Button>

//                       <Button
//                         size="xs"
//                         radius="xl"
//                         color="green"
//                         onClick={() => handleApprove(tutor._id)}
//                       >
//                         Approve
//                       </Button>

//                       <Button
//                         size="xs"
//                         radius="xl"
//                         variant="light"
//                         color="red"
//                         onClick={() => handleReject(tutor._id)}
//                       >
//                         Reject
//                       </Button>

//                     </Group>

//                   </div>

//                 </Card>

//               ))}

//             </div>

//             {/* ================= PAGINATION ================= */}

//             {pagination && (

//               <Group justify="flex-end" mt="lg">

//                 <Pagination
//                   total={pagination.totalPages}
//                   value={page}
//                   onChange={setPage}
//                   size="sm"
//                 />

//               </Group>

//             )}

//           </>

//         )}

//       </Card>

//     </Stack>
//   );
// };


// /* ================= STAT CARD ================= */

// const StatCard = ({ title, value, loading }) => (

//   <Card
//     radius="md"
//     shadow="sm"
//     p="md"
//     withBorder
//   >

//     <Text size="xs" c="dimmed">
//       {title}
//     </Text>

//     {loading ? (

//       <Loader size="sm" mt="xs" />

//     ) : (

//       <Text fw={600} size="lg">
//         {value}
//       </Text>

//     )}

//   </Card>

// );

// export default AdminDashboard;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchDashboardStats } from "../../features/admin/adminDashboardSlice";
import { fetchAnalytics } from "../../features/admin/adminAnalyticsSlice";

import {
  fetchPendingTutors,
  approveTutor,
  rejectTutor,
} from "../../features/admin/adminTutorSlice";

import {
  Card,
  Button,
  Badge,
  Group,
  Text,
  Title,
  Loader,
  Avatar,
  Stack,
  Pagination,
} from "@mantine/core";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const { stats, loading: statsLoading } = useSelector(
    (state) => state.adminDashboard
  );

  const {
    pendingList,
    pagination,
    loading: tutorsLoading,
  } = useSelector((state) => state.adminTutors);

  const { data: analytics, loading: analyticsLoading } = useSelector(
    (state) => state.adminAnalytics
  );

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchAnalytics());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPendingTutors({ page }));
  }, [dispatch, page]);

  const handleApprove = async (id) => {
    await dispatch(approveTutor(id));
    dispatch(fetchPendingTutors({ page }));
  };

  const handleReject = async (id) => {
    await dispatch(rejectTutor({ id, reason: "Not eligible" }));
    dispatch(fetchPendingTutors({ page }));
  };

  /* ================= CHART DATA ================= */

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const revenueData = analytics?.monthlyRevenue?.map(item => ({
    month: months[item._id - 1],
    revenue: item.revenue
  })) || [];

  const purchaseData = analytics?.purchases?.map(item => ({
    month: months[item._id - 1],
    courses: item.courses
  })) || [];

  return (
    <Stack className="p-4 md:p-6" gap="xl">

      {/* HEADER */}
      <div>
        <Title order={2}>Admin Dashboard</Title>
        <Text c="dimmed" size="sm" mt={4}>
          Platform overview & tutor onboarding management
        </Text>
      </div>

      {/* ================= 🔥 PENDING TUTORS (TOP) ================= */}

      {!tutorsLoading && pendingList?.length > 0 && (
        <Card shadow="sm" radius="md" withBorder p="lg">

          <Group justify="space-between" mb="md">
            <Title order={4}>Pending Tutor Verifications</Title>

            <Badge color="yellow" variant="light">
              {pagination?.total ?? pendingList.length} Pending
            </Badge>
          </Group>

          <div className="space-y-4">

            {pendingList.map((tutor) => (

              <Card
                key={tutor._id}
                radius="md"
                shadow="xs"
                p="md"
                withBorder
                className="hover:shadow-sm transition"
              >

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                  {/* LEFT */}
                  <div className="flex items-start sm:items-center gap-3">

                    <Avatar radius="xl" src={tutor.profileImage}>
                      {tutor.fullName?.charAt(0)}
                    </Avatar>

                    <div>
                      <Text fw={600} size="sm">
                        {tutor.fullName}
                      </Text>

                      <Text size="xs" c="dimmed">
                        {tutor.email}
                      </Text>

                      <Text size="xs" c="dimmed" mt={4}>
                        Subjects: {tutor.subjects?.join(", ") || "—"}
                      </Text>

                      <Text size="xs" c="dimmed">
                        Applied:{" "}
                        {new Date(tutor.createdAt).toLocaleDateString()}
                      </Text>
                    </div>

                  </div>

                  {/* RIGHT */}
                  <Group gap="xs">

                    <Button
                      size="xs"
                      variant="light"
                      radius="xl"
                      onClick={() =>
                        navigate(`/admin/tutors/${tutor._id}`)
                      }
                    >
                      View
                    </Button>

                    <Button
                      size="xs"
                      radius="xl"
                      color="green"
                      onClick={() => handleApprove(tutor._id)}
                    >
                      Approve
                    </Button>

                    <Button
                      size="xs"
                      radius="xl"
                      variant="light"
                      color="red"
                      onClick={() => handleReject(tutor._id)}
                    >
                      Reject
                    </Button>

                  </Group>

                </div>

              </Card>

            ))}

          </div>

          {/* PAGINATION */}
          {pagination && (
            <Group justify="flex-end" mt="lg">
              <Pagination
                total={pagination.totalPages}
                value={page}
                onChange={setPage}
                size="sm"
              />
            </Group>
          )}

        </Card>
      )}

      {/* ================= KEY METRICS ================= */}

      <div>
        <Title order={4} mb="md">Key Metrics</Title>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <StatCard
            title="Total Students"
            value={stats?.totalStudents ?? 0}
            loading={statsLoading}
          />

          <StatCard
            title="Total Tutors"
            value={stats?.totalTutors ?? 0}
            loading={statsLoading}
          />

          <StatCard
            title="Total Purchases"
            value={stats?.totalPurchases ?? 0}
            loading={statsLoading}
          />

          <StatCard
            title="Total Revenue"
            value={`₹${analytics?.totalRevenue ?? 0}`}
            loading={analyticsLoading}
          />

        </div>
      </div>

      {/* ================= CHARTS ================= */}

      <Card shadow="sm" radius="md" withBorder p="lg">

        <Title order={4} mb="md">Revenue & Purchases</Title>

        {analyticsLoading ? (
          <Group justify="center" py="lg">
            <Loader size="sm" />
          </Group>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            <Card radius="lg" shadow="xs" p="md">
              <Text fw={500} mb="sm">Revenue Trend</Text>

              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#4F46E5"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card radius="lg" shadow="xs" p="md">
              <Text fw={500} mb="sm">Course Purchases</Text>

              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={purchaseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="courses"
                    fill="#10B981"
                    radius={[6,6,0,0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>

          </div>
        )}

      </Card>

    </Stack>
  );
};

/* ================= STAT CARD ================= */

const StatCard = ({ title, value, loading }) => (
  <Card radius="md" shadow="sm" p="md" withBorder>
    <Text size="xs" c="dimmed">{title}</Text>

    {loading ? (
      <Loader size="sm" mt="xs" />
    ) : (
      <Text fw={600} size="lg">{value}</Text>
    )}
  </Card>
);

export default AdminDashboard;