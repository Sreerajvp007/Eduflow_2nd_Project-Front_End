
// import {
//   Card,
//   Group,
//   Text,
//   Badge,
//   Button,
//   Stack,
//   Divider,
// } from "@mantine/core";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchStudentDetails } from "../../features/admin/studentSlice";
// import { useParams } from "react-router-dom";

// export default function StudentDetailsPage() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { details: student, loading } = useSelector(
//     (s) => s.adminStudents
//   );

//   useEffect(() => {
//     dispatch(fetchStudentDetails(id));
//   }, [id, dispatch]);

//   if (loading) {
//     return <Text>Loading student details...</Text>;
//   }

//   if (!student) {
//     return <Text>No student found</Text>;
//   }

//   const isSuspended = student.status === "suspended";

//   return (
//     <>
//       {/* ===== HEADER ===== */}
//       <Group justify="space-between" mb="lg">
//         <Group>
//           <Text fw={700} size="xl">
//             {student.name}
//           </Text>
//           <Badge color={isSuspended ? "red" : "green"}>
//             {student.status.toUpperCase()}
//           </Badge>
//         </Group>

//         <Button color={isSuspended ? "green" : "red"}>
//           {isSuspended ? "Activate Student" : "Suspend Student"}
//         </Button>
//       </Group>

//       {/* ===== STUDENT INFO ===== */}
//       <Card mb="lg" withBorder>
//         <Text fw={600} mb="sm">
//           Student Information
//         </Text>

//         <Stack gap={6}>
//           <Text size="sm">
//             <b>Board:</b> {student.board}
//           </Text>
//           <Text size="sm">
//             <b>Grade:</b> {student.grade || "—"}
//           </Text>
//           <Text size="sm">
//             <b>Status:</b> {student.status}
//           </Text>
          
//         </Stack>
//       </Card>

//       {/* ===== PARENT INFO ===== */}
//       <Card withBorder>
//         <Text fw={600} mb="sm">
//           Parent Information
//         </Text>

//         <Stack gap={6}>
//           <Text size="sm">
//             <b>Name:</b> {student.parentId?.fullName || "—"}
//           </Text>
//           <Text size="sm">
//             <b>Email:</b> {student.parentId?.email || "—"}
//           </Text>
//           <Text size="sm">
//             <b>Mobile:</b> {student.parentId?.mobile || "—"}
//           </Text>
//           <Text size="sm">
//             <b>Parent Status:</b>{" "}
//             {student.parentId?.status || "—"}
//           </Text>
//         </Stack>
//       </Card>
//     </>
//   );
// }
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentDetails } from "../../features/admin/studentSlice";
import { useParams } from "react-router-dom";

export default function StudentDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details: student, loading } = useSelector(
    (s) => s.adminStudents
  );

  useEffect(() => {
    dispatch(fetchStudentDetails(id));
  }, [id, dispatch]);

  if (loading) return <Text>Loading student details...</Text>;
  if (!student) return <Text>No student found</Text>;

  const isSuspended = student.status === "suspended";

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
                {student.grade}
              </Text>

              <Badge
                mt={6}
                color={isSuspended ? "red" : "green"}
              >
                {student.status.toUpperCase()}
              </Badge>
            </Box>
          </Group>

          <Button color={isSuspended ? "green" : "red"}>
            {isSuspended ? "Activate Student" : "Suspend Student"}
          </Button>
        </Group>
      </Card>

      {/* ================= STUDENT INFORMATION ================= */}
      <Card withBorder radius="lg" p="lg">
        <Text fw={600} mb="md">
          Student Information
        </Text>

        <Stack gap={8}>
          <InfoRow label="Board" value={student.board} />
          <InfoRow label="Grade" value={student.grade} />
          <InfoRow label="Status" value={student.status} />
        </Stack>
      </Card>

      {/* ================= PARENT INFORMATION ================= */}
      <Card withBorder radius="lg" p="lg">
        <Text fw={600} mb="md">
          Parent Information
        </Text>

        <Stack gap={8}>
          <InfoRow
            label="Name"
            value={student.parentId?.fullName}
          />
          <InfoRow
            label="Email"
            value={student.parentId?.email}
          />
          <InfoRow
            label="Mobile"
            value={student.parentId?.mobile}
          />
          <InfoRow
            label="Parent Status"
            value={student.parentId?.status}
          />
        </Stack>
      </Card>
    </Stack>
  );
}

/* ================= SMALL REUSABLE ROW ================= */

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
