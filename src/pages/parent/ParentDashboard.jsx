
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
import { useState } from "react";
import { setActiveStudent } from "../../features/parent/parentStudentsSlice";
import { useNavigate } from "react-router-dom";
import { CheckCircle, BookOpen, Calendar } from "lucide-react";

const ParentDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);

  const { students, activeStudent } = useSelector(
    (state) => state.parentStudents
  );

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
  styles={{
    content: {
      borderRadius: 20,
      padding: 20,
    },
    header: {
      borderBottom: "1px solid #F1F3F5",
      marginBottom: 10,
    },
  }}
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
            backgroundColor: isActive
              ? "#F5F3FF"
              : "white",
            transition: "all 0.2s ease",
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

    {/* Add Student Button */}
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
