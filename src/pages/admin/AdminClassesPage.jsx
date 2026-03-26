

import {
  Card,
  Text,
  Title,
  Button,
  TextInput,
  Badge,
  Modal,
  Tabs,
  Loader,
  Group,
  Stack,
  ActionIcon,
  Accordion
} from "@mantine/core";

import { IconPlus, IconTrash } from "@tabler/icons-react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  fetchClasses,
  createClass,
  updateSubjectsForBoard,
  deleteClass
} from "../../features/admin/adminClassSlice";

export default function AdminClassesPage() {

const dispatch = useDispatch();

const { list, loading } = useSelector(
(state) => state.adminClasses
);

const [grade,setGrade] = useState("");
const [opened,setOpened] = useState(false);
const [selectedClass,setSelectedClass] = useState(null);

const [board,setBoard] = useState("STATE");
const [subjects,setSubjects] = useState([]);
const [newSubject,setNewSubject] = useState("");

/* ================= FETCH ================= */
useEffect(()=>{
dispatch(fetchClasses());
},[dispatch]);

/* ================= CREATE ================= */
const handleCreateClass = async ()=>{
if(!grade) return;

await dispatch(createClass({
classGrade:Number(grade)
}));

setGrade("");
dispatch(fetchClasses());
};

/* ================= OPEN EDIT ================= */
const openEditModal = (cls)=>{
setSelectedClass(cls);
setBoard("STATE");

setSubjects(
cls.subjectsByBoard?.STATE?.map(s=>s.name) || []
);

setOpened(true);
};

/* ================= BOARD CHANGE ================= */
useEffect(()=>{
if(selectedClass){
setSubjects(
selectedClass.subjectsByBoard?.[board]?.map(s=>s.name) || []
);
}
},[board,selectedClass]);

/* ================= ADD SUBJECT ================= */
const addSubject = () => {
  if (!newSubject.trim()) return;

  const formatted = newSubject.trim().toUpperCase(); // ✅ CONVERT HERE

  // avoid duplicates (optional but recommended)
  if (subjects.includes(formatted)) return;

  setSubjects([...subjects, formatted]);
  setNewSubject("");
};

/* ================= DELETE SUBJECT ================= */
const removeSubject = (index)=>{
setSubjects(subjects.filter((_,i)=>i!==index));
};

/* ================= SAVE ================= */
const handleSaveSubjects = async ()=>{
await dispatch(updateSubjectsForBoard({
classId:selectedClass._id,
board,
subjects
}));

setOpened(false);
dispatch(fetchClasses());
};

/* ================= DELETE CLASS ================= */
const handleDeleteClass = async (id)=>{
if(!window.confirm("Delete this class?")) return;

await dispatch(deleteClass(id));
dispatch(fetchClasses());
};

// if(loading){
// return(
// <div className="flex justify-center p-10">
// <Loader/>
// </div>
// );
// }

return(

<div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">

{/* ================= HEADER ================= */}
<div>
<Title order={3}>Classes & Subjects</Title>
<Text size="sm" c="dimmed">
Manage subjects for each class and board
</Text>
</div>

{/* ================= ADD CLASS ================= */}
<Card shadow="sm" radius="lg" withBorder>
<Group>
<TextInput
placeholder="Enter Class Grade (1-12)"
value={grade}
onChange={(e)=>setGrade(e.currentTarget.value)}
className="w-48"
/>

<Button
leftSection={<IconPlus size={16}/>}
onClick={handleCreateClass}
>
Add Class
</Button>
</Group>
</Card>

{/* ================= ACCORDION ================= */}
<Accordion
variant="separated"
radius="lg"
chevronPosition="right"
>

{list.map((cls)=>(

<Accordion.Item key={cls._id} value={cls._id}>

{/* HEADER */}
<Accordion.Control>

<Group justify="space-between" w="100%">

<Text fw={600}>
Class {cls.classGrade}
</Text>

<ActionIcon
color="red"
variant="subtle"
onClick={(e)=>{
e.stopPropagation(); // IMPORTANT (prevents accordion toggle)
handleDeleteClass(cls._id);
}}
>
<IconTrash size={16}/>
</ActionIcon>

</Group>

</Accordion.Control>

{/* CONTENT */}
<Accordion.Panel>

<Stack gap="md">

{/* STATE */}
<div>
<Text size="sm" fw={500}>STATE</Text>
<div className="flex flex-wrap gap-2 mt-1">
{cls.subjectsByBoard?.STATE?.length ? (
cls.subjectsByBoard.STATE.map((s)=>(
<Badge key={s.name} variant="light" color="gray">
{s.name}
</Badge>
))
) : (
<Text size="xs" c="dimmed">No subjects</Text>
)}
</div>
</div>

{/* CBSE */}
<div>
<Text size="sm" fw={500}>CBSE</Text>
<div className="flex flex-wrap gap-2 mt-1">
{cls.subjectsByBoard?.CBSE?.length ? (
cls.subjectsByBoard.CBSE.map((s)=>(
<Badge key={s.name} variant="light" color="gray">
{s.name}
</Badge>
))
) : (
<Text size="xs" c="dimmed">No subjects</Text>
)}
</div>
</div>

{/* ICSE */}
<div>
<Text size="sm" fw={500}>ICSE</Text>
<div className="flex flex-wrap gap-2 mt-1">
{cls.subjectsByBoard?.ICSE?.length ? (
cls.subjectsByBoard.ICSE.map((s)=>(
<Badge key={s.name} variant="light" color="gray">
{s.name}
</Badge>
))
) : (
<Text size="xs" c="dimmed">No subjects</Text>
)}
</div>
</div>

<Button
variant="light"
mt="sm"
onClick={()=>openEditModal(cls)}
>
Edit Subjects
</Button>

</Stack>

</Accordion.Panel>

</Accordion.Item>

))}

</Accordion>

{/* ================= MODAL ================= */}
<Modal
opened={opened}
onClose={()=>setOpened(false)}
title={`Edit Subjects - Class ${selectedClass?.classGrade}`}
radius="lg"
size="md"
>

<Tabs value={board} onChange={setBoard}>

<Tabs.List>
<Tabs.Tab value="STATE">STATE</Tabs.Tab>
<Tabs.Tab value="CBSE">CBSE</Tabs.Tab>
<Tabs.Tab value="ICSE">ICSE</Tabs.Tab>
</Tabs.List>

</Tabs>

{/* SUBJECT LIST */}
<div className="mt-4 flex flex-wrap gap-2">

{subjects.map((sub,i)=>(
<Badge
key={i}
color="gray"
variant="light"
rightSection={
<ActionIcon
size="xs"
color="red"
variant="transparent"
onClick={()=>removeSubject(i)}
>
<IconTrash size={12}/>
</ActionIcon>
}
>
{sub}
</Badge>
))}

</div>

{/* ADD SUBJECT */}
<Group mt="md">
<TextInput
placeholder="Add subject"
value={newSubject}
onChange={(e)=>setNewSubject(e.currentTarget.value)}
/>

<Button
leftSection={<IconPlus size={14}/>}
onClick={addSubject}
>
Add
</Button>
</Group>

<Button fullWidth mt="md" onClick={handleSaveSubjects}>
Save Changes
</Button>

<Button
color="red"
variant="light"
fullWidth
mt="sm"
onClick={()=>handleDeleteClass(selectedClass._id)}
>
Delete This Class
</Button>

</Modal>

</div>
);
}