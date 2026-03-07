

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
  Box,
  LoadingOverlay,
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

  const { students, loading, studentsTotalPages } =
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
    <Paper p="lg" radius="md" withBorder>
      <Text size="xl" fw={600} mb="lg">
        My Students
      </Text>

      {/* Filters */}
      <Grid mb="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            placeholder="Search student or parent"
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

      <Box pos="relative" style={{ minHeight: 300 }}>
        <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />

        {/* DESKTOP TABLE */}
        <div className="hidden md:block">
          <Table highlightOnHover verticalSpacing="md">
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
              {students.map((student) => (
                <Table.Tr key={student._id}>
                  <Table.Td>
                    <Group>
                      <Avatar radius="xl">
                        {student.studentName?.[0]}
                      </Avatar>
                      <Text fw={500}>{student.studentName}</Text>
                    </Group>
                  </Table.Td>

                  <Table.Td>{student.parentName}</Table.Td>
                  <Table.Td>{student.mobile}</Table.Td>
                  <Table.Td>Grade {student.grade}</Table.Td>

                  <Table.Td>
                    <Badge
                      color={student.status === "active" ? "green" : "red"}
                      variant="light"
                    >
                      {student.status}
                    </Badge>
                  </Table.Td>

                  <Table.Td>
                    <Text
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
              ))}
            </Table.Tbody>
          </Table>
        </div>

        {/* MOBILE CARDS */}
        <div className="block md:hidden">
          <Stack>
            {students.map((student) => (
              <Card key={student._id} withBorder radius="md">
                <Group mb="xs">
                  <Avatar radius="xl">
                    {student.studentName?.[0]}
                  </Avatar>
                  <Text fw={600}>{student.studentName}</Text>
                </Group>

                <Text size="sm"><b>Parent:</b> {student.parentName}</Text>
                <Text size="sm"><b>Mobile:</b> {student.mobile}</Text>
                <Text size="sm"><b>Grade:</b> {student.grade}</Text>

                <Group justify="space-between" mt="sm">
                  <Badge
                    color={student.status === "active" ? "green" : "red"}
                    variant="light"
                  >
                    {student.status}
                  </Badge>

                  <Text
                    c="blue"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(`/tutor/students/${student._id}/courses`)
                    }
                  >
                    View Courses
                  </Text>
                </Group>
              </Card>
            ))}
          </Stack>
        </div>
      </Box>

      {studentsTotalPages > 1 && (
        <Group justify="flex-end" mt="md">
          <Pagination
            total={studentsTotalPages}
            value={filters.page}
            onChange={handlePageChange}
          />
        </Group>
      )}
    </Paper>
  );
};

export default MyStudents;