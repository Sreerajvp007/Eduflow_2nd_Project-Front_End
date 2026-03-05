
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  SegmentedControl,
  Table,
  Text,
  Rating,
  Loader,
  TextInput,
  Pagination,
  Avatar,
  Group,
  Badge,
  Button,
  Modal,
  Card,
  Divider,
  Select,
  Stack
} from "@mantine/core";

import { IconSearch } from "@tabler/icons-react";
import { Link } from "react-router-dom";

import {
  fetchAdminReviews,
  fetchAdminReports
} from "../../features/common/feedbackSlice";

export default function AdminFeedbackPage(){

const dispatch = useDispatch();

const {
reviews,
reports,
totalPages,
loading
} = useSelector((state)=>state.feedback);

const [section,setSection] = useState("reviews");
const [search,setSearch] = useState("");
const [page,setPage] = useState(1);
const [sort,setSort] = useState("latest");

const [opened,setOpened] = useState(false);
const [selected,setSelected] = useState(null);

useEffect(()=>{

if(section === "reviews"){
dispatch(fetchAdminReviews({
page,
search,
sort
}));
}

if(section === "reports"){
dispatch(fetchAdminReports({
page,
search
}));
}

},[dispatch,section,page,search,sort]);

if(loading){
return(
<div className="flex justify-center p-10">
<Loader/>
</div>
);
}

return(

<div className="p-4 md:p-6 max-w-7xl mx-auto space-y-5">

{/* HEADER */}

<div>

<Text fw={700} size="lg">
Feedback & Reports
</Text>

<Text size="xs" c="dimmed">
Monitor tutor reviews and parent reports
</Text>

</div>


{/* SWITCH */}

<SegmentedControl
value={section}
onChange={(v)=>{
setSection(v);
setPage(1);
}}
data={[
{label:"Reviews",value:"reviews"},
{label:"Reports",value:"reports"}
]}
/>


{/* FILTERS */}

<div className="flex flex-col sm:flex-row gap-3">

<TextInput
placeholder="Search..."
leftSection={<IconSearch size={14}/>}
value={search}
onChange={(e)=>{
setPage(1);
setSearch(e.currentTarget.value);
}}
className="w-full sm:w-72"
/>

{section === "reviews" && (

<Select
value={sort}
onChange={setSort}
data={[
{value:"latest",label:"Latest Reviews"},
{value:"highest",label:"Highest Rating"},
{value:"lowest",label:"Lowest Rating"}
]}
className="w-full sm:w-48"
/>

)}

</div>


{/* ---------------- MOBILE REVIEWS ---------------- */}

{section === "reviews" && (

<div className="md:hidden space-y-3">

{reviews.map((review)=>(

<Card key={review._id} shadow="sm" radius="md" p="md">

<Stack gap={6}>

<Group>

<Avatar size="sm">
{review.parentId?.fullName?.charAt(0)}
</Avatar>

<div>
<Text fw={500} size="sm">
{review.parentId?.fullName}
</Text>

<Text size="xs" c="dimmed">
{review.courseId?.studentId?.name}
</Text>
</div>

</Group>

<Text size="xs" c="dimmed">Subject</Text>
<Text size="sm">{review.courseId?.subject}</Text>

<Text size="xs" c="dimmed">Tutor</Text>
<Text size="sm">{review.tutorId?.fullName}</Text>

<Rating value={review.rating} readOnly size="xs"/>

<Text size="sm">
{review.review?.slice(0,60)}...
</Text>

<Group justify="space-between">

<Text size="xs" c="dimmed">
{review.createdAt
? new Date(review.createdAt).toLocaleDateString()
: "-"
}
</Text>

<Button
variant="light"
size="xs"
onClick={()=>{
setSelected(review);
setOpened(true);
}}
>
Overview
</Button>

</Group>

</Stack>

</Card>

))}

</div>

)}


{/* ---------------- DESKTOP REVIEWS TABLE ---------------- */}

{section === "reviews" && (

<div className="hidden md:block">

<Table highlightOnHover>

<Table.Thead>

<Table.Tr>

<Table.Th>Parent</Table.Th>
<Table.Th>Student</Table.Th>
<Table.Th>Subject</Table.Th>
<Table.Th>Tutor</Table.Th>
<Table.Th>Rating</Table.Th>
<Table.Th>Review</Table.Th>
<Table.Th>Date</Table.Th>
<Table.Th>Actions</Table.Th>

</Table.Tr>

</Table.Thead>

<Table.Tbody>

{reviews.map((review)=>(

<Table.Tr key={review._id}>

<Table.Td>

<Group>

<Avatar size="sm">
{review.parentId?.fullName?.charAt(0)}
</Avatar>

<Text size="sm">
{review.parentId?.fullName}
</Text>

</Group>

</Table.Td>

<Table.Td>
<Text size="sm">
{review.courseId?.studentId?.name}
</Text>
</Table.Td>

<Table.Td>
<Text size="sm">
{review.courseId?.subject}
</Text>
</Table.Td>

<Table.Td>
<Text size="sm">
{review.tutorId?.fullName}
</Text>
</Table.Td>

<Table.Td>
<Rating value={review.rating} readOnly size="xs"/>
</Table.Td>

<Table.Td>
<Text size="sm">
{review.review?.slice(0,40)}...
</Text>
</Table.Td>

<Table.Td>
<Text size="sm">
{review.createdAt
? new Date(review.createdAt).toLocaleDateString()
: "-"
}
</Text>
</Table.Td>

<Table.Td>

<Button
variant="subtle"
size="xs"
onClick={()=>{
setSelected(review);
setOpened(true);
}}
>
Overview
</Button>

</Table.Td>

</Table.Tr>

))}

</Table.Tbody>

</Table>

</div>

)}


{/* ---------------- MOBILE REPORTS ---------------- */}

{section === "reports" && (

<div className="md:hidden space-y-3">

{reports.map((report)=>(

<Card key={report._id} shadow="sm" p="md">

<Stack gap={6}>

<Group>

<Avatar size="sm">
{report.parentId?.fullName?.charAt(0)}
</Avatar>

<Text fw={500}>
{report.parentId?.fullName}
</Text>

</Group>

<Text size="xs" c="dimmed">Tutor</Text>
<Text size="sm">{report.tutorId?.fullName}</Text>

<Text size="xs" c="dimmed">Subject</Text>
<Text size="sm">{report.courseId?.subject}</Text>

<Group justify="space-between">

<Badge
color={
report.status==="pending"
?"yellow"
:report.status==="reviewed"
?"blue"
:"green"
}
>
{report.status}
</Badge>

<Button
variant="light"
size="xs"
onClick={()=>{
setSelected(report);
setOpened(true);
}}
>
Overview
</Button>

</Group>

</Stack>

</Card>

))}

</div>

)}


{/* ---------------- DESKTOP REPORTS TABLE ---------------- */}

{section === "reports" && (

<div className="hidden md:block">

<Table highlightOnHover>

<Table.Thead>

<Table.Tr>

<Table.Th>Parent</Table.Th>
<Table.Th>Tutor</Table.Th>
<Table.Th>Subject</Table.Th>
<Table.Th>Status</Table.Th>
<Table.Th>Date</Table.Th>
<Table.Th>Actions</Table.Th>

</Table.Tr>

</Table.Thead>

<Table.Tbody>

{reports.map((report)=>(

<Table.Tr key={report._id}>

<Table.Td>

<Group>

<Avatar size="sm">
{report.parentId?.fullName?.charAt(0)}
</Avatar>

<Text size="sm">
{report.parentId?.fullName}
</Text>

</Group>

</Table.Td>

<Table.Td>
<Text size="sm">
{report.tutorId?.fullName}
</Text>
</Table.Td>

<Table.Td>
<Text size="sm">
{report.courseId?.subject}
</Text>
</Table.Td>

<Table.Td>

<Badge
color={
report.status==="pending"
?"yellow"
:report.status==="reviewed"
?"blue"
:"green"
}
>
{report.status}
</Badge>

</Table.Td>

<Table.Td>

<Text size="sm">
{report.createdAt
? new Date(report.createdAt).toLocaleDateString()
: "-"
}
</Text>

</Table.Td>

<Table.Td>

<Button
variant="subtle"
size="xs"
onClick={()=>{
setSelected(report);
setOpened(true);
}}
>
Overview
</Button>

</Table.Td>

</Table.Tr>

))}

</Table.Tbody>

</Table>

</div>

)}


{/* PAGINATION */}

{totalPages > 1 && (

<div className="flex justify-end mt-4">

<Pagination
value={page}
onChange={setPage}
total={totalPages}
/>

</div>

)}

{/* ---- KEEP YOUR MODAL EXACTLY SAME BELOW ---- */}

 {/* MODAL */}

 <Modal
  opened={opened}
  onClose={() => setOpened(false)}
  title="Review Overview"
  size="lg"
  radius="md"
>

{selected && section === "reviews" && (

<div className="space-y-4">

{/* SUMMARY */}

<Card withBorder>

<Group justify="space-between">

<div>

<Text fw={600}>
{selected.courseId?.subject}
</Text>

<Text size="xs" c="dimmed">
Course Subject
</Text>

</div>

<Rating value={selected.rating} readOnly />

</Group>

</Card>


{/* PEOPLE */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

<Card withBorder>

<Text size="xs" c="dimmed">
Parent
</Text>

<Text fw={500}>
{selected.parentId?.fullName}
</Text>

</Card>

<Card withBorder>

<Text size="xs" c="dimmed">
Student
</Text>

<Text fw={500}>
{selected.courseId?.studentId?.name}
</Text>

</Card>

<Card withBorder>

<Text size="xs" c="dimmed">
Tutor
</Text>

<Text fw={500}>
{selected.tutorId?.fullName}
</Text>

</Card>

</div>


{/* REVIEW */}

<Card withBorder>

<Text size="xs" c="dimmed">
Parent Review
</Text>

<Text size="sm">
{selected.review}
</Text>

</Card>


{/* TUTOR INFO */}

<Card withBorder>

<Group justify="space-between">

<div>

<Text size="xs" c="dimmed">
Tutor Rating
</Text>

<Rating
value={selected.tutorId?.avgRating || 0}
readOnly
size="sm"
/>

</div>

<Link to={`/admin/tutors/${selected.tutorId?._id}`}>

<Button size="xs">
View Tutor Profile
</Button>

</Link>

</Group>

</Card>

</div>

)}

{/* REPORT MODAL */}

{selected && section === "reports" && (

<div className="space-y-4">

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<Card withBorder>

<Text size="xs" c="dimmed">
Parent
</Text>

<Text fw={500}>
{selected.parentId?.fullName}
</Text>

</Card>

<Card withBorder>

<Text size="xs" c="dimmed">
Tutor
</Text>

<Text fw={500}>
{selected.tutorId?.fullName}
</Text>

</Card>

<Card withBorder>

<Text size="xs" c="dimmed">
Subject
</Text>

<Text fw={500}>
{selected.courseId?.subject}
</Text>

</Card>

<Card withBorder>

<Text size="xs" c="dimmed">
Status
</Text>

<Badge
color={
selected.status === "pending"
? "yellow"
: selected.status === "reviewed"
? "blue"
: "green"
}
>

{selected.status}

</Badge>

</Card>

</div>

<Card withBorder>

<Text size="xs" c="dimmed">
Report Reason
</Text>

<Text size="sm">
{selected.reason}
</Text>

</Card>

</div>

)}

</Modal>

</div>

);
}