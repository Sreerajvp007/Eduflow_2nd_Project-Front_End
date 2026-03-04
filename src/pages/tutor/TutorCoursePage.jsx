// import { useEffect, useState, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTutorCourses } from "../../features/tutor/course/tutorCourseSlice";
// import { Loader, Avatar, Button, TextInput } from "@mantine/core";
// import { IconSearch } from "@tabler/icons-react";
// import { useNavigate } from "react-router-dom";

// const TutorCourses = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { courses, loading } = useSelector(
//     (state) => state.tutorCourses
//   );

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   useEffect(() => {
//     dispatch(fetchTutorCourses());
//   }, [dispatch]);

//   // ===== FILTER LOGIC =====
//   const filteredCourses = useMemo(() => {
//     return courses
//       .filter((course) => {
//         if (statusFilter === "all") return true;
//         return course.courseStatus === statusFilter;
//       })
//       .filter((course) => {
//         const searchLower = search.toLowerCase();
//         return (
//           course.subject?.toLowerCase().includes(searchLower) ||
//           course.studentId?.name?.toLowerCase().includes(searchLower)
//         );
//       });
//   }, [courses, search, statusFilter]);

//   if (loading) {
//     return (
//       <div className="flex justify-center py-20">
//         <Loader color="teal" />
//       </div>
//     );
//   }

//   return (
//     <div className="px-4 pb-24 overflow-x-hidden">

//       {/* ================= HEADER ================= */}
//       <div className="pt-6">
//         <h1 className="text-2xl font-semibold text-gray-800">
//           My Courses
//         </h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Manage your active and completed courses
//         </p>
//       </div>

//       {/* ================= SEARCH ================= */}
//       <div className="mt-5">
//         <TextInput
//           placeholder="Search by subject or student..."
//           leftSection={<IconSearch size={16} />}
//           radius="xl"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* ================= FILTER PILLS ================= */}
//       <div className="mt-5 overflow-x-auto">
//         <div className="flex gap-2 min-w-max pb-2">
//           {["all", "active", "paused", "completed"].map((status) => (
//             <button
//               key={status}
//               onClick={() => setStatusFilter(status)}
//               className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all
//                 ${
//                   statusFilter === status
//                     ? "bg-teal-600 text-white shadow"
//                     : "bg-gray-100 text-gray-600"
//                 }`}
//             >
//               {status.charAt(0).toUpperCase() + status.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ================= EMPTY STATE ================= */}
//       {filteredCourses.length === 0 && (
//         <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center text-gray-500">
//           No courses found
//         </div>
//       )}

//       {/* ================= COURSE LIST ================= */}
//       <div className="mt-6 space-y-4">
//         {filteredCourses.map((course) => (
//           <div
//             key={course._id}
//             className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 w-full"
//           >
//             {/* Top Section */}
//             <div className="flex justify-between items-start gap-3">

//               <div className="min-w-0">
//                 <h3 className="text-lg font-semibold text-gray-800 truncate">
//                   {course.subject}
//                 </h3>

//                 <p className="text-xs text-gray-400 mt-1">
//                   Started on{" "}
//                   {new Date(course.createdAt).toLocaleDateString()}
//                 </p>
//               </div>

//               <span
//                 className={`px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap
//                   ${
//                     course.courseStatus === "active"
//                       ? "bg-teal-100 text-teal-600"
//                       : course.courseStatus === "paused"
//                       ? "bg-yellow-100 text-yellow-600"
//                       : "bg-gray-200 text-gray-600"
//                   }`}
//               >
//                 {course.courseStatus}
//               </span>
//             </div>

//             {/* Student Section */}
//             <div className="mt-4 flex items-center gap-3">
//               <Avatar radius="xl" color="teal">
//                 {course.studentId?.name?.charAt(0)}
//               </Avatar>

//               <div className="min-w-0">
//                 <p className="font-medium text-gray-800 truncate">
//                   {course.studentId?.name}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   Grade: {course.studentId?.grade}
//                 </p>
//               </div>
//             </div>

//             {/* Parent */}
//             <div className="mt-3 text-sm text-gray-500">
//               Parent:{" "}
//               <span className="font-medium text-gray-700">
//                 {course.parentId?.fullName}
//               </span>
//             </div>

//             {/* Button */}
//             <div className="mt-5 flex justify-end">
//               <Button
//                 color="teal"
//                 radius="xl"
//                 size="sm"
//                 onClick={() =>
//                   navigate(`/tutor/courses/${course._id}`)
//                 }
//               >
//                 View Details
//               </Button>
//             </div>

//           </div>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default TutorCourses;

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
                      <Avatar radius="xl">
                        {course.studentId?.name?.charAt(0)}
                      </Avatar>
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