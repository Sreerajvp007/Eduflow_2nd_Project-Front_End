
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
 
  Box,
  SegmentedControl,
  Modal,
  Grid,
  Divider
} from "@mantine/core";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchTutors,
  fetchProfileEditRequests,
  approveProfileEdit,
  rejectProfileEdit
} from "../../features/admin/adminTutorSlice";

import { useNavigate } from "react-router-dom";
import { IconSearch } from "@tabler/icons-react";

export default function AdminTutorListPage() {

const dispatch = useDispatch();
const navigate = useNavigate();

const {
list,
editRequests,
loading,
pagination,
requestPagination
} = useSelector((s)=>s.adminTutors);

const [activeTab,setActiveTab] = useState("tutors");

const [filters,setFilters] = useState({
search:"",
status:"",
page:1
});

const [requestsPage,setRequestsPage] = useState(1);
const [selectedRequest,setSelectedRequest] = useState(null);
const [modalOpen,setModalOpen] = useState(false);

const openRequestModal = (request)=>{
setSelectedRequest(request);
setModalOpen(true);
};

useEffect(()=>{

dispatch(fetchProfileEditRequests({page:requestsPage}));

},[dispatch,requestsPage]);

useEffect(()=>{

dispatch(fetchTutors(filters));

},[filters,dispatch]);

const handleSearchChange=(value)=>{
setFilters(prev=>({
...prev,
search:value,
page:1
}));
};

const handleStatusChange=(value)=>{
setFilters(prev=>({
...prev,
status:value==="all"?"":value,
page:1
}));
};

const handlePageChange=(value)=>{
setFilters(prev=>({
...prev,
page:value
}));
};
return (

<div className="p-4 md:p-6 max-w-7xl mx-auto space-y-5">

{/* HEADER */}
<div>
<Text fw={700} size="lg">Tutor Management</Text>
<Text size="xs" c="dimmed">
Manage tutors, view profiles and review profile edit requests
</Text>
</div>

{/* SWITCH */}
<div className="flex justify-start">
<SegmentedControl
value={activeTab}
onChange={(value)=>{
setActiveTab(value);
setFilters(prev=>({...prev,page:1}));
}}
data={[
{label:"Tutors",value:"tutors"},
{label:"Profile Requests",value:"requests"},
]}
/>
</div>

{/* ================= REQUESTS ================= */}

{activeTab==="requests" && (

<>

{/* DESKTOP */}
<div className="hidden md:block">

<Box pos="relative" style={{minHeight:300}}>

<Table highlightOnHover>

<Table.Thead>
<Table.Tr>
<Table.Th>Tutor</Table.Th>
<Table.Th>Requested Name</Table.Th>
<Table.Th>Experience</Table.Th>
<Table.Th>Monthly Fee</Table.Th>
<Table.Th ta="right">Actions</Table.Th>
</Table.Tr>
</Table.Thead>

<Table.Tbody>

{!loading && editRequests.length===0 &&(
<Table.Tr>
<Table.Td colSpan={5}>
<Text ta="center" c="dimmed" py="lg">
No profile edit requests
</Text>
</Table.Td>
</Table.Tr>
)}

{editRequests.map((req)=>(
<Table.Tr key={req._id}>
<Table.Td>
<Group>
<Avatar src={req.tutorId?.profileImage}>
{req.tutorId?.fullName?.charAt(0)}
</Avatar>
<Text size="sm">{req.tutorId?.fullName}</Text>
</Group>
</Table.Td>

<Table.Td>{req.fullName}</Table.Td>
<Table.Td>{req.teachingExperience} yrs</Table.Td>
<Table.Td>₹{req.monthlyFee}</Table.Td>

<Table.Td ta="right">
<Group justify="flex-end">
<Button size="xs" variant="light" onClick={()=>openRequestModal(req)}>View</Button>
<Button size="xs" color="green" onClick={()=>dispatch(approveProfileEdit(req._id))}>Approve</Button>
<Button size="xs" color="red" variant="light" onClick={()=>dispatch(rejectProfileEdit(req._id))}>Reject</Button>
</Group>
</Table.Td>

</Table.Tr>
))}

</Table.Tbody>

</Table>

</Box>

</div>

{/* MOBILE */}
<div className="md:hidden space-y-3">

{editRequests.length===0 ? (
<Text ta="center" c="dimmed">No profile edit requests</Text>
) : editRequests.map((req)=>(
<Card key={req._id} p="md">

<Stack gap="xs">

<Group>
<Avatar size="sm" src={req.tutorId?.profileImage}>
{req.tutorId?.fullName?.charAt(0)}
</Avatar>
<Text fw={500}>{req.tutorId?.fullName}</Text>
</Group>

<Text size="sm"><b>Requested:</b> {req.fullName}</Text>
<Text size="sm"><b>Experience:</b> {req.teachingExperience} yrs</Text>
<Text size="sm"><b>Fee:</b> ₹{req.monthlyFee}</Text>

<Group grow>
<Button size="xs" variant="light" onClick={()=>openRequestModal(req)}>View</Button>
<Button size="xs" color="green" onClick={()=>dispatch(approveProfileEdit(req._id))}>Approve</Button>
<Button size="xs" color="red" variant="light" onClick={()=>dispatch(rejectProfileEdit(req._id))}>Reject</Button>
</Group>

</Stack>

</Card>
))}

</div>

{/* PAGINATION */}
{requestPagination?.pages>1 &&(
<div className="flex justify-center md:justify-end mt-4">
<Pagination value={requestsPage} onChange={setRequestsPage} total={requestPagination.pages}/>
</div>
)}

</>

)}

{/* ================= TUTORS ================= */}

{activeTab==="tutors" && (

<>

{/* FILTERS */}
<div className="flex flex-col sm:flex-row gap-3">
<TextInput
placeholder="Search by Tutor name"
leftSection={<IconSearch size={14}/>}
value={filters.search}
onChange={(e)=>handleSearchChange(e.currentTarget.value)}
className="w-full sm:w-72"
/>

<Select
value={filters.status || "all"}
data={[
{value:"all",label:"All Statuses"},
{value:"active",label:"Active"},
{value:"pending",label:"Pending"},
{value:"blocked",label:"Blocked"}
]}
onChange={handleStatusChange}
className="w-full sm:w-48"
/>
</div>

{/* DESKTOP TABLE */}
<div className="hidden md:block">
<Box pos="relative" style={{minHeight:350}}>

<Table highlightOnHover>

<Table.Thead>
<Table.Tr>
<Table.Th>Tutor</Table.Th>
<Table.Th>mobile</Table.Th>
<Table.Th>Subjects</Table.Th>
<Table.Th>Monthly Fee</Table.Th>
<Table.Th>Status</Table.Th>
<Table.Th ta="right">Actions</Table.Th>
</Table.Tr>
</Table.Thead>

<Table.Tbody>

{!loading && list.length===0 &&(
<Table.Tr>
<Table.Td colSpan={6}>
<Text ta="center" c="dimmed" py="lg">No tutors found</Text>
</Table.Td>
</Table.Tr>
)}

{list.map((tutor)=>(
<Table.Tr key={tutor._id}>
<Table.Td>
<Group>
<Avatar radius="xl" src={tutor.profileImage}>
{tutor.fullName?.charAt(0)}
</Avatar>
<Text size="sm">{tutor.fullName}</Text>
</Group>
</Table.Td>

<Table.Td>{tutor.mobile || "-"}</Table.Td>

<Table.Td>
<Group gap={6} wrap="wrap">
{tutor.subjects?.slice(0,3).map((s)=>(
<Badge key={s} size="sm" variant="light">{s}</Badge>
))}
</Group>
</Table.Td>

<Table.Td>₹{tutor.monthlyFee || 0}</Table.Td>

<Table.Td>
<Badge color={
tutor.status==="active"?"green":
tutor.status==="pending"?"yellow":"red"
}>
{tutor.status}
</Badge>
</Table.Td>

<Table.Td ta="right">
<Button size="xs" variant="subtle"
onClick={()=>navigate(`/admin/tutors/${tutor._id}`)}>
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

{list.map((tutor)=>(
<Card key={tutor._id} p="md">

<Stack gap="xs">

<Group>
<Avatar size="sm" src={tutor.profileImage}>
{tutor.fullName?.charAt(0)}
</Avatar>
<Text fw={500}>{tutor.fullName}</Text>
</Group>

<Group gap={6} wrap="wrap">
{tutor.subjects?.slice(0,3).map((s)=>(
<Badge key={s} size="sm" variant="light">{s}</Badge>
))}
</Group>

<Group justify="space-between">
<Badge color={
tutor.status==="active"?"green":
tutor.status==="pending"?"yellow":"red"
}>
{tutor.status}
</Badge>

<Button size="xs" variant="light"
onClick={()=>navigate(`/admin/tutors/${tutor._id}`)}>
View
</Button>
</Group>

</Stack>

</Card>
))}

</div>

{/* PAGINATION */}
{!loading && pagination?.pages>1 &&(
<div className="flex justify-center md:justify-end mt-4">
<Pagination value={filters.page} onChange={handlePageChange} total={pagination.pages}/>
</div>
)}

</>

)}

{/* ================= MODAL ================= */}

<Modal opened={modalOpen} onClose={()=>setModalOpen(false)} size="lg">

{selectedRequest && (

<Stack>

<Grid>

<Grid.Col span={{ base:12, sm:6 }}>
<Card withBorder p="sm">
<Text size="sm" fw={600}>Current</Text>
<Text size="sm">Name: {selectedRequest.tutorId?.fullName}</Text>
<Text size="sm">Mobile: {selectedRequest.tutorId?.mobile}</Text>
</Card>
</Grid.Col>

<Grid.Col span={{ base:12, sm:6 }}>
<Card withBorder p="sm">
<Text size="sm" fw={600}>Requested</Text>
<Text size="sm">Name: {selectedRequest.fullName}</Text>
<Text size="sm">Mobile: {selectedRequest.mobile}</Text>
</Card>
</Grid.Col>

</Grid>

<Group justify="flex-end">
<Button color="red" variant="light"
onClick={()=>dispatch(rejectProfileEdit(selectedRequest._id))}>
Reject
</Button>
<Button color="green"
onClick={()=>dispatch(approveProfileEdit(selectedRequest._id))}>
Approve
</Button>
</Group>

</Stack>

)}

</Modal>

</div>

);
}