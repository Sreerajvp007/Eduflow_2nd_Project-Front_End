import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Rating,
  Stack,
  Text,
} from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTutorDetails } from "../../features/admin/adminTutorSlice";

export default function TutorDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details: tutor, loading } = useSelector(
    (s) => s.adminTutors
  );

  useEffect(() => {
    dispatch(fetchTutorDetails(id));
  }, [id, dispatch]);

  if (loading) return <Text>Loading tutor details...</Text>;
  if (!tutor) return <Text>No tutor found</Text>;

  const isActive = tutor.status === "active";

  return (
    <Stack gap="lg">
      {/* ================= HEADER ================= */}
      <Card radius="lg" p="lg" shadow="sm">
        <Group justify="space-between">
          <Group>
            <Avatar size={64} radius="xl" src={tutor.profileImage}>
              {tutor.fullName?.charAt(0)}
            </Avatar>

            <Box>
              <Text fw={700} size="lg">
                {tutor.fullName}
              </Text>

              <Group gap="xs">
                <Badge color={isActive ? "green" : "red"}>
                  {tutor.status.toUpperCase()}
                </Badge>

                <Rating
                  value={tutor.rating || 4.5}
                  readOnly
                  size="sm"
                />
                <Text size="sm" c="dimmed">
                  {tutor.rating || 4.5}
                </Text>
              </Group>
            </Box>
          </Group>

          <Button color="red">Block Tutor</Button>
        </Group>
      </Card>

      {/* ================= GRID ================= */}
      <Grid>
        {/* ===== Personal Information ===== */}
        <Grid.Col span={4}>
          <Card radius="lg" p="lg" shadow="sm">
            <Text fw={600} mb="sm">
              Personal Information
            </Text>

            <Stack gap={6}>
              <InfoRow label="Full Name" value={tutor.fullName} />
              <InfoRow label="Email" value={tutor.email} />
              <InfoRow label="Phone" value={tutor.mobile} />
              <InfoRow
                label="Joined Date"
                value={new Date(
                  tutor.createdAt
                ).toLocaleDateString()}
              />
            </Stack>
          </Card>
        </Grid.Col>

        {/* ===== Qualification Documents ===== */}
        <Grid.Col span={4}>
          <Card radius="lg" p="lg" shadow="sm">
            <Text fw={600} mb="sm">
              Qualification Documents
            </Text>

            <Stack gap="md">
              {tutor.qualifications?.map((q) => (
                <Card key={q._id} withBorder radius="md" p="sm">
                  <Text size="sm" fw={500}>
                    {q.title}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {q.institute}
                  </Text>

                  <Group mt="xs">
                    <Button size="xs" variant="light">
                      Download
                    </Button>
                    <Button size="xs" variant="subtle">
                      View
                    </Button>
                  </Group>
                </Card>
              ))}
            </Stack>
          </Card>
        </Grid.Col>

        {/* ===== ID Verification ===== */}
        <Grid.Col span={4}>
          <Card radius="lg" p="lg" shadow="sm">
            <Text fw={600} mb="sm">
              ID Verification
            </Text>

            <Card withBorder radius="md" p="sm">
              <Text size="sm">ID Type</Text>
              <Text size="xs" c="dimmed">
                Passport / Aadhaar
              </Text>

              <Badge mt="sm" color="green">
                Verified
              </Badge>
            </Card>
          </Card>
        </Grid.Col>

        {/* ===== Subjects & Classes ===== */}
        <Grid.Col span={6}>
          <Card radius="lg" p="lg" shadow="sm">
            <Text fw={600} mb="sm">
              Subjects & Classes
            </Text>

            <Group gap="xs" wrap="wrap">
              {tutor.subjects?.map((sub) => (
                <Badge
                  key={sub}
                  variant="light"
                  color="blue"
                >
                  {sub}
                </Badge>
              ))}
            </Group>
          </Card>
        </Grid.Col>

        {/* ===== Availability ===== */}
        <Grid.Col span={6}>
          <Card radius="lg" p="lg" shadow="sm">
            <Text fw={600} mb="sm">
              Availability
            </Text>

            <Stack gap={6}>
              {tutor.availability?.map((day) => (
                <Text size="sm" key={day.day}>
                  <b>{day.day}:</b>{" "}
                  {day.from} - {day.to}
                </Text>
              ))}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      {/* ================= ADMIN ACTIONS ================= */}
      <Card radius="lg" p="lg" shadow="sm">
        <Text fw={600} mb="sm">
          Admin Actions
        </Text>

        <Stack>
          <Button color="red">Block Tutor</Button>
          <Button color="orange">Suspend Tutor</Button>
          <Button color="blue">Reactivate Tutor</Button>
        </Stack>
      </Card>
    </Stack>
  );
}

/* ================= SMALL HELPER ================= */

const InfoRow = ({ label, value }) => (
  <Group justify="space-between">
    <Text size="sm" c="dimmed">
      {label}
    </Text>
    <Text size="sm" fw={500}>
      {value || "—"}
    </Text>
  </Group>
);
