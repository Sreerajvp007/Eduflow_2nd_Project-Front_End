

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
fetchTutorSessions,
startTutorSession,
updateSessionStatus

} from "../../features/tutor/tutorSessionSlice";

import { useNavigate } from "react-router-dom";

import {
Table,
Text,
Loader,
Badge,
TextInput,
Select,
Pagination,
Avatar,
Group,
Card,
Stack,
Button,
Modal,
Divider,

} from "@mantine/core";

import { IconSearch, IconX } from "@tabler/icons-react";

export default function TutorSessionsPage(){

const dispatch = useDispatch();
const navigate = useNavigate();

const { sessions, totalPages, loading } =
useSelector((state)=>state.tutorSessions);

const [page,setPage] = useState(1);
const [search,setSearch] = useState("");
const [status,setStatus] = useState("all");
const [detailsOpen,setDetailsOpen] = useState(false);
const [selectedSession,setSelectedSession] = useState(null);

useEffect(()=>{

dispatch(fetchTutorSessions({
page,
search,
status
}));

},[page,search,status,dispatch]);

const openDetails = (session)=>{
setSelectedSession(session);
setDetailsOpen(true);
};

/* ======================
START SESSION
====================== */

const handleStartSession = async(session)=>{

const result = await dispatch(
startTutorSession(session._id)
);

if(result.payload){

navigate(`/tutor/live/${result.payload._id}/${result.payload.channelName}`);

}

};

/* ======================
LIVE SESSION
====================== */

const liveSession = sessions.find(
(s)=>s.status==="live"
);

// if(loading){

// return(
// <div className="flex justify-center p-10">
// <Loader/>
// </div>
// );

// }

const markAsCancelled = async () => {
  await dispatch(
    updateSessionStatus({
      sessionId: selectedSession._id,
      status: "cancelled"
    })
  );

  setDetailsOpen(false);

  dispatch(fetchTutorSessions({ page, search, status }));
};
const canCancel = () => {
  if (!selectedSession) return false;

  if (selectedSession.status !== "completed") return false;

  if (!selectedSession.actualEnd) return false;

  const end = new Date(selectedSession.actualEnd);
  const now = new Date();

  const diffHours = (now - end) / (1000 * 60 * 60);

  return diffHours <= 2;
};
const getDuration = () => {
  if (!selectedSession?.actualStart || !selectedSession?.actualEnd) {
    return "—";
  }

  const start = new Date(selectedSession.actualStart);
  const end = new Date(selectedSession.actualEnd);

  const diffMs = end - start;

  const mins = Math.floor(diffMs / (1000 * 60));
  const hrs = Math.floor(mins / 60);

  const remainingMins = mins % 60;

  if (hrs > 0) {
    return `${hrs}h ${remainingMins}m`;
  }

  return `${mins} min`;
};

return (

<div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4">

{/* HEADER */}

<div>
<Text fw={700} size="lg">Sessions</Text>
<Text size="xs" c="dimmed">
Manage your scheduled tutoring sessions
</Text>
</div>

{/* LIVE CARD */}

{liveSession && (

<Card shadow="md" p="md" radius="md">

<Group justify="space-between" className="flex-col sm:flex-row gap-3">

<div>

<Text c="red" fw={700}>
LIVE SESSION
</Text>

<Text fw={500}>
{liveSession.title}
</Text>

<Text size="xs" c="dimmed">
{liveSession.courseId?.subject}
</Text>

</div>

<Button
color="red"
onClick={()=>navigate(`/tutor/live/${liveSession._id}/${liveSession.channelName}`)}
>
Join Now
</Button>

</Group>

</Card>

)}

{/* FILTERS */}

<div className="flex flex-col sm:flex-row gap-3">

<TextInput
placeholder="Search student or session..."
leftSection={<IconSearch size={14}/>}

rightSection={
search && (
<IconX
size={14}
onClick={()=>{

setSearch("");
setPage(1);

}}
/>
)
}

value={search}

onChange={(e)=>{

setSearch(e.currentTarget.value);
setPage(1);

}}
/>

<Select
value={status}
onChange={(value)=>{

setStatus(value);
setPage(1);

}}

data={[
{value:"all",label:"All"},
{value:"live",label:"Live"},
{value:"scheduled",label:"Upcoming"},
{value:"completed",label:"Completed"},
{value:"cancelled",label:"Cancelled"}
]}
/>

</div>

{/* ================= DESKTOP TABLE ================= */}

<div className="hidden md:block">

<Table highlightOnHover>

<Table.Thead>
<Table.Tr>
<Table.Th>Student</Table.Th>
<Table.Th>Session</Table.Th>
<Table.Th>Subject</Table.Th>
<Table.Th>Status</Table.Th>
<Table.Th>Date</Table.Th>
<Table.Th>Time</Table.Th>
<Table.Th>Action</Table.Th>
</Table.Tr>
</Table.Thead>

<Table.Tbody>

{!loading && sessions.length === 0 ? (

<Table.Tr>
<Table.Td colSpan={7}>
<div className="text-center py-6">
<Text size="sm" c="dimmed">
No sessions found...
</Text>
</div>
</Table.Td>
</Table.Tr>

) : (

sessions.map((session) => (

<Table.Tr key={session._id}>

<Table.Td>
<Group gap="xs">
<Avatar size="sm">
{session.studentId?.name?.charAt(0)}
</Avatar>
<Text size="sm">{session.studentId?.name}</Text>
</Group>
</Table.Td>

<Table.Td>
<Text size="sm">{session.title}</Text>
</Table.Td>

<Table.Td>
<Text size="sm">{session.courseId?.subject}</Text>
</Table.Td>

<Table.Td>
<Badge
color={
session.status === "scheduled"
? "blue"
: session.status === "completed"
? "green"
: session.status === "live"
? "red"
: "gray"
}
>
{session.status}
</Badge>
</Table.Td>

<Table.Td>
{new Date(session.sessionDate).toLocaleDateString()}
</Table.Td>

<Table.Td>
{session.courseId?.timeSlot}
</Table.Td>

<Table.Td>

{session.status === "live" && (
<Button size="xs" color="red"
onClick={()=>navigate(`/tutor/live/${session._id}/${session.channelName}`)}>
Join
</Button>
)}

{session.status === "scheduled" && (
<Button size="xs" color="green"
onClick={()=>handleStartSession(session)}>
Start
</Button>
)}

{session.status === "completed" && (
<Button variant="light" size="xs"
onClick={()=>openDetails(session)}>
View Details
</Button>
)}

</Table.Td>

</Table.Tr>

))

)}

</Table.Tbody>

</Table>

</div>

{/* ================= MOBILE CARDS ================= */}

<div className="md:hidden space-y-3">

{!loading && sessions.length === 0 ? (

<div className="text-center py-10">
<Text size="sm" c="dimmed">
No sessions found...
</Text>
</div>

) : (

sessions.map((session)=>(

<Card key={session._id} shadow="sm" radius="md" p="md">

<Stack gap="xs">

<Group justify="space-between">

<Group gap="xs">
<Avatar size="sm">
{session.studentId?.name?.charAt(0)}
</Avatar>
<Text size="sm" fw={500}>
{session.studentId?.name}
</Text>
</Group>

<Badge
size="sm"
color={
session.status === "scheduled"
? "blue"
: session.status === "completed"
? "green"
: session.status === "live"
? "red"
: "gray"
}
>
{session.status}
</Badge>

</Group>

<div className="text-sm space-y-1">
<div><b>Session:</b> {session.title}</div>
<div><b>Subject:</b> {session.courseId?.subject}</div>
<div><b>Date:</b> {new Date(session.sessionDate).toLocaleDateString()}</div>
<div><b>Time:</b> {session.courseId?.timeSlot}</div>
</div>

<div className="pt-2">

{session.status === "live" && (
<Button fullWidth size="xs" color="red"
onClick={()=>navigate(`/tutor/live/${session._id}/${session.channelName}`)}>
Join
</Button>
)}

{session.status === "scheduled" && (
<Button fullWidth size="xs" color="green"
onClick={()=>handleStartSession(session)}>
Start
</Button>
)}

{session.status === "completed" && (
<Button fullWidth size="xs" variant="light"
onClick={()=>openDetails(session)}>
View Details
</Button>
)}

</div>

</Stack>

</Card>

))

)}

</div>

{/* PAGINATION */}

{totalPages > 1 && (

<div className="flex justify-center md:justify-end mt-3">

<Pagination
value={page}
onChange={setPage}
total={totalPages}
/>

</div>

)}

{/* ================= MODAL ================= */}

<Modal
opened={detailsOpen}
onClose={()=>setDetailsOpen(false)}
title="Session Details"
size="lg"
>

{selectedSession && (

<Stack>

<Card shadow="sm" radius="md" p="lg">

<div className="space-y-4">

{/* HEADER */}

<div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">

<div>
<Text fw={700} size="lg">
{selectedSession.title}
</Text>

<Text size="sm" c="dimmed">
{selectedSession.courseId?.subject}
</Text>
</div>

<Badge
color={
selectedSession.status==="completed"
? "green"
: selectedSession.status==="live"
? "red"
: selectedSession.status==="scheduled"
? "blue"
: "gray"
}
>
{selectedSession.status}
</Badge>

</div>

<Divider/>

{/* DESCRIPTION */}

<div>
<Text fw={600} size="sm">Description</Text>

<Text
size="sm"
dangerouslySetInnerHTML={{
__html:selectedSession.description || "No description"
}}
/>
</div>

<Divider/>

{/* INFO GRID */}

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

<div>
<Text size="xs" c="dimmed">Student</Text>
<Text fw={500}>
{selectedSession.studentId?.name}
</Text>
</div>

<div>
<Text size="xs" c="dimmed">Date</Text>
<Text fw={500}>
{new Date(selectedSession.sessionDate).toLocaleDateString()}
</Text>
</div>

<div>
<Text size="xs" c="dimmed">Scheduled Time</Text>
<Text fw={500}>
{selectedSession.startTime || selectedSession.courseId?.timeSlot}
</Text>
</div>

<div>
<Text size="xs" c="dimmed">Start time</Text>
<Text fw={500}>
{selectedSession.actualStart
? new Date(selectedSession.actualStart).toLocaleString()
: "Not started"}
</Text>
</div>

<div>
<Text size="xs" c="dimmed">End time</Text>
<Text fw={500}>
{selectedSession.actualEnd
? new Date(selectedSession.actualEnd).toLocaleString()
: "Not finished"}
</Text>
</div>

<div>
<Text size="xs" c="dimmed">Duration</Text>
<Text fw={500}>
{getDuration()}
</Text>
</div>

</div>

</div>

</Card>

{canCancel() && (

<Group justify="flex-end">

<Button
color="red"
variant="light"
onClick={markAsCancelled}
>
Mark as Cancelled
</Button>

</Group>

)}

</Stack>

)}

</Modal>

</div>

);



}