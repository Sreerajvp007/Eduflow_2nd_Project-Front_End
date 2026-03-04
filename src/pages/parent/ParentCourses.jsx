

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchParentCourses } from "../../features/parent/parentCourseListSlice";
import {
  Loader,
  Avatar,
  Card,
  Text,
  Title,
  Button,
  Stack,
  Group,
  Pagination,
} from "@mantine/core";
import { CheckCircle, BookOpen, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ParentCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courses, loading, page, totalPages } =
    useSelector((state) => state.parentCourses);

  const { activeStudent } =
    useSelector((state) => state.parentStudents);

  useEffect(() => {
    if (activeStudent?._id) {
      dispatch(
        fetchParentCourses({
          studentId: activeStudent._id,
          page: 1,
        })
      );
    }
  }, [dispatch, activeStudent]);

  const handlePageChange = (value) => {
    dispatch(
      fetchParentCourses({
        studentId: activeStudent._id,
        page: value,
      })
    );
  };

  return (
    <div className="px-4 pb-24 max-w-5xl mx-auto">
      {/* ===== Heading ===== */}
      <div className="px-2 pt-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          My Courses
        </h2>
      </div>

      {/* ===== Course List ===== */}
      <div className="mt-6 space-y-5">
        {loading && (
          <div className="flex justify-center">
            <Loader color="indigo" />
          </div>
        )}

        {!loading && courses.length === 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center text-gray-500">
            No courses available
          </div>
        )}

        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 transition hover:shadow-lg"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <h3 className="font-semibold text-lg text-gray-800">
                {course.subject}
              </h3>

              <span
  className={`px-3 py-1 text-xs rounded-full font-medium w-fit ${
    course.paymentStatus === "pending"
      ? "bg-red-100 text-red-600"
      : course.courseStatus === "active"
      ? "bg-green-100 text-green-600"
      : "bg-gray-100 text-gray-500"
  }`}
>
  {course.paymentStatus === "pending"
    ? "Payment Pending"
    : course.courseStatus}
</span>
            </div>

            {/* Tutor Info */}
            <div className="flex items-center gap-3 mt-5">
              <Avatar
                src={course.tutorId?.profileImage}
                radius="xl"
              />
              <div>
                <p className="text-sm font-medium">
                  {course.tutorId?.fullName}
                </p>
                <p className="text-xs text-gray-500">
                  {course.studentId?.name} • Grade{" "}
                  {course.studentId?.grade}
                </p>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4 mt-5 text-sm text-gray-600">
              <div>
                <p className="text-xs text-gray-400">
                  Start Date
                </p>
                <p>
                  {new Date(
                    course.startDate
                  ).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Time Slot
                </p>
                <p>{course.timeSlot}</p>
              </div>
            </div>

            {/* Responsive Button */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

  {course.paymentStatus === "pending" && (
    <div className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-2 rounded-lg">
      Your payment is pending. Please complete it to continue accessing this
      course and upcoming sessions.
    </div>
  )}

  <div className="flex gap-3 md:ml-auto">

    {course.paymentStatus === "pending" && (
      <button
        onClick={() =>
            navigate(`/parent/courses/${course._id}/payment`, {
              state: { course }
            })
          }
        className="
          px-6 py-3
          rounded-full
          bg-red-500 text-white
          font-semibold
          hover:bg-red-600
          transition
        "
      >
        Pay Now
      </button>
    )}

    <button
      onClick={() =>
        navigate(`/parent/courses/${course._id}`)
      }
      className="
        px-8 py-3
        rounded-full
        bg-gradient-to-r from-indigo-500 to-pink-500
        text-white
        font-semibold
        shadow
        hover:opacity-90
        transition
      "
    >
      Overview
    </button>

  </div>

</div>
          </div>
        ))}
      </div>

      {/* ===== Pagination ===== */}
      {!loading && totalPages > 1 && (
        <div className="mt-8 flex justify-center md:justify-end">
          <Pagination
            total={totalPages}
            value={page}
            onChange={handlePageChange}
            siblings={1}
            boundaries={1}
          />
        </div>
      )}

      {/* ===== Explore Course Card ===== */}
      <div className="mt-12">
        <Card
          radius="xl"
          shadow="sm"
          withBorder
          className="p-6"
        >
          <Stack gap={10}>
            <Title order={5}>Explore Our Courses</Title>

            <Text size="sm" c="dimmed">
              Need help in a subject for your child?
            </Text>

            <Text size="sm" c="dimmed">
              Get a personalized 1-to-1 learning Course
            </Text>

            <div className="mt-4">
              <Text fw={600} size="sm" mb={8}>
                How it works:
              </Text>

              <Stack gap={8}>
                <Group gap={6}>
                  <CheckCircle size={16} color="#6366F1" />
                  <Text size="sm">Choose a subject</Text>
                </Group>

                <Group gap={6}>
                  <BookOpen size={16} color="#6366F1" />
                  <Text size="sm">
                    Select an available mentor
                  </Text>
                </Group>

                <Group gap={6}>
                  <Calendar size={16} color="#6366F1" />
                  <Text size="sm">
                    Pick a time slot and start
                  </Text>
                </Group>
              </Stack>
            </div>

            <Button
              fullWidth
              radius="xl"
              disabled={!activeStudent}
              onClick={() =>
                navigate("/parent/request-course")
              }
              style={{
                background:
                  "linear-gradient(90deg,#8B5CF6,#6366F1)",
              }}
            >
              Choose a Subject
            </Button>
          </Stack>
        </Card>
      </div>
    </div>
  );
};

export default ParentCourses;