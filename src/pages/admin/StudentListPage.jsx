
// import {
//   Table,
//   Group,
//   Text,
//   Badge,
//   Button,
//   Stack,
//   TextInput,
//   Select,
//   Avatar,
//   Card,
  
// } from "@mantine/core";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchStudents } from "../../features/admin/studentSlice";
// import { useNavigate } from "react-router-dom";

// const statusColor = {
//   active: "green",
//   suspended: "orange",
//   blocked: "red",
// };

// export default function StudentListPage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { list, loading } = useSelector((s) => s.adminStudents);

//   const [searchInput, setSearchInput] = useState("");

// const [filters, setFilters] = useState({
//   search: "",
//   grade: "",
//   status: "",
// });
// useEffect(() => {
//   const delay = setTimeout(() => {
//     setFilters((prev) => ({
//       ...prev,
//       search: searchInput.trim(),
//     }));
//   }, 400);

//   return () => clearTimeout(delay);
// }, [searchInput]);

// useEffect(() => {
//   dispatch(fetchStudents(filters));
// }, [filters.grade, filters.status, filters.search, dispatch]);

//   return (
//     <Stack gap="lg">
//       {/* ================= HEADER ================= */}
//       <Group justify="space-between">
//         <Text fw={700} size="xl">
//           Student & Parent Management
//         </Text>
//       </Group>

//       {/* ================= CONTENT CARD ================= */}
      
//         {/* ================= FILTERS ================= */}
//         <Group mb="md" wrap="wrap">
//           <TextInput
//   w={260}
//   placeholder="Search student or parent"
//   value={searchInput}
//   onChange={(e) => setSearchInput(e.target.value)}
  
// />

//           <Select
//             w={180}
//             placeholder="All Classes"
//             value={filters.grade || "all"}
//             data={[
//               { value: "all", label: "All Classes" },
//               { value: "Grade 1", label: "Grade 1" },
//               { value: "Grade 2", label: "Grade 2" },
//               { value: "Grade 3", label: "Grade 3" },
//               { value: "Grade 4", label: "Grade 4" },
//               { value: "Grade 5", label: "Grade 5" },
//               { value: "Grade 6", label: "Grade 6" },
//               { value: "Grade 7", label: "Grade 7" },
//               { value: "Grade 8", label: "Grade 8" },
//               { value: "Grade 9", label: "Grade 9" },
//               { value: "Grade 10", label: "Grade 10" },
//             ]}
//             onChange={(value) =>
//               setFilters((prev) => ({
//                 ...prev,
//                 grade: value === "all" ? "" : value,
//               }))
//             }
//           />

//           <Select
//             w={180}
//             placeholder="All Statuses"
//             value={filters.status || "all"}
//             data={[
//               { value: "all", label: "All Statuses" },
//               { value: "active", label: "Active" },
//               // { value: "suspended", label: "Suspended" },
//               { value: "blocked", label: "Blocked" },
//             ]}
//             onChange={(value) =>
//               setFilters((prev) => ({
//                 ...prev,
//                 status: value === "all" ? "" : value,
//               }))
//             }
//           />
//         </Group>

//         {/* ================= DESKTOP TABLE ================= */}
//         <div className="hidden md:block">
//           <Table
//             striped
//             highlightOnHover
//             verticalSpacing="md"
//             horizontalSpacing="md"
//           >
//             <Table.Thead>
//               <Table.Tr>
//                 <Table.Th>Student</Table.Th>
//                 <Table.Th>Parent</Table.Th>
//                 <Table.Th>Contact</Table.Th>
//                 <Table.Th>Grade</Table.Th>
//                 <Table.Th ta="center">Status</Table.Th>
//                 <Table.Th ta="right">Actions</Table.Th>
//               </Table.Tr>
//             </Table.Thead>

//             <Table.Tbody>
//               {!loading && list.length === 0 && (
//                 <Table.Tr>
//                   <Table.Td colSpan={6}>
//                     <Text ta="center" c="dimmed" py="lg">
//                       No students found
//                     </Text>
//                   </Table.Td>
//                 </Table.Tr>
//               )}

//               {list.map((s) => (
//                 <Table.Tr key={s._id}>
//                   <Table.Td>
//                     <Group gap="sm" wrap="nowrap">
//                       <Avatar radius="xl">
//                         {s.name?.charAt(0)}
//                       </Avatar>
//                       <Text fw={600} size="sm">
//                         {s.name}
//                       </Text>
//                     </Group>
//                   </Table.Td>

//                   <Table.Td>{s.parentId?.fullName}</Table.Td>
//                   <Table.Td>{s.parentId?.email}</Table.Td>
//                   <Table.Td>{s.grade}</Table.Td>

//                   <Table.Td ta="center">
//                     <Badge size="sm" color={statusColor[s.status]}>
//                       {s.status.toUpperCase()}
//                     </Badge>
//                   </Table.Td>

//                   <Table.Td ta="right">
//                     <Button
//                       size="xs"
//                       variant="subtle"
//                       onClick={() =>
//                         navigate(`/admin/students/${s._id}`)
//                       }
//                     >
//                       View
//                     </Button>
//                   </Table.Td>
//                 </Table.Tr>
//               ))}
//             </Table.Tbody>
//           </Table>
//         </div>

//         {/* ================= MOBILE STACK ================= */}
//         <div className="block md:hidden">
//           <Stack gap="sm">
//             {list.map((s) => (
//               <Card key={s._id} withBorder radius="md">
//                 <Stack gap="xs">
//                   <Group gap="sm">
//                     <Avatar radius="xl">
//                       {s.name?.charAt(0)}
//                     </Avatar>
//                     <div>
//                       <Text fw={600} size="sm">
//                         {s.name}
//                       </Text>
//                       <Text size="xs" c="dimmed">
//                         Grade {s.grade}
//                       </Text>
//                     </div>
//                   </Group>

//                   <Text size="sm">
//                     <b>Parent:</b> {s.parentId?.fullName}
//                   </Text>

//                   <Text size="sm" c="dimmed">
//                     {s.parentId?.email}
//                   </Text>

//                   <Group justify="space-between" mt="xs">
//                     <Badge size="sm" color={statusColor[s.status]}>
//                       {s.status}
//                     </Badge>

//                     <Button
//                       size="xs"
//                       onClick={() =>
//                         navigate(`/admin/students/${s._id}`)
//                       }
//                     >
//                       View
//                     </Button>
//                   </Group>
//                 </Stack>
//               </Card>
//             ))}
//           </Stack>
//         </div>
      
//     </Stack>
//   );
// }
import {
  Table,
  Group,
  Text,
  Badge,
  Button,
  Stack,
  TextInput,
  Select,
  Avatar,
  Card,
  Pagination,
  LoadingOverlay,
  Box,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../features/admin/studentSlice";
import { useNavigate } from "react-router-dom";

const statusColor = {
  active: "green",
  suspended: "orange",
  blocked: "red",
};

export default function StudentListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list, loading, pagination } = useSelector(
    (s) => s.adminStudents
  );

  const [searchInput, setSearchInput] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    grade: "",
    status: "",
    page: 1,
  });

  // Debounce Search
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

  // Fetch Students
  useEffect(() => {
    dispatch(fetchStudents(filters));
  }, [filters, dispatch]);

  const handlePageChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      page: value,
    }));
  };

  return (
    <Stack gap="lg">
      {/* HEADER */}
      <Group justify="space-between">
        <Text fw={700} size="xl">
          Student & Parent Management
        </Text>
      </Group>

      {/* FILTERS */}
      <Group mb="md" wrap="wrap">
        <TextInput
          w={260}
          placeholder="Search student"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <Select
          w={180}
          placeholder="All Classes"
          value={filters.grade || "all"}
          data={[
            { value: "all", label: "All Classes" },
            { value: "1", label: "Grade 1" },
            { value: "2", label: "Grade 2" },
            { value: "3", label: "Grade 3" },
            { value: "4", label: "Grade 4" },
            { value: "5", label: "Grade 5" },
            { value: "6", label: "Grade 6" },
            { value: "7", label: "Grade 7" },
            { value: "8", label: "Grade 8" },
            { value: "9", label: "Grade 9" },
            { value: "10", label: "Grade 10" },
          ]}
          onChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              grade: value === "all" ? "" : value,
              page: 1,
            }))
          }
        />

        <Select
          w={180}
          placeholder="All Statuses"
          value={filters.status || "all"}
          data={[
            { value: "all", label: "All Statuses" },
            { value: "active", label: "Active" },
            { value: "blocked", label: "Blocked" },
          ]}
          onChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              status: value === "all" ? "" : value,
              page: 1,
            }))
          }
        />
      </Group>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block">
        <Box pos="relative" style={{ minHeight: 350 }}>
          <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />

          <Table
            striped
            highlightOnHover
            verticalSpacing="md"
            horizontalSpacing="md"
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Student</Table.Th>
                <Table.Th>Parent</Table.Th>
                <Table.Th>Contact</Table.Th>
                <Table.Th>Grade</Table.Th>
                <Table.Th ta="center">Status</Table.Th>
                <Table.Th ta="right">Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {!loading && list.length === 0 && (
                <Table.Tr>
                  <Table.Td colSpan={6}>
                    <Text ta="center" c="dimmed" py="lg">
                      No students found
                    </Text>
                  </Table.Td>
                </Table.Tr>
              )}

              {list.map((s) => (
                <Table.Tr key={s._id}>
                  <Table.Td>
                    <Group gap="sm" wrap="nowrap">
                      <Avatar radius="xl">
                        {s.name?.charAt(0)}
                      </Avatar>
                      <Text fw={600} size="sm">
                        {s.name}
                      </Text>
                    </Group>
                  </Table.Td>

                  <Table.Td>{s.parentId?.fullName}</Table.Td>
                  <Table.Td>{s.parentId?.mobile}</Table.Td>
                  <Table.Td>{s.grade}</Table.Td>

                  <Table.Td ta="center">
                    <Badge size="sm" color={statusColor[s.status]}>
                      {s.status?.toUpperCase()}
                    </Badge>
                  </Table.Td>

                  <Table.Td ta="right">
                    <Button
                      size="xs"
                      variant="subtle"
                      onClick={() =>
                        navigate(`/admin/students/${s._id}`)
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

      {/* MOBILE VIEW */}
      <div className="block md:hidden">
        <Box pos="relative" style={{ minHeight: 300 }}>
          <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />

          <Stack gap="sm">
            {list.map((s) => (
              <Card key={s._id} withBorder radius="md">
                <Stack gap="xs">
                  <Group gap="sm">
                    <Avatar radius="xl">
                      {s.name?.charAt(0)}
                    </Avatar>
                    <div>
                      <Text fw={600} size="sm">
                        {s.name}
                      </Text>
                      <Text size="xs" c="dimmed">
                        Grade {s.grade}
                      </Text>
                    </div>
                  </Group>

                  <Text size="sm">
                    <b>Parent:</b> {s.parentId?.fullName}
                  </Text>

                  <Text size="sm" c="dimmed">
                    {s.parentId?.mobile}
                  </Text>

                  <Group justify="space-between" mt="xs">
                    <Badge size="sm" color={statusColor[s.status]}>
                      {s.status}
                    </Badge>

                    <Button
                      size="xs"
                      onClick={() =>
                        navigate(`/admin/students/${s._id}`)
                      }
                    >
                      View
                    </Button>
                  </Group>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Box>
      </div>

      {/* PAGINATION */}
      {!loading && pagination?.pages > 1 && (
        <Group justify="flex-end">
          <Pagination
            total={pagination.pages}
            value={filters.page}
            onChange={handlePageChange}
          />
        </Group>
      )}
    </Stack>
  );
}