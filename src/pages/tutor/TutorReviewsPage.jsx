

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTutorReviews } from "../../features/common/feedbackSlice";
import { Link } from "react-router-dom";

import {
  Table,
  Text,
  Rating,
  Loader,
  Badge,
  TextInput,
  Select,
  Pagination,
  Modal,
  Avatar,
  Group,
  Card,
  Divider,
  Button,
  Stack
} from "@mantine/core";

import { IconSearch, IconX } from "@tabler/icons-react";

export default function TutorReviewsPage() {

const dispatch = useDispatch();

const {
reviews,
avgRating,
totalReviews,
totalPages,
loading
} = useSelector((state)=>state.feedback);

const [page,setPage] = useState(1);
const [search,setSearch] = useState("");
const [sort,setSort] = useState("latest");

const [opened,setOpened] = useState(false);
const [selectedReview,setSelectedReview] = useState(null);

useEffect(()=>{
dispatch(fetchTutorReviews({
page,
search,
sort
}));
},[page,search,sort]);

if(loading){
return(
<div className="flex justify-center p-10">
<Loader/>
</div>
);
}

return(

<div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4">

{/* HEADER */}

<div>
<Text fw={700} size="lg">Reviews</Text>
<Text size="xs" c="dimmed">
Feedback from parents about your courses
</Text>
</div>


{/* SUMMARY + FILTERS */}

<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

<div className="flex items-center gap-4 bg-white rounded-lg shadow-sm px-5 py-3">

<div>
<Text fw={700} size="lg">{avgRating}</Text>
<Rating value={avgRating} readOnly fractions={2} size="sm"/>
<Text size="xs" c="dimmed">{totalReviews} Reviews</Text>
</div>

<Badge radius="xl">Tutor Rating</Badge>

</div>


<div className="flex flex-col sm:flex-row gap-3">

<TextInput
placeholder="Search parent or subject..."
leftSection={<IconSearch size={14}/>}

rightSection={
search ? (
<IconX
size={14}
className="cursor-pointer"
onClick={()=>{
setSearch("");
setPage(1);
}}
/>
) : null
}

value={search}

onChange={(e)=>{
setPage(1);
setSearch(e.currentTarget.value);
}}

className="w-full sm:w-72"
/>

<Select
value={sort}
onChange={setSort}
data={[
{value:"latest",label:"Latest Reviews"},
{value:"rating",label:"Highest Rating"}
]}
className="w-full sm:w-48"
/>

</div>

</div>


{/* MOBILE CARDS */}

<div className="md:hidden space-y-3 mt-4">

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
{review.courseId?.studentId?.name} • {review.courseId?.subject}
</Text>

</div>

</Group>

<Rating value={review.rating} readOnly size="xs"/>

<Text size="sm">
{review.review}
</Text>

<Text size="xs" c="dimmed">
{new Date(review.createdAt).toLocaleDateString()}
</Text>

<Link to={`/tutor/courses/${review.courseId?._id}`}>

<Text size="xs" c="blue">
Open Course
</Text>

</Link>

<Button
variant="light"
size="xs"
onClick={()=>{
setSelectedReview(review);
setOpened(true);
}}
>
View Overview
</Button>

</Stack>

</Card>

))}

</div>


{/* DESKTOP TABLE */}

<div className="hidden md:block mt-4">

<Table highlightOnHover>

<Table.Thead>

<Table.Tr>

<Table.Th>Parent</Table.Th>
<Table.Th>Student</Table.Th>
<Table.Th>Subject</Table.Th>
<Table.Th>Rating</Table.Th>
<Table.Th>Review</Table.Th>
<Table.Th>Date</Table.Th>
<Table.Th style={{textAlign:"right"}}>Actions</Table.Th>

</Table.Tr>

</Table.Thead>

<Table.Tbody>

{reviews.map((review)=>(

<Table.Tr key={review._id}>

<Table.Td>

<Group gap="xs">

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

<Link to={`/tutor/courses/${review.courseId?._id}`}>

<Text size="sm" c="blue">
{review.courseId?.subject}
</Text>

</Link>

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
{new Date(review.createdAt).toLocaleDateString()}
</Text>

</Table.Td>

<Table.Td style={{textAlign:"right"}}>

<Button
variant="subtle"
size="xs"
onClick={()=>{
setSelectedReview(review);
setOpened(true);
}}
>
View Overview
</Button>

</Table.Td>

</Table.Tr>

))}

</Table.Tbody>

</Table>

</div>


{/* PAGINATION */}

{totalPages > 1 && (

<div className="flex justify-end mt-3">

<Pagination
value={page}
onChange={setPage}
total={totalPages}
/>

</div>

)}


{/* MODAL */}

<Modal
opened={opened}
onClose={()=>setOpened(false)}
title="Review Overview"
size="lg"
radius="md"
>

{selectedReview && (

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<Card withBorder>

<Group>

<Avatar size="lg">
{selectedReview.parentId?.fullName?.charAt(0)}
</Avatar>

<div>

<Text fw={600}>
{selectedReview.parentId?.fullName}
</Text>

<Text size="xs" c="dimmed">
Parent
</Text>

</div>

</Group>

</Card>


<Card withBorder>

<Text fw={600}>Student</Text>
<Divider my="xs"/>

<Text size="sm">
{selectedReview.courseId?.studentId?.name}
</Text>

</Card>


<Card withBorder>

<Text fw={600}>Subject</Text>
<Divider my="xs"/>

<Link to={`/tutor/courses/${selectedReview.courseId?._id}`}>

<Text size="sm" c="blue">
{selectedReview.courseId?.subject}
</Text>

</Link>

</Card>


<Card withBorder>

<Text fw={600}>Rating</Text>
<Divider my="xs"/>

<Rating value={selectedReview.rating} readOnly/>

</Card>


<Card withBorder>

<Text fw={600}>Date</Text>
<Divider my="xs"/>

<Text size="sm">
{new Date(selectedReview.createdAt).toLocaleString()}
</Text>

</Card>


<Card withBorder className="md:col-span-2">

<Text fw={600}>Review</Text>
<Divider my="xs"/>

<Text size="sm">
{selectedReview.review}
</Text>

</Card>

</div>

)}

</Modal>

</div>

);
}