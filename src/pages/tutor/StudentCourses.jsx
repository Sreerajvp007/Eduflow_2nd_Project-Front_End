

import {
  Table,
  Text,
  Badge,
  Group,
  Paper,
  Pagination,
  Button,
  Box,
  LoadingOverlay,
  Stack,
  Card,
} from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentCourses } from "../../features/tutor/tutorStudentSlice";
import { useParams, useNavigate } from "react-router-dom";

const StudentCourses = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { courses, loading, coursesPage, coursesTotalPages } =
    useSelector((state) => state.tutorStudents);

  useEffect(() => {
    dispatch(fetchStudentCourses({ studentId, page: 1 }));
  }, [dispatch, studentId]);

  const handlePageChange = (value) => {
    dispatch(fetchStudentCourses({ studentId, page: value }));
  };

  return (
    <Paper p="lg" radius="md" withBorder>
      <Text size="xl" fw={600} mb="lg">
        Student Courses
      </Text>

      <Box pos="relative" style={{ minHeight: 300 }}>
        <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />

        {/* DESKTOP TABLE */}
        <div className="hidden md:block">
          <Table highlightOnHover verticalSpacing="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Subject</Table.Th>
                <Table.Th>Class</Table.Th>
                <Table.Th>Time Slot</Table.Th>
                <Table.Th>Monthly Fee</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Payment</Table.Th>
                <Table.Th>Next Payment</Table.Th>
                <Table.Th ta="right">Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {courses.map((course) => (
                <Table.Tr key={course._id}>
                  <Table.Td>{course.subject}</Table.Td>
                  <Table.Td>Grade {course.classLevel}</Table.Td>
                  <Table.Td>{course.timeSlot}</Table.Td>
                  <Table.Td>₹ {course.monthlyFee}</Table.Td>
                  <Table.Td>
                    <Badge color="green" variant="light">
                      {course.courseStatus}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge color="green" variant="light">
                      {course.paymentStatus}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    {new Date(course.nextPaymentDate).toLocaleDateString()}
                  </Table.Td>
                  <Table.Td ta="right">
                    <Button
                      size="xs"
                      variant="subtle"
                      onClick={() =>
                        navigate(`/tutor/courses/${course._id}`)
                      }
                    >
                      View Overview
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>

        {/* MOBILE CARDS */}
        <div className="block md:hidden">
          <Stack>
            {courses.map((course) => (
              <Card key={course._id} withBorder radius="md">
                <Text fw={600}>{course.subject}</Text>
                <Text size="sm">Grade {course.classLevel}</Text>
                <Text size="sm">Time: {course.timeSlot}</Text>
                <Text size="sm">Fee: ₹ {course.monthlyFee}</Text>

                <Group justify="space-between" mt="sm">
                  <Badge color="green" variant="light">
                    {course.courseStatus}
                  </Badge>

                  <Button
                    size="xs"
                    variant="light"
                    onClick={() =>
                      navigate(`/tutor/courses/${course._id}`)
                    }
                  >
                    Overview
                  </Button>
                </Group>
              </Card>
            ))}
          </Stack>
        </div>
      </Box>

      {coursesTotalPages > 1 && (
        <Group justify="flex-end" mt="md">
          <Pagination
            total={coursesTotalPages}
            value={coursesPage}
            onChange={handlePageChange}
          />
        </Group>
      )}
    </Paper>
  );
};

export default StudentCourses;