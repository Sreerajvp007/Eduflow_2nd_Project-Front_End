

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
  Rating
} from "@mantine/core";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  fetchTutorDetails,
  updateTutorStatus,
  approveTutor,
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

  const isBlocked = tutor.status === "blocked";
  const isPending = tutor.status === "pending";

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

      <Card radius="xl" p="lg" shadow="sm">

        <Group justify="space-between">

          <Group>

            <Avatar size={64} radius="xl" src={tutor.profileImage}>
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

              <Group mt={6} gap={6}>
                <Rating
                  value={tutor.averageRating || 0}
                  readOnly
                  size="sm"
                />
                <Text size="xs" c="dimmed">
                  ({tutor.totalReviews || 0})
                </Text>
              </Group>

            </Box>
          </Group>

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


      {/* ================= GRID LAYOUT ================= */}

      <Grid>

        {/* LEFT SIDE */}

        <Grid.Col span={{ base: 12, md: 6 }}>

          <Stack>

            {/* PERSONAL INFO */}

            <Card radius="xl" p="lg" shadow="xs">

              <Text fw={600} mb="md">
                Personal Information
              </Text>

              <Stack gap="sm">

                <Info label="Full Name" value={tutor.fullName} />
                <Info label="Email" value={tutor.email} />
                <Info label="Phone" value={tutor.mobile} />

                <Info
                  label="Experience"
                  value={`${tutor.teachingExperience || 0} Years`}
                />

                <Info
                  label="Bio"
                  value={tutor.bio}
                />

                <Info
                  label="Joined"
                  value={
                    tutor.createdAt
                      ? new Date(tutor.createdAt).toLocaleDateString()
                      : "—"
                  }
                />

              </Stack>

            </Card>


            {/* TEACHING DETAILS */}

            <Card radius="xl" p="lg" shadow="xs">

              <Text fw={600} mb="md">
                Teaching Details
              </Text>

              <Stack gap="md">

                <DetailBlock
                  label="Boards"
                  data={tutor.syllabus}
                />

                <DetailBlock
                  label="Classes"
                  data={tutor.classes?.map((c) => `Grade ${c}`)}
                />

                <DetailBlock
                  label="Subjects"
                  data={tutor.subjects}
                />

                <DetailBlock
                  label="Availability"
                  data={tutor.availability?.map((a) => a.time)}
                />

              </Stack>

            </Card>

          </Stack>

        </Grid.Col>


        {/* RIGHT SIDE */}

        <Grid.Col span={{ base: 12, md: 6 }}>

          <Stack>

            {/* QUALIFICATIONS */}

            <Card radius="xl" p="lg" shadow="xs">

              <Text fw={600} mb="md">
                Qualification Documents
              </Text>

              <Stack gap="md">

                {tutor.qualifications?.length ? (

                  tutor.qualifications.map((q) => (

                    <Card key={q._id} withBorder radius="md" p="md">

                      <Group justify="space-between">

                        <Box>

                          <Text fw={500}>
                            {q.title}
                          </Text>

                          <Text size="sm" c="dimmed">
                            {q.institute} • {q.year}
                          </Text>

                        </Box>

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

                    </Card>

                  ))

                ) : (

                  <Text size="sm" c="dimmed">
                    No qualifications submitted
                  </Text>

                )}

              </Stack>

            </Card>


            {/* ID VERIFICATION */}

<Card radius="xl" p="lg" shadow="xs">

  <Text fw={600} mb="md">
    ID Document
  </Text>

  {tutor.idVerification?.documentUrl ? (

    <Card withBorder radius="md" p="md">

      <Group justify="space-between">

        <Box>

          <Text fw={500}>
            {tutor.idVerification.idType}
          </Text>

          <Text size="sm" c="dimmed">
            {tutor.idVerification.idNumber}
          </Text>

        </Box>

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

    </Card>

  ) : (

    <Text size="sm" c="dimmed">
      No ID document submitted
    </Text>

  )}

</Card>
          </Stack>

        </Grid.Col>

      </Grid>


      {/* CONFIRM MODAL */}

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


/* ================= HELPER COMPONENTS ================= */

const Info = ({ label, value }) => (

  <Box>

    <Text size="xs" c="dimmed">
      {label}
    </Text>

    <Text fw={500} size="sm">
      {value || "—"}
    </Text>

  </Box>

);

const DetailBlock = ({ label, data }) => (

  <Box>

    <Text size="xs" c="dimmed" mb={6}>
      {label}
    </Text>

    <Group wrap="wrap">

      {data?.length ? (
        data.map((item, i) => (
          <Badge
            key={i}
            variant="light"
            color="gray"
          >
            {item}
          </Badge>
        ))
      ) : (
        <Text size="sm" c="dimmed">
          —
        </Text>
      )}

    </Group>

  </Box>

);