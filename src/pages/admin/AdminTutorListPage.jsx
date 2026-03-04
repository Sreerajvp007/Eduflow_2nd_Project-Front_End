
// import {
//   Avatar,
//   Badge,
//   Button,
//   Group,
//   Select,
//   Stack,
//   Table,
//   Text,
//   TextInput,
//   Card,
// } from "@mantine/core";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTutors } from "../../features/admin/adminTutorSlice";
// import { useNavigate } from "react-router-dom";

// export default function AdminTutorListPage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { list, loading } = useSelector((s) => s.adminTutors);

//   const [filters, setFilters] = useState({
//     search: "",
//     status: "",
//   });

//   useEffect(() => {
//     dispatch(fetchTutors(filters));
//   }, [filters, dispatch]);

//   return (
//     <Stack gap="lg">
//       {/* ================= HEADER ================= */}
//       <Group justify="space-between">
//         <Text fw={700} size="xl">
//           Tutor Management
//         </Text>
//       </Group>

//       {/* ================= FILTERS ================= */}
//       <Group mb="md" wrap="wrap">
//         <TextInput
//           w={260}
//           placeholder="Search by name or subject"
//           value={filters.search}
//           onChange={(e) =>
//             setFilters((prev) => ({
//               ...prev,
//               search: e.target.value,
//             }))
//           }
//         />

//         <Select
//           w={180}
//           placeholder="All Statuses"
//           value={filters.status || "all"}
//           data={[
//             { value: "all", label: "All Statuses" },
//             { value: "active", label: "Active" },
//             { value: "pending", label: "Pending" },   // ✅ ADDED
//             { value: "blocked", label: "Blocked" },
//           ]}
//           onChange={(value) =>
//             setFilters((prev) => ({
//               ...prev,
//               status: value === "all" ? "" : value,
//             }))
//           }
//         />
//       </Group>

//       {/* ================= DESKTOP TABLE ================= */}
//       <div className="hidden md:block">
//         <Table
//           striped
//           highlightOnHover
//           verticalSpacing="md"
//           horizontalSpacing="md"
//         >
//           <Table.Thead>
//             <Table.Tr>
//               <Table.Th>Tutor</Table.Th>
//               <Table.Th>Subjects</Table.Th>
//               <Table.Th ta="center">Status</Table.Th>
//               <Table.Th ta="right">Actions</Table.Th>
//             </Table.Tr>
//           </Table.Thead>

//           <Table.Tbody>
//             {!loading && list.length === 0 && (
//               <Table.Tr>
//                 <Table.Td colSpan={4}>
//                   <Text ta="center" c="dimmed" py="lg">
//                     No tutors found
//                   </Text>
//                 </Table.Td>
//               </Table.Tr>
//             )}

//             {list.map((tutor) => (
//               <Table.Tr key={tutor._id}>
//                 <Table.Td>
//                   <Group gap="sm" wrap="nowrap">
//                     <Avatar radius="xl" src={tutor.profileImage}>
//                       {tutor.fullName?.charAt(0)}
//                     </Avatar>
//                     <Text fw={600} size="sm">
//                       {tutor.fullName}
//                     </Text>
//                   </Group>
//                 </Table.Td>

//                 <Table.Td>
//                   <Group gap={6} wrap="wrap">
//                     {tutor.subjects?.slice(0, 3).map((subject) => (
//                       <Badge key={subject} size="sm" variant="light">
//                         {subject}
//                       </Badge>
//                     ))}
//                   </Group>
//                 </Table.Td>

//                 <Table.Td ta="center">
//                   <Badge
//                     size="sm"
//                     color={
//                       tutor.status === "active"
//                         ? "green"
//                         : tutor.status === "pending"
//                         ? "yellow"
//                         : "red"
//                     }
//                   >
//                     {tutor.status.toUpperCase()}
//                   </Badge>
//                 </Table.Td>

//                 <Table.Td ta="right">
//                   <Button
//                     size="xs"
//                     variant="subtle"
//                     onClick={() =>
//                       navigate(`/admin/tutors/${tutor._id}`)
//                     }
//                   >
//                     View
//                   </Button>
//                 </Table.Td>
//               </Table.Tr>
//             ))}
//           </Table.Tbody>
//         </Table>
//       </div>

//       {/* ================= MOBILE STACK ================= */}
//       <div className="block md:hidden">
//         <Stack gap="sm">
//           {list.map((tutor) => (
//             <Card key={tutor._id} withBorder radius="md">
//               <Stack gap="xs">
//                 <Group gap="sm">
//                   <Avatar radius="xl" src={tutor.profileImage}>
//                     {tutor.fullName?.charAt(0)}
//                   </Avatar>
//                   <Text fw={600} size="sm">
//                     {tutor.fullName}
//                   </Text>
//                 </Group>

//                 <Group gap={6} wrap="wrap">
//                   {tutor.subjects?.slice(0, 3).map((subject) => (
//                     <Badge key={subject} size="sm" variant="light">
//                       {subject}
//                     </Badge>
//                   ))}
//                 </Group>

//                 <Group justify="space-between" mt="xs">
//                   <Badge
//                     size="sm"
//                     color={
//                       tutor.status === "active"
//                         ? "green"
//                         : tutor.status === "pending"
//                         ? "yellow"
//                         : "red"
//                     }
//                   >
//                     {tutor.status.toUpperCase()}
//                   </Badge>

//                   <Button
//                     size="xs"
//                     variant="subtle"
//                     onClick={() =>
//                       navigate(`/admin/tutors/${tutor._id}`)
//                     }
//                   >
//                     View
//                   </Button>
//                 </Group>
//               </Stack>
//             </Card>
//           ))}
//         </Stack>
//       </div>
//     </Stack>
//   );
// }

import {
  Avatar,
  Badge,
  Button,
  Group,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  Card,
  Pagination,
  LoadingOverlay,
  Box,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTutors } from "../../features/admin/adminTutorSlice";
import { useNavigate } from "react-router-dom";

export default function AdminTutorListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list, loading, pagination } = useSelector(
    (s) => s.adminTutors
  );

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    page: 1,
  });

  useEffect(() => {
    dispatch(fetchTutors(filters));
  }, [filters, dispatch]);

  const handleSearchChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
      page: 1,
    }));
  };

  const handleStatusChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      status: value === "all" ? "" : value,
      page: 1,
    }));
  };

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
          Tutor Management
        </Text>
      </Group>

      {/* FILTERS */}
      <Group mb="md" wrap="wrap">
        <TextInput
          w={260}
          placeholder="Search by name or subject"
          value={filters.search}
          onChange={(e) =>
            handleSearchChange(e.target.value)
          }
        />

        <Select
          w={180}
          placeholder="All Statuses"
          value={filters.status || "all"}
          data={[
            { value: "all", label: "All Statuses" },
            { value: "active", label: "Active" },
            { value: "pending", label: "Pending" },
            { value: "blocked", label: "Blocked" },
          ]}
          onChange={handleStatusChange}
        />
      </Group>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block">
        <Box
          pos="relative"
          style={{ minHeight: 350 }} // prevents layout shift
        >
          <LoadingOverlay
            visible={loading}
            overlayProps={{ blur: 2 }}
          />

          <Table striped highlightOnHover verticalSpacing="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Tutor</Table.Th>
                <Table.Th>Subjects</Table.Th>
                <Table.Th ta="center">Status</Table.Th>
                <Table.Th ta="right">Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {!loading && list.length === 0 && (
                <Table.Tr>
                  <Table.Td colSpan={4}>
                    <Text ta="center" c="dimmed" py="lg">
                      No tutors found
                    </Text>
                  </Table.Td>
                </Table.Tr>
              )}

              {list.map((tutor) => (
                <Table.Tr key={tutor._id}>
                  <Table.Td>
                    <Group gap="sm">
                      <Avatar
                        radius="xl"
                        src={tutor.profileImage}
                      >
                        {tutor.fullName?.charAt(0)}
                      </Avatar>
                      <Text fw={600}>
                        {tutor.fullName}
                      </Text>
                    </Group>
                  </Table.Td>

                  <Table.Td>
                    <Group gap={6} wrap="wrap">
                      {tutor.subjects?.slice(0, 3).map(
                        (subject) => (
                          <Badge
                            key={subject}
                            size="sm"
                            variant="light"
                          >
                            {subject}
                          </Badge>
                        )
                      )}
                    </Group>
                  </Table.Td>

                  <Table.Td ta="center">
                    <Badge
                      size="sm"
                      color={
                        tutor.status === "active"
                          ? "green"
                          : tutor.status === "pending"
                          ? "yellow"
                          : "red"
                      }
                    >
                      {tutor.status.toUpperCase()}
                    </Badge>
                  </Table.Td>

                  <Table.Td ta="right">
                    <Button
                      size="xs"
                      variant="subtle"
                      onClick={() =>
                        navigate(
                          `/admin/tutors/${tutor._id}`
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

      {/* MOBILE VIEW */}
      <div className="block md:hidden">
        <Box pos="relative" style={{ minHeight: 300 }}>
          <LoadingOverlay
            visible={loading}
            overlayProps={{ blur: 2 }}
          />

          <Stack gap="sm">
            {list.map((tutor) => (
              <Card key={tutor._id} withBorder radius="md">
                <Stack gap="xs">
                  <Group gap="sm">
                    <Avatar
                      radius="xl"
                      src={tutor.profileImage}
                    >
                      {tutor.fullName?.charAt(0)}
                    </Avatar>
                    <Text fw={600}>
                      {tutor.fullName}
                    </Text>
                  </Group>

                  <Group gap={6} wrap="wrap">
                    {tutor.subjects?.slice(0, 3).map(
                      (subject) => (
                        <Badge
                          key={subject}
                          size="sm"
                          variant="light"
                        >
                          {subject}
                        </Badge>
                      )
                    )}
                  </Group>

                  <Group justify="space-between">
                    <Badge
                      size="sm"
                      color={
                        tutor.status === "active"
                          ? "green"
                          : tutor.status === "pending"
                          ? "yellow"
                          : "red"
                      }
                    >
                      {tutor.status.toUpperCase()}
                    </Badge>

                    <Button
                      size="xs"
                      variant="subtle"
                      onClick={() =>
                        navigate(
                          `/admin/tutors/${tutor._id}`
                        )
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