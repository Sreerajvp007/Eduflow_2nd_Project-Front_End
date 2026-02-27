
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
} from "@mantine/core";
import { CheckCircle, BookOpen, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ParentCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courses, loading } = useSelector(
    (state) => state.parentCourses
  );

  const { activeStudent } = useSelector(
    (state) => state.parentStudents
  );

useEffect(() => {
  if (activeStudent?._id) {
    dispatch(fetchParentCourses(activeStudent._id));
  }
}, [dispatch, activeStudent]);

  return (
    <div className="px-4 pb-24">

      {/* ===== Heading ===== */}
      <div className="px-2 pt-6">
        <h2 className="text-xl font-semibold text-gray-800">
          My Courses
        </h2>
      </div>

      {/* ===== Existing Courses FIRST ===== */}
      <div className="mt-6 space-y-4">
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
            className="bg-white rounded-2xl shadow-md p-5 border border-gray-100"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-800">
                {course.subject}
              </h3>

              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  course.courseStatus === "active"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {course.courseStatus}
              </span>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <Avatar
                src={course.tutorId?.profileImage}
                radius="xl"
              />
              <div>
                <p className="text-sm font-medium">
                  {course.tutorId?.fullName}
                </p>
                <p className="text-xs text-gray-500">
                  {course.studentId?.name} • Grade {course.studentId?.grade}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
              <div>
                <p className="text-xs text-gray-400">Start Date</p>
                <p>
                  {new Date(course.startDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Time Slot</p>
                <p>{course.timeSlot}</p>
              </div>
            </div>

            <button
  onClick={() =>
    navigate(`/parent/courses/${course._id}`)
  }
  className="w-full mt-5 py-3 rounded-full 
  bg-gradient-to-r from-indigo-500 to-pink-500 
  text-white font-semibold shadow hover:opacity-90 transition"
>
  Let’s Study
</button>
          </div>
        ))}
      </div>

      {/* ===== Explore Course Card AT BOTTOM ===== */}
      <div className="mt-8">
        <Card
          radius="xl"
          shadow="sm"
          withBorder
          style={{
            padding: 20,
            border: "1px solid #E5E7EB",
          }}
        >
          <Stack gap={8}>
            <Title order={5}>Explore Our Courses</Title>

            <Text size="sm" c="dimmed">
              Need help in a subject for your child?
            </Text>

            <Text size="sm" c="dimmed">
              Get a personalized 1-to-1 learning Course
            </Text>

            <div style={{ marginTop: 12 }}>
              <Text fw={600} size="sm" mb={6}>
                How it works:
              </Text>

              <Stack gap={6}>
                <Group gap={6}>
                  <CheckCircle size={16} color="#6366F1" />
                  <Text size="sm">Choose a subject</Text>
                </Group>

                <Group gap={6}>
                  <BookOpen size={16} color="#6366F1" />
                  <Text size="sm">Select an available mentor</Text>
                </Group>

                <Group gap={6}>
                  <Calendar size={16} color="#6366F1" />
                  <Text size="sm">
                    Pick a time slot and start the course
                  </Text>
                </Group>
              </Stack>
            </div>

            <Button
              fullWidth
              mt="md"
              radius="xl"
              disabled={!activeStudent}
              onClick={() => navigate("/parent/request-course")}
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