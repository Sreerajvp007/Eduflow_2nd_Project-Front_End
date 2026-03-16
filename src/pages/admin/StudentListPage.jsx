

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

import { IconSearch } from "@tabler/icons-react";
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
(s)=>s.adminStudents
);

const [searchInput,setSearchInput] = useState("");

const [filters,setFilters] = useState({
search:"",
grade:"",
status:"",
page:1
});


// Debounce Search

useEffect(()=>{

const delay=setTimeout(()=>{

setFilters(prev=>({
...prev,
search:searchInput.trim(),
page:1
}));

},400);

return()=>clearTimeout(delay);

},[searchInput]);


// Fetch Students

useEffect(()=>{
dispatch(fetchStudents(filters));
},[filters,dispatch]);

const handlePageChange=(value)=>{
setFilters(prev=>({
...prev,
page:value
}));
};

return(

<div className="p-4 md:p-6 max-w-7xl mx-auto space-y-5">


{/* HEADER */}

<div>

<Text fw={700} size="lg">
Student & Parent Management
</Text>

<Text size="xs" c="dimmed">
Manage students, parents and monitor their status
</Text>

</div>



{/* FILTERS */}

<div className="flex flex-col sm:flex-row gap-3">

<TextInput
placeholder="Search student..."
leftSection={<IconSearch size={14}/>}
value={searchInput}
onChange={(e)=>setSearchInput(e.currentTarget.value)}
className="w-full sm:w-72"
/>

<Select
value={filters.grade || "all"}
data={[
{value:"all",label:"All Classes"},
{value:"1",label:"Grade 1"},
{value:"2",label:"Grade 2"},
{value:"3",label:"Grade 3"},
{value:"4",label:"Grade 4"},
{value:"5",label:"Grade 5"},
{value:"6",label:"Grade 6"},
{value:"7",label:"Grade 7"},
{value:"8",label:"Grade 8"},
{value:"9",label:"Grade 9"},
{value:"10",label:"Grade 10"}
]}
onChange={(value)=>setFilters(prev=>({
...prev,
grade:value==="all"?"":value,
page:1
}))}
className="w-full sm:w-48"
/>

<Select
value={filters.status || "all"}
data={[
{value:"all",label:"All Statuses"},
{value:"active",label:"Active"},
{value:"blocked",label:"Blocked"}
]}
onChange={(value)=>setFilters(prev=>({
...prev,
status:value==="all"?"":value,
page:1
}))}
className="w-full sm:w-48"
/>

</div>



{/* ================= DESKTOP TABLE ================= */}

<div className="hidden md:block">

<Box pos="relative" style={{minHeight:350}}>

<LoadingOverlay visible={loading} overlayProps={{blur:2}}/>

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

{!loading && list.length===0 &&(

<Table.Tr>

<Table.Td colSpan={6}>

<Text ta="center" c="dimmed" py="lg">
No students found
</Text>

</Table.Td>

</Table.Tr>

)}

{list.map((s)=>(

<Table.Tr key={s._id}>

<Table.Td>

<Group>

<Avatar radius="xl">
{s.name?.charAt(0)}
</Avatar>

<Text size="sm">
{s.name}
</Text>

</Group>

</Table.Td>

<Table.Td>
<Text size="sm">
{s.parentId?.fullName}
</Text>
</Table.Td>

<Table.Td>
<Text size="sm">
{s.parentId?.mobile}
</Text>
</Table.Td>

<Table.Td>
<Text size="sm">
{s.grade}
</Text>
</Table.Td>

<Table.Td>

<Badge size="sm" color={statusColor[s.status]}>
{s.status}
</Badge>

</Table.Td>

<Table.Td ta="right">

<Button
variant="subtle"
size="xs"
onClick={()=>navigate(`/admin/students/${s._id}`)}
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



{/* ================= MOBILE VIEW ================= */}

<div className="md:hidden space-y-3">

{list.map((s)=>(

<Card key={s._id} shadow="sm" radius="md" p="md">

<Stack gap={6}>

<Group>

<Avatar radius="xl">
{s.name?.charAt(0)}
</Avatar>

<div>

<Text fw={500} size="sm">
{s.name}
</Text>

<Text size="xs" c="dimmed">
Grade {s.grade}
</Text>

</div>

</Group>

<Text size="sm">
Parent: {s.parentId?.fullName}
</Text>

<Text size="sm" c="dimmed">
{s.parentId?.mobile}
</Text>

<Group justify="space-between">

<Badge size="sm" color={statusColor[s.status]}>
{s.status}
</Badge>

<Button
variant="light"
size="xs"
onClick={()=>navigate(`/admin/students/${s._id}`)}
>

View

</Button>

</Group>

</Stack>

</Card>

))}

</div>



{/* PAGINATION */}

{!loading && pagination?.pages>1 &&(

<div className="flex justify-end mt-4">

<Pagination
value={filters.page}
onChange={handlePageChange}
total={pagination.pages}
/>

</div>

)}

</div>

);
}