

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

  Box,
   SegmentedControl,
   Modal,
   Divider
} from "@mantine/core";


import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../features/admin/studentSlice";
import { fetchParents ,fetchParentDetails,updateParentStatus,updateLocalStatus} from "../../features/admin/parentSlice";
import { useNavigate } from "react-router-dom";


const statusColor = {
  active: "green",
  blocked: "red",
};

export default function StudentParentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: students = [], loading: studentLoading, pagination } =
    useSelector((s) => s.adminStudents);

  const { list: parents = [], loading: parentLoading } =
    useSelector((s) => s.adminParents || {});
    const { details } = useSelector((s) => s.adminParents);

  const [activeTab, setActiveTab] = useState("students");

  const [searchInput, setSearchInput] = useState("");
  const [opened, setOpened] = useState(false);
const [selectedParent, setSelectedParent] = useState(null);
const [updating, setUpdating] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    grade: "",
    status: "",
    page: 1,
  });

  // 🔍 Debounce search
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

  // 📡 Fetch data
  useEffect(() => {
    if (activeTab === "students") {
      dispatch(fetchStudents(filters));
    } else {
      dispatch(fetchParents(filters));
    }
  }, [filters, activeTab, dispatch]);

  const handlePageChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      page: value,
    }));
  };

return (
<div className="p-4 md:p-6 max-w-7xl mx-auto space-y-5">

{/* HEADER */}
<div>
<Text fw={700} size="lg">
Student & Parent Management
</Text>
<Text size="xs" c="dimmed">
Manage students and parents separately
</Text>
</div>

{/* SWITCH */}
<SegmentedControl
value={activeTab}
onChange={(value)=>{
setActiveTab(value);
setFilters(prev=>({...prev,page:1}));
}}
data={[
{label:"Students",value:"students"},
{label:"Parents",value:"parents"},
]}
/>

{/* FILTERS */}
<div className="flex flex-col sm:flex-row gap-3">
<TextInput
placeholder="Search by Name"
leftSection={<IconSearch size={14}/>}
value={searchInput}
onChange={(e)=>setSearchInput(e.currentTarget.value)}
className="w-full sm:w-72"
/>

{activeTab==="students" && (
<Select
value={filters.grade || "all"}
data={[
{value:"all",label:"All Classes"},
...Array.from({length:10},(_,i)=>({
value:`${i+1}`,label:`Grade ${i+1}`
}))
]}
onChange={(value)=>setFilters(prev=>({
...prev,
grade:value==="all"?"":value,
page:1
}))}
className="w-full sm:w-48"
/>
)}

<Select
value={filters.status || "all"}
data={[
{value:"all",label:"All Statuses"},
{value:"active",label:"Active"},
{value:"blocked",label:"Blocked"},
]}
onChange={(value)=>setFilters(prev=>({
...prev,
status:value==="all"?"":value,
page:1
}))}
className="w-full sm:w-48"
/>
</div>

{/* ================= STUDENTS ================= */}

{activeTab==="students" && (
<>

{/* DESKTOP */}
<div className="hidden md:block">
<Box pos="relative" style={{minHeight:350}}>

<Table highlightOnHover>

<Table.Thead>
<Table.Tr>
<Table.Th>Student</Table.Th>
<Table.Th>Parent</Table.Th>
<Table.Th>Contact</Table.Th>
<Table.Th>Grade</Table.Th>
<Table.Th>Status</Table.Th>
<Table.Th ta="right">Actions</Table.Th>
</Table.Tr>
</Table.Thead>

<Table.Tbody>

{!studentLoading && students.length===0 &&(
<Table.Tr>
<Table.Td colSpan={6}>
<Text ta="center" c="dimmed" py="lg">
No students found
</Text>
</Table.Td>
</Table.Tr>
)}

{students.map((s)=>(
<Table.Tr key={s._id}>
<Table.Td>
<Group>
<Avatar radius="xl">{s.name?.charAt(0)}</Avatar>
<Text size="sm">{s.name}</Text>
</Group>
</Table.Td>

<Table.Td>{s.parentId?.fullName}</Table.Td>
<Table.Td>{s.parentId?.mobile}</Table.Td>
<Table.Td>{s.grade}</Table.Td>

<Table.Td>
<Badge color={statusColor[s.status]}>
{s.status}
</Badge>
</Table.Td>

<Table.Td ta="right">
<Button size="xs" variant="subtle"
onClick={()=>navigate(`/admin/students/${s._id}`)}>
View
</Button>
</Table.Td>

</Table.Tr>
))}

</Table.Tbody>

</Table>

</Box>
</div>

{/* MOBILE */}
<div className="md:hidden space-y-3">

{students.length===0 ? (
<div className="text-center py-10">
<Text size="sm" c="dimmed">No students found</Text>
</div>
) : students.map((s)=>(
<Card key={s._id} shadow="sm" p="md">

<Stack gap="xs">

<Group justify="space-between">
<Group>
<Avatar size="sm">{s.name?.charAt(0)}</Avatar>
<Text fw={500}>{s.name}</Text>
</Group>

<Badge color={statusColor[s.status]}>
{s.status}
</Badge>
</Group>

<Text size="sm"><b>Parent:</b> {s.parentId?.fullName}</Text>
<Text size="sm"><b>Mobile:</b> {s.parentId?.mobile}</Text>
<Text size="sm"><b>Grade:</b> {s.grade}</Text>

<Button fullWidth size="xs" variant="subtle"
onClick={()=>navigate(`/admin/students/${s._id}`)}>
View
</Button>

</Stack>

</Card>
))}

</div>

</>
)}

{/* ================= PARENTS ================= */}

{activeTab==="parents" && (
<>

{/* DESKTOP */}
<div className="hidden md:block">
<Box pos="relative" style={{minHeight:350}}>

<Table highlightOnHover>

<Table.Thead>
<Table.Tr>
<Table.Th>Parent</Table.Th>
<Table.Th>Mobile</Table.Th>
<Table.Th>Email</Table.Th>
<Table.Th>Status</Table.Th>
<Table.Th ta="right">Actions</Table.Th>
</Table.Tr>
</Table.Thead>

<Table.Tbody>

{!parentLoading && parents.length===0 &&(
<Table.Tr>
<Table.Td colSpan={5}>
<Text ta="center" c="dimmed" py="lg">
No parents found
</Text>
</Table.Td>
</Table.Tr>
)}

{parents.map((p)=>(
<Table.Tr key={p._id}>
<Table.Td>
<Group>
<Avatar radius="xl">{p.fullName?.charAt(0)}</Avatar>
<Text size="sm">{p.fullName}</Text>
</Group>
</Table.Td>

<Table.Td>{p.mobile}</Table.Td>
<Table.Td>{p.email}</Table.Td>

<Table.Td>
<Badge color={statusColor[p.status]}>
{p.status}
</Badge>
</Table.Td>

<Table.Td ta="right">
<Button size="xs" variant="subtle"
onClick={()=>{
dispatch(fetchParentDetails(p._id));
setOpened(true);
}}>
View
</Button>
</Table.Td>

</Table.Tr>
))}

</Table.Tbody>

</Table>

</Box>
</div>

{/* MOBILE */}
<div className="md:hidden space-y-3">

{parents.length===0 ? (
<div className="text-center py-10">
<Text size="sm" c="dimmed">No parents found</Text>
</div>
) : parents.map((p)=>(
<Card key={p._id} shadow="sm" p="md">

<Stack gap="xs">

<Group justify="space-between">
<Group>
<Avatar size="sm">{p.fullName?.charAt(0)}</Avatar>
<Text fw={500}>{p.fullName}</Text>
</Group>

<Badge color={statusColor[p.status]}>
{p.status}
</Badge>
</Group>

<Text size="sm"><b>Mobile:</b> {p.mobile}</Text>
<Text size="sm"><b>Email:</b> {p.email}</Text>

<Button fullWidth size="xs" variant="subtle"
onClick={()=>{
dispatch(fetchParentDetails(p._id));
setOpened(true);
}}>
View
</Button>

</Stack>

</Card>
))}

</div>

</>
)}

{/* PAGINATION */}
{activeTab==="students" && pagination?.pages>1 && (
<div className="flex justify-center md:justify-end mt-4">
<Pagination
value={filters.page}
onChange={handlePageChange}
total={pagination.pages}
/>
</div>
)}

{/* MODAL (UNCHANGED) */}
<Modal opened={opened} onClose={()=>setOpened(false)} title="Parent Details" size="lg">

{/* KEEP YOUR EXISTING MODAL CONTENT EXACT */}
 {details && (
    <div className="space-y-6">

      {/* 🔥 HEADER */}
      <Group
        justify="space-between"
        className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-gray-50"
      >
        <div>
          <Text fw={600} size="md">
            {details.fullName}
          </Text>
          <Text size="xs" c="dimmed">
            Parent Account
          </Text>
        </div>

        <Group>

          {/* STATUS */}
          <Badge
            size="lg"
            radius="xl"
            variant="light"
            color={details.status === "active" ? "green" : "red"}
          >
            {details.status.toUpperCase()}
          </Badge>

          {/* 🔥 BLOCK / UNBLOCK */}
<Button
  size="xs"
  radius="xl"
  color={details.status === "active" ? "red" : "green"}
  variant={details.status === "active" ? "filled" : "light"}
  loading={updating}
  onClick={async () => {
    setUpdating(true);

    const newStatus =
      details.status === "active" ? "blocked" : "active";

    // 🔥 instant update
    dispatch(updateLocalStatus(newStatus));

    await dispatch(
      updateParentStatus({
        id: details._id,
        status: newStatus,
      })
    );

    setUpdating(false);
  }}
>
  {details.status === "active" ? "Block" : "Unblock"}
</Button>

        </Group>
      </Group>

      {/* 🔥 CONTACT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="p-4 rounded-xl bg-gray-50">
          <Text size="xs" c="dimmed">Email</Text>
          <Text size="sm" fw={500}>
            {details.email}
          </Text>
        </div>

        <div className="p-4 rounded-xl bg-gray-50">
          <Text size="xs" c="dimmed">Mobile</Text>
          <Text size="sm" fw={500}>
            {details.mobile}
          </Text>
        </div>

      </div>

      {/* 🔥 STUDENTS */}
      <div>

        <Group justify="space-between" mb="xs">
          <Text fw={600}>Students</Text>

          <Badge variant="light" radius="xl">
            {details.students?.length || 0}
          </Badge>
        </Group>

        {details.students?.length === 0 && (
          <Text size="sm" c="dimmed">
            No students found
          </Text>
        )}

        <div className="space-y-2">

          {details.students?.map((s) => (
            <div
              key={s._id}
              className="flex items-center justify-between p-3 rounded-xl bg-white shadow-sm hover:shadow-md transition border border-gray-100"
            >
              <Group>

                <Avatar radius="xl" size="sm">
                  {s.name?.charAt(0)}
                </Avatar>

                <div>
                  <Text size="sm" fw={500}>
                    {s.name}
                  </Text>

                  <Text size="xs" c="dimmed">
                    Grade {s.grade}
                  </Text>
                </div>

              </Group>

              <Button
                size="xs"
                radius="xl"
                variant="light"
                onClick={() =>
                  navigate(`/admin/students/${s._id}`)
                }
              >
                View
              </Button>

            </div>
          ))}

        </div>

      </div>

    </div>
  )}
</Modal>

</div>
);
}