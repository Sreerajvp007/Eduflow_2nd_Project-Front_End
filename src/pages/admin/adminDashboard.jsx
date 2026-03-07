

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchDashboardStats } from "../../features/admin/adminDashboardSlice";

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

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const { stats, loading: statsLoading } = useSelector(
    (state) => state.adminDashboard,
  );

  const {
    pendingList,
    pagination,
    loading: tutorsLoading,
  } = useSelector((state) => state.adminTutors);

  useEffect(() => {
    dispatch(fetchDashboardStats());
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

  return (
    <Stack className="p-4 md:p-6" gap="xl">
      {/* ================= HEADER ================= */}
      <div>
        <Title order={2}>Admin Dashboard</Title>
        <Text c="dimmed" size="sm" mt={4}>
          Platform overview & tutor onboarding management
        </Text>
      </div>

      {/* ================= KEY METRICS ================= */}
      <div>
        <Title order={4} mb="md">
          Key Metrics
        </Title>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            title="Total Course Purchases"
            value={stats?.totalPurchases ?? 0}
            loading={statsLoading}
          />
          <StatCard
            title="Active Courses"
            value={stats?.activeCourses ?? 0}
            loading={statsLoading}
          />
        </div>
      </div>

      {/* ================= PENDING TUTORS ================= */}
      <Card shadow="sm" radius="xl" withBorder p="lg">
        <Group justify="space-between" mb="md">
          <Title order={4}>Pending Tutor Verifications</Title>

          <Badge color="yellow" variant="light">
            {pagination?.total ?? pendingList?.length ?? 0} Pending
          </Badge>
        </Group>

        {tutorsLoading ? (
          <Group justify="center" py="lg">
            <Loader size="sm" />
          </Group>
        ) : pendingList?.length === 0 ? (
          <div className="text-center py-10">
            <Text size="sm" c="dimmed">
              No pending tutor requests
            </Text>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {pendingList.map((tutor) => (
                <Card
                  key={tutor._id}
                  radius="xl"
                  shadow="xs"
                  p="md"
                  withBorder
                  className="hover:shadow-sm transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* LEFT SIDE */}
                    <div className="flex items-start sm:items-center gap-3 min-w-0">
                      <Avatar radius="xl" src={tutor.profileImage}>
                        {tutor.fullName?.charAt(0)}
                      </Avatar>

                      <div className="min-w-0">
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

                    {/* RIGHT SIDE BUTTONS */}
                    <Group
                      gap="xs"
                      className="flex-wrap sm:flex-nowrap justify-start sm:justify-end"
                    >
                      <Button
                        size="xs"
                        variant="light"
                        radius="xl"
                        onClick={() => navigate(`/admin/tutors/${tutor._id}`)}
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

            {/* ================= PAGINATION ================= */}

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
          </>
        )}
      </Card>
    </Stack>
  );
};

const StatCard = ({ title, value, loading }) => (
  <div className="bg-white rounded-3xl border border-gray-200 px-6 py-6 shadow-sm hover:shadow-md transition">
    <Text size="sm" c="dimmed">
      {title}
    </Text>

    {loading ? (
      <Loader size="sm" mt="md" />
    ) : (
      <Title order={2} mt="sm">
        {value}
      </Title>
    )}
  </div>
);

export default AdminDashboard;
