
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

return(

<div className="p-4 md:p-6 max-w-7xl mx-auto space-y-5">

{/* HEADER */}

<div>

<Text fw={700} size="lg">
Tutor Management
</Text>

<Text size="xs" c="dimmed">
Manage tutors, view profiles and review profile edit requests
</Text>

</div>


{/* SWITCH BUTTONS */}
<div className="flex justify-start">

<SegmentedControl
  value={activeTab}
  onChange={(value) => {
    setActiveTab(value);
    setFilters((prev) => ({
      ...prev,
      page: 1,
    }));
  }}
  data={[
    { label: "Tutors", value: "tutors" },
    { label: "Profile Requests", value: "requests" },
  ]}
  radius="md" // 👈 same feel as your Students page
  size="sm"   // 👈 balanced (NOT xs, NOT lg)
  className="bg-gray-100 p-1 rounded-md"
  styles={{
    indicator: {
      backgroundColor: "#ffffff",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      borderRadius: "6px"
    },
    label: {
      fontWeight: 500
      // ❌ no custom padding → keeps natural Mantine spacing
    }
  }}
/>

</div>


{/* ================= PROFILE EDIT REQUEST TABLE ================= */}

{activeTab==="requests" && (

<>

<Box pos="relative" style={{minHeight:300}}>

<LoadingOverlay visible={loading} overlayProps={{blur:2}}/>

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

<Text size="sm">
{req.tutorId?.fullName}
</Text>

</Group>

</Table.Td>

<Table.Td>
{req.fullName}
</Table.Td>

<Table.Td>
{req.teachingExperience} yrs
</Table.Td>

<Table.Td>
₹{req.monthlyFee}
</Table.Td>

<Table.Td ta="right">

<Group justify="flex-end">
<Button
size="xs"
variant="light"
onClick={()=>openRequestModal(req)}
>
View
</Button>
<Button
size="xs"
color="green"
onClick={()=>dispatch(approveProfileEdit(req._id))}
>
Approve
</Button>

<Button
size="xs"
color="red"
variant="light"
onClick={()=>dispatch(rejectProfileEdit(req._id))}
>
Reject
</Button>

</Group>

</Table.Td>

</Table.Tr>

))}

</Table.Tbody>

</Table>

</Box>


{/* REQUEST PAGINATION */}

{requestPagination?.pages>1 &&(

<div className="flex justify-end mt-4">

<Pagination
value={requestsPage}
onChange={setRequestsPage}
total={requestPagination.pages}
/>

</div>

)}

</>

)}



{/* ================= TUTOR LIST ================= */}

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


{/* ================= DESKTOP TABLE ================= */}

<div className="hidden md:block">

<Box pos="relative" style={{minHeight:350}}>

<LoadingOverlay visible={loading} overlayProps={{blur:2}}/>

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

<Text ta="center" c="dimmed" py="lg">
No tutors found
</Text>

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

<Text size="sm">
{tutor.fullName}
</Text>

</Group>

</Table.Td>

<Table.Td>
<Text size="sm">
{tutor.mobile || "-"}
</Text>
</Table.Td>

<Table.Td>

<Group gap={6} wrap="wrap">

{tutor.subjects?.slice(0,3).map((subject)=>(
<Badge key={subject} size="sm" variant="light">
{subject}
</Badge>
))}

</Group>

</Table.Td>

<Table.Td>

<Text size="sm">
₹{tutor.monthlyFee || 0}
</Text>

</Table.Td>

<Table.Td>

<Badge
size="sm"
color={
tutor.status==="active"
?"green"
:tutor.status==="pending"
?"yellow"
:"red"
}
>

{tutor.status}

</Badge>

</Table.Td>

<Table.Td ta="right">

<Button
variant="subtle"
size="xs"
onClick={()=>navigate(`/admin/tutors/${tutor._id}`)}
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

{list.map((tutor)=>(

<Card key={tutor._id} shadow="sm" radius="md" p="md">

<Stack gap={6}>

<Group>

<Avatar radius="xl" src={tutor.profileImage}>
{tutor.fullName?.charAt(0)}
</Avatar>

<Text fw={500} size="sm">
{tutor.fullName}
</Text>

</Group>

<Group gap={6} wrap="wrap">

{tutor.subjects?.slice(0,3).map((subject)=>(
<Badge key={subject} size="sm" variant="light">
{subject}
</Badge>
))}

</Group>

<Group justify="space-between">

<Badge
size="sm"
color={
tutor.status==="active"
?"green"
:tutor.status==="pending"
?"yellow"
:"red"
}
>

{tutor.status}

</Badge>

<Button
variant="light"
size="xs"
onClick={()=>navigate(`/admin/tutors/${tutor._id}`)}
>
View
</Button>

</Group>

</Stack>

</Card>

))}

</div>


{/* TUTOR PAGINATION */}

{!loading && pagination?.pages>1 &&(

<div className="flex justify-end mt-4">

<Pagination
value={filters.page}
onChange={handlePageChange}
total={pagination.pages}
/>

</div>

)}

</>

)}
<Modal
opened={modalOpen}
onClose={()=>setModalOpen(false)}
title="Profile Update Request"
size="lg"
centered
>

{selectedRequest && (

<Stack>

<Text fw={600}>Profile Changes</Text>

<Grid>

<Grid.Col span={6}>

<Text size="sm" c="dimmed">
Current Profile
</Text>

<Card withBorder p="sm">

<Text size="sm">
Name: {selectedRequest.tutorId?.fullName}
</Text>

<Text size="sm">
Mobile: {selectedRequest.tutorId?.mobile}
</Text>

<Text size="sm">
Experience: {selectedRequest.tutorId?.teachingExperience} yrs
</Text>

<Text size="sm">
Fee: ₹{selectedRequest.tutorId?.monthlyFee}
</Text>

</Card>

</Grid.Col>


<Grid.Col span={6}>

<Text size="sm" c="dimmed">
Requested Changes
</Text>

<Card withBorder p="sm">

<Text size="sm">
Name: {selectedRequest.fullName}
</Text>

<Text size="sm">
Mobile: {selectedRequest.mobile}
</Text>

<Text size="sm">
Experience: {selectedRequest.teachingExperience} yrs
</Text>

<Text size="sm">
Fee: ₹{selectedRequest.monthlyFee}
</Text>

</Card>

</Grid.Col>

</Grid>

<Group justify="flex-end" mt="md">

<Button
color="red"
variant="light"
onClick={()=>{
dispatch(rejectProfileEdit(selectedRequest._id));
setModalOpen(false);
}}
>
Reject
</Button>

<Button
color="green"
onClick={()=>{
dispatch(approveProfileEdit(selectedRequest._id));
setModalOpen(false);
}}
>
Approve
</Button>

</Group>

</Stack>

)}

</Modal>
</div>

);
}