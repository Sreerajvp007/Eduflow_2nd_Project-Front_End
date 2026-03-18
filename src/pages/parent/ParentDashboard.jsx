
import {
  Card,
  Text,
  Title,
  Button,
  Modal,
  Group,
  Avatar,
  Stack,
} from "@mantine/core";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { setActiveStudent } from "../../features/parent/parentStudentsSlice";
import { fetchParentCourses } from "../../features/parent/parentCourseListSlice";
import { fetchParentSessions } from "../../features/parent/parentSessionSlice"; // ✅ added

import { useNavigate } from "react-router-dom";
import { CheckCircle, BookOpen, Calendar } from "lucide-react";

const ParentDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [opened, setOpened] = useState(false);

  const { students, activeStudent } = useSelector(
    (state) => state.parentStudents
  );

  const { courses } = useSelector((state) => state.parentCourses);

  const { sessions } = useSelector((state) => state.parentSessions); // ✅ added

  // ✅ LIVE SESSION
  const liveSession = sessions?.find((s) => s.status === "live");

  /* ================= FETCH LIVE SESSION INIT ================= */
  useEffect(() => {
    dispatch(fetchParentSessions({ status: "live" }));
  }, [dispatch]);

 
useEffect(() => {
  console.log("Connecting SSE...");

  const es = new EventSource(
  `${import.meta.env.VITE_API_BASE_URL}/parent/sessions/stream`
);

  es.onopen = () => {
    console.log("✅ SSE CONNECTED");
  };

  es.onmessage = (e) => {
    console.log("🔥 SSE RECEIVED:", e.data);

    const data = JSON.parse(e.data);

    if (data.type === "SESSION_STARTED") {
      dispatch(fetchParentSessions({ status: "live" }));
    }
  };

  es.onerror = (err) => {
    console.log("❌ SSE ERROR", err);
  };

  return () => es.close();
}, [dispatch]);

  /* ================= FETCH COURSES ================= */
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

  const pendingCourses =
    courses?.filter(
      (course) => course.paymentStatus === "pending"
    ) || [];

  return (
    <div className="p-4 space-y-6">
      {/* ================= ACTIVE STUDENT CARD ================= */}
      <Card
        radius="xl"
        shadow="sm"
        withBorder
        style={{
          padding: 20,
          border: "1px solid #E5E7EB",
        }}
      >
        <Group justify="space-between">
          <Group>
            <Avatar
              radius="xl"
              size="lg"
              src={activeStudent?.profileImage}
            >
              {activeStudent?.name?.charAt(0)}
            </Avatar>

            <div>
              <Text fw={600} size="md">
                {activeStudent?.name || "No Student Selected"}
              </Text>

              <Text size="sm" c="dimmed">
                Grade {activeStudent?.grade}
              </Text>

              <Text size="xs" c="gray">
                {activeStudent?.board} Board
              </Text>
            </div>
          </Group>

          <Button
            variant="outline"
            radius="xl"
            onClick={() => setOpened(true)}
            styles={{
              root: {
                borderColor: "#8B5CF6",
                color: "#8B5CF6",
              },
            }}
          >
            Switch
          </Button>
        </Group>
      </Card>

      {/* ================= PAYMENT PENDING ================= */}
      {pendingCourses.length > 0 && (
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-2">
            <div>
              <h3 className="text-red-600 font-semibold text-lg">
                Payment Pending
              </h3>

              <p className="text-sm text-gray-500">
                Complete payment to continue accessing your courses
              </p>
            </div>

            <span className="self-start sm:self-auto bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
              {pendingCourses.length} Pending
            </span>
          </div>

          <div className="space-y-3">
            {pendingCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between hover:shadow-md transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {course.subject}
                  </p>

                  <p className="text-sm text-gray-500">
                    Tutor: {course.tutorId?.fullName}
                  </p>
                </div>

                <button
                  onClick={() =>
                    navigate(`/parent/courses/${course._id}/payment`, {
                      state: { course },
                    })
                  }
                  className="bg-red-500 hover:bg-red-600 text-white text-sm px-5 py-2 rounded-full transition"
                >
                  Pay Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= LIVE SESSION CARD (NEW) ================= */}
      {liveSession && (
  <Card
    radius="xl"
    p="lg"
    style={{
      background: "linear-gradient(135deg,#8B5CF6,#6366F1)",
      color: "white",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* 🔴 LIVE BADGE */}
    <div
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        background: "#FF4D4F",
        padding: "6px 12px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          background: "white",
          borderRadius: "50%",
          animation: "pulse 1.2s infinite",
        }}
      />
      LIVE NOW
    </div>

    {/* HEADER */}
    <Text size="xs" style={{ opacity: 0.8 }}>
      ONGOING SESSION
    </Text>

    <Text fw={700} size="lg" mt={4}>
      {liveSession.title}
    </Text>

    {/* TUTOR INFO */}
    <Group mt="md" gap="sm">
      <Avatar
        size="md"
        radius="xl"
        src={liveSession?.tutorId?.profileImage}
      >
        {liveSession?.tutorId?.fullName?.charAt(0)}
      </Avatar>

      <div>
        <Text size="sm" fw={600}>
          {liveSession?.tutorId?.fullName}
        </Text>

        <Text size="xs" style={{ opacity: 0.8 }}>
          {liveSession?.courseId?.subject}
        </Text>
      </div>
    </Group>

    {/* DATE */}
    <Text size="xs" mt="sm" style={{ opacity: 0.75 }}>
      📅 {new Date(liveSession.sessionDate).toLocaleDateString()}
    </Text>

    {/* JOIN BUTTON */}
    <Button
      fullWidth
      mt="md"
      radius="xl"
      styles={{
        root: {
          backgroundColor: "white",
          color: "#6366F1",
          fontWeight: 700,
          height: 44,
        },
      }}
      onClick={() =>
        navigate(
          `/parent/live/${liveSession.channelName}/${liveSession._id}`
        )
      }
    >
      JOIN LIVE CLASS
    </Button>

    {/* 🔥 Pulse animation */}
    <style>
      {`
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.7; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0.7; }
        }
      `}
    </style>
  </Card>
)}

      {/* ================= COURSE CARD ================= */}
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

          <Text size="xs" c="gray" mt={8}>
            Classes will be conducted live at the selected time slot.
          </Text>

          <Button
            fullWidth
            mt="md"
            radius="xl"
            disabled={!activeStudent}
            onClick={() => navigate("/parent/request-course")}
            style={{
              background: "linear-gradient(90deg,#8B5CF6,#6366F1)",
            }}
          >
            Choose a Subject
          </Button>
        </Stack>
      </Card>

      {/* ================= SWITCH MODAL ================= */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        radius="xl"
        title={
          <Text fw={600} size="lg">
            Switch Student
          </Text>
        }
      >
        <div className="space-y-3">
          {students.map((student) => {
            const isActive = activeStudent?._id === student._id;

            return (
              <Card
                key={student._id}
                withBorder
                radius="xl"
                shadow="sm"
                onClick={() => {
                  dispatch(setActiveStudent(student));
                  setOpened(false);
                }}
                style={{
                  cursor: "pointer",
                  border: isActive
                    ? "2px solid #8B5CF6"
                    : "1px solid #E5E7EB",
                }}
              >
                <Group justify="space-between">
                  <div>
                    <Text fw={600}>{student.name}</Text>
                    <Text size="sm" c="dimmed">
                      Grade {student.grade}
                    </Text>
                  </div>

                  {isActive && (
                    <Text size="xs" c="violet.6" fw={600}>
                      Active
                    </Text>
                  )}
                </Group>
              </Card>
            );
          })}

          <Button
            fullWidth
            mt="md"
            radius="xl"
            onClick={() => {
              setOpened(false);
              navigate("/parent/add-student");
            }}
            style={{
              background: "linear-gradient(90deg,#8B5CF6,#6366F1)",
            }}
          >
            + Add Student
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ParentDashboard;