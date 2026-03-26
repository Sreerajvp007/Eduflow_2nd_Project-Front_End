

import {
  Table,
  Text,
  Badge,
  Group,
  Pagination,
  Avatar,
  Paper,
  TextInput,
  Select,
  Grid,
  Stack,
  Card,
} from "@mantine/core";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyStudents } from "../../features/tutor/tutorStudentSlice";
import { useNavigate } from "react-router-dom";

const MyStudents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { students, studentsTotalPages } =
    useSelector((state) => state.tutorStudents);

  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    grade: "",
    status: "",
    page: 1,
  });

  useEffect(() => {
    const delay = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search: searchInput.trim(),
        page: 1,
      }));
    }, 400);

    return () => clearTimeout(delay);
  }, [searchInput]);

  useEffect(() => {
    dispatch(fetchMyStudents(filters));
  }, [filters, dispatch]);

  const handlePageChange = (value) => {
    setFilters((prev) => ({ ...prev, page: value }));
  };

  return (
  <Paper p="lg" radius="md" className="space-y-4">

    {/* HEADER */}
    <Text size="xl" fw={600}>
      My Students
    </Text>

    {/* FILTERS */}
    <Grid>

      <Grid.Col span={{ base: 12, md: 4 }}>
        <TextInput
          placeholder="Search by student name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.currentTarget.value)}
        />
      </Grid.Col>

      <Grid.Col span={{ base: 6, md: 3 }}>
        <Select
          placeholder="All Grades"
          data={[...Array(12)].map((_, i) => ({
            value: String(i + 1),
            label: `Grade ${i + 1}`,
          }))}
          value={filters.grade}
          onChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              grade: value || "",
              page: 1,
            }))
          }
          clearable
        />
      </Grid.Col>

      <Grid.Col span={{ base: 6, md: 3 }}>
        <Select
          placeholder="All Status"
          data={[
            { value: "active", label: "Active" },
            { value: "blocked", label: "Blocked" },
          ]}
          value={filters.status}
          onChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              status: value || "",
              page: 1,
            }))
          }
          clearable
        />
      </Grid.Col>

    </Grid>

    {/* ================= DESKTOP TABLE ================= */}

    <div className="hidden md:block">

      <Table highlightOnHover>

        <Table.Thead>
          <Table.Tr>
            <Table.Th>Student</Table.Th>
            <Table.Th>Parent</Table.Th>
            <Table.Th>Mobile</Table.Th>
            <Table.Th>Grade</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>

          {students.length === 0 ? (

            <Table.Tr>
              <Table.Td colSpan={6}>
                <div className="text-center py-10">
                  <Text size="sm" c="dimmed">
                    No students found...
                  </Text>
                </div>
              </Table.Td>
            </Table.Tr>

          ) : (

            students.map((student) => (

              <Table.Tr key={student._id}>

                <Table.Td>
                  <Group gap="xs">
                    <Avatar size="sm">
                      {student.studentName?.[0]}
                    </Avatar>
                    <Text size="sm">
                      {student.studentName}
                    </Text>
                  </Group>
                </Table.Td>

                <Table.Td>{student.parentName}</Table.Td>
                <Table.Td>{student.mobile}</Table.Td>
                <Table.Td>Grade {student.grade}</Table.Td>

                <Table.Td>
                  <Badge
                    color={student.status === "active" ? "green" : "red"}
                  >
                    {student.status}
                  </Badge>
                </Table.Td>

                <Table.Td>
                  <Text
                    size="sm"
                    c="blue"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(`/tutor/students/${student._id}/courses`)
                    }
                  >
                    View Courses
                  </Text>
                </Table.Td>

              </Table.Tr>

            ))

          )}

        </Table.Tbody>

      </Table>

    </div>

    {/* ================= MOBILE CARDS ================= */}

    <div className="md:hidden space-y-3">

      {students.length === 0 ? (

        <div className="text-center py-10">
          <Text size="sm" c="dimmed">
            No students found...
          </Text>
        </div>

      ) : (

        students.map((student) => (

          <Card key={student._id} withBorder radius="md" p="md">

            <Stack gap="xs">

              {/* TOP */}
              <Group justify="space-between">

                <Group gap="xs">
                  <Avatar size="sm">
                    {student.studentName?.[0]}
                  </Avatar>
                  <Text fw={600} size="sm">
                    {student.studentName}
                  </Text>
                </Group>

                <Badge
                  size="sm"
                  color={student.status === "active" ? "green" : "red"}
                >
                  {student.status}
                </Badge>

              </Group>

              {/* DETAILS */}
              <div className="text-sm space-y-1">
                <div><b>Parent:</b> {student.parentName}</div>
                <div><b>Mobile:</b> {student.mobile}</div>
                <div><b>Grade:</b> {student.grade}</div>
              </div>

              {/* ACTION */}
              <div className="pt-2">
                <Text
                  size="sm"
                  c="blue"
                  className="cursor-pointer text-center"
                  onClick={() =>
                    navigate(`/tutor/students/${student._id}/courses`)
                  }
                >
                  View Courses
                </Text>
              </div>

            </Stack>

          </Card>

        ))

      )}

    </div>

    {/* PAGINATION */}

    {studentsTotalPages > 1 && (
      <div className="flex justify-center md:justify-end mt-3">
        <Pagination
          total={studentsTotalPages}
          value={filters.page}
          onChange={handlePageChange}
        />
      </div>
    )}

  </Paper>
);
};

export default MyStudents;