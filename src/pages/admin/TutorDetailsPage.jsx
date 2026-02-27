
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
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchTutorDetails,
  updateTutorStatus,
  approveTutor, // 🔥 make sure this exists in slice
  verifyQualification,
  verifyTutorId,
} from "../../features/admin/adminTutorSlice";

export default function TutorDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { details: tutor, loading } = useSelector(
    (s) => s.adminTutors
  );

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchTutorDetails(id));
  }, [id, dispatch]);

  if (loading) return <Text>Loading tutor details...</Text>;
  if (!tutor) return <Text>No tutor found</Text>;

  /* ================= STATUS FLAGS ================= */
  const isBlocked = tutor.status === "blocked";
  const isPending = tutor.status === "pending";
  const isActive = tutor.status === "active";

  /* ================= BLOCK / REACTIVATE ================= */
  const handleConfirm = async () => {
    try {
      setActionLoading(true);

      await dispatch(
        updateTutorStatus({
          id: tutor._id,
          status: isBlocked ? "active" : "blocked",
        })
      ).unwrap();

      setConfirmOpen(false);
    } finally {
      setActionLoading(false);
    }
  };

  /* ================= APPROVE ================= */
  const handleApprove = async () => {
    try {
      setActionLoading(true);
      await dispatch(approveTutor(tutor._id)).unwrap();
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <Stack gap="xl">
      {/* ================= HEADER ================= */}
      <Card radius="xl" p={{ base: "md", md: "xl" }} shadow="sm">
        <Group justify="space-between" align="flex-start">
          <Group>
            <Avatar size={72} radius="xl" src={tutor.profileImage}>
              {tutor.fullName?.charAt(0)}
            </Avatar>

            <Box>
              <Text fw={700} size="lg">
                {tutor.fullName}
              </Text>

              <Group gap="xs" mt={6}>
                <Badge
                  color={
                    isPending
                      ? "yellow"
                      : isBlocked
                      ? "red"
                      : "green"
                  }
                >
                  {tutor.status.toUpperCase()}
                </Badge>
              </Group>
            </Box>
          </Group>

          {/* ================= STATUS ACTION BUTTON ================= */}
          {isPending ? (
            <Button
              size="xs"
              color="green"
              loading={actionLoading}
              onClick={handleApprove}
            >
              Approve
            </Button>
          ) : (
            <Button
              size="xs"
              color={isBlocked ? "green" : "red"}
              variant="light"
              onClick={() => setConfirmOpen(true)}
            >
              {isBlocked ? "Reactivate" : "Block"}
            </Button>
          )}
        </Group>
      </Card>

      {/* ================= PERSONAL INFO ================= */}
      <Card radius="xl" p={{ base: "md", md: "xl" }} shadow="xs">
        <Text fw={600} mb="md">
          Personal Information
        </Text>

        <Stack gap="md">
          <InfoBlock label="Full Name" value={tutor.fullName} />
          <InfoBlock label="Email" value={tutor.email} />
          <InfoBlock label="Phone" value={tutor.mobile} />
          <InfoBlock
            label="Joined"
            value={
              tutor.createdAt
                ? new Date(tutor.createdAt).toLocaleDateString()
                : "—"
            }
          />
        </Stack>
      </Card>

   {/* ================= QUALIFICATIONS ================= */}
<Card radius="xl" p={{ base: "md", md: "xl" }} shadow="xs">
  <Text fw={600} mb="md">
    Qualification Documents
  </Text>

  <Stack gap="md">
    {tutor.qualifications?.length ? (
      tutor.qualifications.map((q) => (
        <Card key={q._id} withBorder radius="md" p="md">
          <Stack gap={6}>
            <Text fw={500}>{q.title}</Text>
            <Text size="sm" c="dimmed">
              {q.institute} • {q.year}
            </Text>

            <Group mt="xs">
              <Button
                size="xs"
                variant="light"
                onClick={() =>
                  window.open(q.certificateUrl, "_blank")
                }
              >
                View
              </Button>
            </Group>
          </Stack>
        </Card>
      ))
    ) : (
      <Text size="sm" c="dimmed">
        No qualifications submitted
      </Text>
    )}
  </Stack>
</Card>

    {/* ================= ID VERIFICATION ================= */}
<Card radius="xl" p={{ base: "md", md: "xl" }} shadow="xs">
  <Text fw={600} mb="md">
    ID Document
  </Text>

  {tutor.idVerification?.documentUrl ? (
    <Card withBorder radius="md" p="md">
      <Stack gap={6}>
        <Text fw={500}>
          {tutor.idVerification.idType}
        </Text>
        <Text size="sm" c="dimmed">
          {tutor.idVerification.idNumber}
        </Text>

        <Group mt="xs">
          <Button
            size="xs"
            variant="light"
            onClick={() =>
              window.open(
                tutor.idVerification.documentUrl,
                "_blank"
              )
            }
          >
            View ID
          </Button>
        </Group>
      </Stack>
    </Card>
  ) : (
    <Text size="sm" c="dimmed">
      No ID document submitted
    </Text>
  )}
</Card>

      {/* ================= SUBJECTS ================= */}
      <Card radius="xl" p={{ base: "md", md: "xl" }} shadow="xs">
        <Text fw={600} mb="md">
          Subjects
        </Text>

        <Group wrap="wrap">
          {tutor.subjects?.length ? (
            tutor.subjects.map((sub, index) => (
              <Badge key={index} variant="light" color="blue">
                {sub}
              </Badge>
            ))
          ) : (
            <Text size="sm" c="dimmed">
              No subjects added
            </Text>
          )}
        </Group>
      </Card>

      {/* ================= CLASSES ================= */}
      <Card radius="xl" p={{ base: "md", md: "xl" }} shadow="xs">
        <Text fw={600} mb="md">
          Classes
        </Text>

        <Group wrap="wrap">
          {tutor.classes?.length ? (
            tutor.classes.map((cls, index) => (
              <Badge key={index} variant="light" color="teal">
                {cls}
              </Badge>
            ))
          ) : (
            <Text size="sm" c="dimmed">
              No classes added
            </Text>
          )}
        </Group>
      </Card>

      {/* ================= CONFIRM MODAL ================= */}
      <Modal
        opened={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        centered
        title="Confirm Action"
      >
        <Text mb="md">
          Are you sure you want to{" "}
          <b>{isBlocked ? "reactivate" : "block"}</b> this tutor?
        </Text>

        <Group justify="flex-end">
          <Button
            variant="default"
            onClick={() => setConfirmOpen(false)}
          >
            Cancel
          </Button>

          <Button
            color={isBlocked ? "green" : "red"}
            loading={actionLoading}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </Group>
      </Modal>
    </Stack>
  );
}

/* ================= HELPER ================= */

const InfoBlock = ({ label, value }) => (
  <Box>
    <Text size="xs" c="dimmed">
      {label}
    </Text>
    <Text fw={500} size="sm">
      {value || "—"}
    </Text>
  </Box>
);