

import {
  Table,
  Text,
  Badge,
  Group,
  Paper,
  Pagination,
  Button,
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

  const { courses, coursesPage, coursesTotalPages } =
    useSelector((state) => state.tutorStudents);

  useEffect(() => {
    dispatch(fetchStudentCourses({ studentId, page: 1 }));
  }, [dispatch, studentId]);

  const handlePageChange = (value) => {
    dispatch(fetchStudentCourses({ studentId, page: value }));
  };

  return (
    <Paper p="lg" radius="md">

      {/* HEADER */}
      <Text size="xl" fw={600} mb="lg">
        Student Courses
      </Text>

      {/* ================= TABLE ================= */}

      <Table highlightOnHover>

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

          {courses.length === 0 ? (

            <Table.Tr>
              <Table.Td colSpan={8}>
                <div className="text-center py-10">
                  <Text size="sm" c="dimmed">
                    No courses found...
                  </Text>
                </div>
              </Table.Td>
            </Table.Tr>

          ) : (

            courses.map((course) => (

              <Table.Tr key={course._id}>

                <Table.Td>
                  <Text size="sm">{course.subject}</Text>
                </Table.Td>

                <Table.Td>
                  <Text size="sm">Grade {course.classLevel}</Text>
                </Table.Td>

                <Table.Td>
                  <Text size="sm">{course.timeSlot}</Text>
                </Table.Td>

                <Table.Td>
                  <Text size="sm">₹ {course.monthlyFee}</Text>
                </Table.Td>

                <Table.Td>
                  <Badge color="green">
                    {course.courseStatus}
                  </Badge>
                </Table.Td>

                <Table.Td>
                  <Badge color="green">
                    {course.paymentStatus}
                  </Badge>
                </Table.Td>

                <Table.Td>
                  <Text size="sm">
                    {new Date(course.nextPaymentDate).toLocaleDateString()}
                  </Text>
                </Table.Td>

                <Table.Td ta="right">
                  <Button
                    size="xs"
                    variant="light"
                    onClick={() =>
                      navigate(`/tutor/courses/${course._id}`)
                    }
                  >
                    View
                  </Button>
                </Table.Td>

              </Table.Tr>

            ))

          )}

        </Table.Tbody>

      </Table>

      {/* ================= MOBILE ================= */}

      <div className="block md:hidden mt-4">

        {courses.length === 0 ? (

          <div className="text-center py-10">
            <Text size="sm" c="dimmed">
              No courses found...
            </Text>
          </div>

        ) : (

          <Stack>

            {courses.map((course) => (

              <Card key={course._id} withBorder radius="md">

                <Text fw={600}>{course.subject}</Text>
                <Text size="sm">Grade {course.classLevel}</Text>
                <Text size="sm">Time: {course.timeSlot}</Text>
                <Text size="sm">Fee: ₹ {course.monthlyFee}</Text>

                <Group justify="space-between" mt="sm">

                  <Badge color="green">
                    {course.courseStatus}
                  </Badge>

                  <Button
                    size="xs"
                    variant="light"
                    onClick={() =>
                      navigate(`/tutor/courses/${course._id}`)
                    }
                  >
                    View
                  </Button>

                </Group>

              </Card>

            ))}

          </Stack>

        )}

      </div>

      {/* PAGINATION */}
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