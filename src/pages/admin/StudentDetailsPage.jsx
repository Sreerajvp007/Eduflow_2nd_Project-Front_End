
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Group,
  Stack,
  Text,
  Modal,
  Grid,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentDetails,
  updateStudentStatus,
} from "../../features/admin/studentSlice";
import { useParams } from "react-router-dom";

export default function StudentDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { details: student, loading } = useSelector(
    (state) => state.adminStudents
  );

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [targetStatus, setTargetStatus] = useState(null);

  useEffect(() => {
    dispatch(fetchStudentDetails(id));
  }, [id, dispatch]);

  if (loading) return <Text>Loading student details...</Text>;
  if (!student) return <Text>No student found</Text>;

  const isBlocked = student.status === "blocked";

  const handleToggleStatus = () => {
    const newStatus = isBlocked ? "active" : "blocked";
    setTargetStatus(newStatus);
    setConfirmOpen(true);
  };

  const handleConfirmAction = async () => {
    try {
      setActionLoading(true);

      await dispatch(
        updateStudentStatus({
          id: student._id,
          status: targetStatus,
        })
      ).unwrap();

      setConfirmOpen(false);
    } catch (error) {
      console.error("Failed to update student status:", error);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <Stack gap="lg">

      {/* ================= STUDENT PROFILE CARD ================= */}

      <Card withBorder radius="lg" p="lg">
        <Group justify="space-between" align="center">
          <Group>
            <Avatar
              size={72}
              radius="xl"
              src={student.profileImage || null}
            >
              {student.name?.charAt(0)}
            </Avatar>

            <Box>
              <Text fw={700} size="lg">
                {student.name}
              </Text>

              <Text size="sm" c="dimmed">
                Grade - {student.grade}
              </Text>

              <Badge mt={6} color={isBlocked ? "red" : "green"}>
                {student.status.toUpperCase()}
              </Badge>
            </Box>
          </Group>

          <Button
            color={isBlocked ? "green" : "red"}
            variant={isBlocked ? "light" : "filled"}
            onClick={handleToggleStatus}
            loading={actionLoading}
          >
            {isBlocked ? "Activate Student" : "Block Student"}
          </Button>
        </Group>
      </Card>

      {/* ================= TWO CARDS IN ONE ROW ================= */}

      <Grid>

        {/* STUDENT INFORMATION */}

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card withBorder radius="lg" p="lg" h="100%">
            <Text fw={600} mb="md">
              Student Information
            </Text>

            <Stack gap={8}>
              <InfoRow label="Board" value={student.board} />
              <InfoRow label="Grade" value={student.grade} />
              <InfoRow label="Status" value={student.status} />
            </Stack>
          </Card>
        </Grid.Col>

        {/* PARENT INFORMATION */}

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card withBorder radius="lg" p="lg" h="100%">
            <Text fw={600} mb="md">
              Parent Information
            </Text>

            <Stack gap={8}>
              <InfoRow label="Name" value={student.parentId?.fullName} />
              <InfoRow label="Email" value={student.parentId?.email} />
              <InfoRow label="Mobile" value={student.parentId?.mobile} />
              <InfoRow
                label="Parent Status"
                value={student.parentId?.status}
              />
            </Stack>
          </Card>
        </Grid.Col>

      </Grid>

      {/* ================= CONFIRM MODAL ================= */}

      <Modal
        opened={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title={
          targetStatus === "blocked"
            ? "Confirm Block"
            : "Confirm Reactivation"
        }
        centered
      >
        <Text size="sm" mb="md">
          {targetStatus === "blocked"
            ? "Are you sure you want to block this student? The student will not be able to access the platform."
            : "Are you sure you want to reactivate this student? The student will regain access to the platform."}
        </Text>

        <Group justify="flex-end">
          <Button
            variant="default"
            onClick={() => setConfirmOpen(false)}
          >
            Cancel
          </Button>

          <Button
            color={targetStatus === "blocked" ? "red" : "green"}
            loading={actionLoading}
            onClick={handleConfirmAction}
          >
            Confirm
          </Button>
        </Group>
      </Modal>

    </Stack>
  );
}

/* ================= SMALL REUSABLE ROW ================= */

// const InfoRow = ({ label, value }) => (
//   <Group justify="space-between">
//     <Text size="sm" c="dimmed">
//       {label}
//     </Text>
//     <Text size="sm" fw={500}>
//       {value || "—"}
//     </Text>
//   </Group>
// );

const InfoRow = ({ label, value }) => (
  <Stack gap={2}>
    <Text size="xs" c="dimmed">
      {label}
    </Text>

    <Text size="sm" fw={500}>
      {value || "—"}
    </Text>
  </Stack>
);