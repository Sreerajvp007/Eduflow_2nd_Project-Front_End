

import {
  Loader,
  Avatar,
  Button,
  TextInput,
  Table,
  Badge,
  Group,
  Pagination,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTutorCourses } from "../../features/tutor/course/tutorCourseSlice";
import { useNavigate } from "react-router-dom";

const TutorCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    courses,
    loading,
    page,
    totalPages,
  } = useSelector((state) => state.tutorCourses);

  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    page: 1,
  });

  /* ================= Fetch On Change ================= */
  useEffect(() => {
    dispatch(fetchTutorCourses(filters));
  }, [filters, dispatch]);

  const handlePageChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      page: value,
    }));
  };

  return (
    <div className="px-4 pb-24 max-w-7xl mx-auto">

      {/* ================= HEADER ================= */}
      <div className="pt-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          My Courses
        </h1>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="mt-5">
        <TextInput
          placeholder="Search by subject..."
          leftSection={<IconSearch size={16} />}
          radius="xl"
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              search: e.target.value,
              page: 1,
            }))
          }
        />
      </div>

      {/* ================= STATUS FILTER ================= */}
      <div className="mt-4 flex gap-2 flex-wrap">
        {["all", "active", "paused", "completed"].map((status) => (
          <Button
            key={status}
            size="xs"
            variant={
              filters.status === status ? "filled" : "light"
            }
            color="teal"
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                status,
                page: 1,
              }))
            }
          >
            {status}
          </Button>
        ))}
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block mt-6">
        <Box pos="relative" style={{ minHeight: 300 }}>
          <LoadingOverlay visible={loading} />

          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Subject</Table.Th>
                <Table.Th>Student</Table.Th>
                <Table.Th>Parent</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th ta="right">Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {courses.map((course) => (
                <Table.Tr key={course._id}>
                  <Table.Td>{course.subject}</Table.Td>

                  <Table.Td>
                    <Group gap="sm">
                      {/* <Avatar radius="xl">
                        {course.studentId?.name?.charAt(0)}
                      </Avatar> */}
                      {course.studentId?.name}
                    </Group>
                  </Table.Td>

                  <Table.Td>
                    {course.parentId?.fullName}
                  </Table.Td>

                  <Table.Td>
                    <Badge
                      color={
                        course.courseStatus === "active"
                          ? "green"
                          : course.courseStatus === "paused"
                          ? "yellow"
                          : "gray"
                      }
                      variant="light"
                    >
                      {course.courseStatus}
                    </Badge>
                  </Table.Td>

                  <Table.Td ta="right">
                    <Button
                      size="xs"
                      variant="subtle"
                      onClick={() =>
                        navigate(
                          `/tutor/courses/${course._id}`
                        )
                      }
                    >
                      View
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Box>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="block md:hidden mt-6 space-y-4">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-2xl shadow-sm border p-5"
          >
            <div className="flex justify-between">
              <h3 className="font-semibold">
                {course.subject}
              </h3>

              <span className="text-xs px-3 py-1 rounded-full bg-teal-100 text-teal-600">
                {course.courseStatus}
              </span>
            </div>

            <div className="mt-3 text-sm">
              {course.studentId?.name}
            </div>

            <Button
              fullWidth
              mt="md"
              size="sm"
              color="teal"
              radius="xl"
              onClick={() =>
                navigate(`/tutor/courses/${course._id}`)
              }
            >
              View Details
            </Button>
          </div>
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center md:justify-end">
          <Pagination
            total={totalPages}
            value={page}
            onChange={handlePageChange}
            siblings={1}
            boundaries={1}
          />
        </div>
      )}
    </div>
  );
};

export default TutorCourses;