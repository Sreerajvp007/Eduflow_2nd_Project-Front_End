
import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  TextInput,
  Textarea
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { notifications } from "@mantine/notifications";

import {
  fetchSessions,
  createSession,
  cancelSession,
  deleteSession,
  fetchAvailability,
  blockAvailability,
  unblockAvailability,
  fetchTutorStudents
} from "../../features/tutor/sessionSlice";

const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

export default function SchedulePage(){

const dispatch = useDispatch();

const { sessions, availability, students } =
useSelector(state => state.sessions);

const [week,setWeek] = useState(dayjs());

const [scheduleOpen,setScheduleOpen] = useState(false);
const [previewOpen,setPreviewOpen] = useState(false);
const [blockOpen,setBlockOpen] = useState(false);

const [selectedSlot,setSelectedSlot] = useState(null);
const [selectedSession,setSelectedSession] = useState(null);

const [form,setForm] = useState({
studentName:"",
studentId:"",
subject:"",
courseId:"",
title:"",
description:""
});

useEffect(()=>{
dispatch(fetchSessions());
dispatch(fetchAvailability());
dispatch(fetchTutorStudents());
},[dispatch]);

const times = availability?.map(a=>a.time) || [];

const startOfWeek = week.startOf("week");

const resetForm = ()=>{
setForm({
studentName:"",
studentId:"",
subject:"",
courseId:"",
title:"",
description:""
});
};

/* OPEN SLOT */

const openSchedule=(day,time)=>{

const date = startOfWeek.add(day,"day");

setSelectedSlot({date,time});
setScheduleOpen(true);

};

/* OPEN PREVIEW */

const openPreview=(date,time)=>{

const session = sessions.find(
s =>
dayjs(s.sessionDate).format("YYYY-MM-DD") === date.format("YYYY-MM-DD")
&& s.startTime===time
);

if(session){
setSelectedSession(session);
setPreviewOpen(true);
}

};

/* CREATE SESSION */

const scheduleClass = async()=>{

try{

await dispatch(createSession({
courseId:form.courseId,
studentId:form.studentId,
title:form.title,
description:form.description,
sessionDate:selectedSlot.date,
startTime:selectedSlot.time
})).unwrap();

notifications.show({
title:"Success",
message:"Session created successfully",
color:"green"
});

resetForm();
setScheduleOpen(false);

}catch(err){

notifications.show({
title:"Error",
message: typeof err === "string" ? err : err.message,
color:"red"
});

}

};

/* CANCEL SESSION */

const cancelClass = async()=>{

await dispatch(cancelSession(selectedSession._id));

notifications.show({
title:"Cancelled",
message:"Session cancelled",
color:"orange"
});

setPreviewOpen(false);

};

/* DELETE SESSION */

const deleteClass = async()=>{

await dispatch(deleteSession(selectedSession._id));

notifications.show({
title:"Deleted",
message:"Session permanently deleted",
color:"red"
});

setPreviewOpen(false);

};

/* SLOT STATUS */

const getStatus=(date,time)=>{

const blocked = availability.find(
a=>a.time===time && a.status==="blocked"
);

if(blocked) return "blocked";

const s = sessions.find(
x =>
dayjs(x.sessionDate).format("YYYY-MM-DD")
=== date.format("YYYY-MM-DD")
&& x.startTime===time
);

if(!s) return "available";

if(s.status==="cancelled") return "cancelled";

return "booked";

};

/* BLOCK SLOT */

const toggleBlock=(slot)=>{

if(slot.status==="blocked"){
dispatch(unblockAvailability(slot.time));
}else{
dispatch(blockAvailability(slot.time));
}

};

/* SUBJECTS */

const selectedStudent =
students.find(s=>s.studentId===form.studentId);

const subjects = selectedStudent?.subjects || [];

return(

<div className="p-8">

<div className="max-w-7xl mx-auto">

{/* HEADER */}

<div className="flex items-center justify-between mb-8">

<h1 className="text-2xl font-semibold">
Schedule
</h1>

<div className="flex items-center gap-3">

<Button
variant="light"
onClick={()=>setWeek(dayjs())}
>
Today
</Button>

<Button
onClick={()=>setWeek(week.subtract(1,"week"))}
>
←
</Button>

<DatePickerInput
value={week.toDate()}
onChange={(date)=>setWeek(dayjs(date))}
className="w-40"
/>

<Button
onClick={()=>setWeek(week.add(1,"week"))}
>
→
</Button>

</div>

</div>

{/* MAIN GRID */}

<div className="grid grid-cols-[1fr_260px] gap-6">

{/* CALENDAR */}

<div className="bg-white border rounded-2xl shadow-sm p-6">

<div className="grid grid-cols-8 gap-3">

<div></div>

{days.map((d,i)=>(
<div key={d} className="text-center font-semibold">
{d}
<br/>
{startOfWeek.add(i,"day").format("DD")}
</div>
))}

{times.map(time=>(

<div key={time+"row"} className="contents">

<div className="text-gray-600 font-medium">
{time}
</div>

{days.map((day,i)=>{

const date=startOfWeek.add(i,"day");

const status=getStatus(date,time);

return(

<div
key={day+"-"+time}
onClick={()=>{

if(status==="available"){
openSchedule(i,time);
}

if(status==="booked" || status==="cancelled"){
openPreview(date,time);
}

}}
className={`h-16 rounded-xl border flex items-center justify-center text-xs cursor-pointer transition

${status==="available"
?"hover:bg-gray-50"

:status==="blocked"
?"bg-gray-400 text-white cursor-not-allowed"

:status==="cancelled"
?"bg-red-400 text-white"

:"bg-indigo-500 text-white"}

`}
>

{status==="available" && "Tap to book"}

{status==="booked" && "Class"}

{status==="cancelled" && "Cancelled"}

</div>

);

})}

</div>

))}

</div>

</div>

{/* LEGEND */}

<div className="bg-white border rounded-2xl shadow-sm p-5 h-fit">

<h3 className="font-semibold mb-4">
Legend
</h3>

<div className="space-y-3 text-sm">

<div className="flex items-center gap-2">
<div className="w-4 h-4 border rounded"></div>
Available
</div>

<div className="flex items-center gap-2">
<div className="w-4 h-4 bg-indigo-500 rounded"></div>
Booked
</div>

<div className="flex items-center gap-2">
<div className="w-4 h-4 bg-gray-400 rounded"></div>
Blocked
</div>

<div className="flex items-center gap-2">
<div className="w-4 h-4 bg-red-500 rounded"></div>
Cancelled
</div>

</div>

<Button
fullWidth
mt="md"
variant="light"
onClick={()=>setBlockOpen(true)}
>
Block Time Slot
</Button>

</div>

</div>

</div>

{/* CREATE SESSION MODAL */}

<Modal
opened={scheduleOpen}
onClose={()=>setScheduleOpen(false)}
title="Schedule Class"
>

<input
list="students"
placeholder="Student"
value={form.studentName}
onChange={(e)=>{

const student = students.find(
s=>s.name===e.target.value
);

setForm({
...form,
studentName:e.target.value,
studentId:student?.studentId,
subject:"",
courseId:""
});

}}
className="border rounded p-2 w-full mb-3"
/>

<datalist id="students">

{students.map(s=>(
<option key={s.studentId} value={s.name}/>
))}

</datalist>

<input
list="subjects"
placeholder="Subject"
value={form.subject}
onChange={(e)=>{

const subject = subjects.find(
s=>s.subject===e.target.value
);

setForm({
...form,
subject:e.target.value,
courseId:subject?.courseId
});

}}
className="border rounded p-2 w-full mb-3"
/>

<datalist id="subjects">

{subjects.map(s=>(
<option key={s.courseId} value={s.subject}/>
))}

</datalist>

<TextInput
label="Session Title"
value={form.title}
onChange={(e)=>setForm({...form,title:e.target.value})}
/>

<Textarea
label="Description"
value={form.description}
onChange={(e)=>setForm({...form,description:e.target.value})}
/>

<Button mt="md" fullWidth onClick={scheduleClass}>
Create Session
</Button>

</Modal>

{/* SESSION PREVIEW */}

<Modal
opened={previewOpen}
onClose={()=>setPreviewOpen(false)}
title="Class Details"
>

<p><b>Student:</b> {selectedSession?.studentId?.name}</p>
<p><b>Subject:</b> {selectedSession?.courseId?.subject}</p>
<p><b>Date:</b> {dayjs(selectedSession?.sessionDate).format("DD MMM YYYY")}</p>
<p><b>Time:</b> {selectedSession?.startTime}</p>

<div className="flex gap-3 mt-4">

<Button color="orange" onClick={cancelClass}>
Cancel Session
</Button>

<Button color="red" onClick={deleteClass}>
Delete Permanently
</Button>

</div>

</Modal>

{/* BLOCK MODAL */}

<Modal
opened={blockOpen}
onClose={()=>setBlockOpen(false)}
title="Manage Slots"
>

<div className="grid grid-cols-2 gap-3">

{availability.map(slot=>(

<Button
key={slot.time}
color={slot.status==="blocked"?"green":"red"}
onClick={()=>toggleBlock(slot)}
>

{slot.status==="blocked"
?`Unblock ${slot.time}`
:`Block ${slot.time}`}

</Button>

))}

</div>

</Modal>

</div>

);
}