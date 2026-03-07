
import {
  Card,
  Text,
  Avatar,
  Button,
  Loader,
} from "@mantine/core";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNewTutorCourses,
  fetchTutorCourses, 
} from "../../features/tutor/course/tutorCourseSlice";
import { useNavigate } from "react-router-dom";

const TutorDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { newCourses, courses, loading } = useSelector(
    (state) => state.tutorCourses
  );

  /* ✅ FETCH BOTH DATASETS ON FIRST LOAD */
  useEffect(() => {
    dispatch(fetchNewTutorCourses());
    dispatch(fetchTutorCourses()); // ✅ IMPORTANT FIX
  }, [dispatch]);

  /* ✅ ACTIVE COURSES */
  const activeCourses = useMemo(() => {
    return (
      courses?.filter(
        (c) =>
          c.paymentStatus === "paid" &&
          c.courseStatus === "active"
      ) || []
    );
  }, [courses]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader color="teal" />
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-6 bg-white min-h-screen">

      {/* HEADER */}
      <div className="mb-8">
        <Text size="xl" fw={700}>
          Welcome back...
        </Text>
        <Text size="sm" c="dimmed">
          Manage your assigned courses and learning plans
        </Text>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <StatCard
          title="New Courses"
          value={newCourses?.length || 0}
        />

        <StatCard
          title="Active Courses"
          value={activeCourses.length}
        />

        {/* If you don't need duplicates, you can remove these */}
        <StatCard
          title="Active Courses"
          value={activeCourses.length}
        />

        <StatCard
          title="Active Courses"
          value={activeCourses.length}
        />

      </div>

      {/* ================= COURSE LIST ================= */}
      <Card radius="xl" shadow="sm" p="lg" withBorder>
        <Text fw={600} size="md" mb="md">
          Pending Learning Plans
        </Text>

        {newCourses?.length === 0 && (
          <div className="text-center py-10">
            <Text size="sm" c="dimmed">
              No new course requests...
            </Text>
          </div>
        )}

        <div className="space-y-4">
          {newCourses?.map((course) => (
            <Card
              key={course._id}
              radius="xl"
              shadow="xs"
              p="md"
              withBorder
              className="hover:shadow-sm transition"
            >
              <div className="flex items-center justify-between gap-4">

                {/* LEFT */}
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar radius="xl" color="teal" size="md">
                    {course.studentId?.name?.charAt(0)}
                  </Avatar>

                  <div className="min-w-0">
                    <Text fw={600} size="sm" className="truncate">
                      {course.subject}
                    </Text>

                    <Text size="xs" c="dimmed" className="truncate">
                      {course.studentId?.name} • Grade {course.classLevel}
                    </Text>
                  </div>
                </div>

                {/* RIGHT */}
                <Button
                  radius="xl"
                  color="teal"
                  size="sm"
                  onClick={() =>
                    navigate(
                      `/tutor/new-courses/${course._id}/create-plan`
                    )
                  }
                >
                  Create Plan
                </Button>

              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <Card radius="xl" shadow="sm" p="lg" withBorder>
    <Text size="sm" c="dimmed">
      {title}
    </Text>
    <Text size="xl" fw={700} mt={4}>
      {value}
    </Text>
  </Card>
);

export default TutorDashboard;