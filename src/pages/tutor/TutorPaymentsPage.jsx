

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifications } from "@mantine/notifications";

import {
  fetchTutorEarnings,
  fetchTutorHistory,
  fetchTutorPayouts,
  requestPayout,
} from "../../features/common/paymentsSlice";

import {
  Table,
  Text,
  Loader,
  Pagination,
  Modal,
  Avatar,
  Group,
  Card,
  Button,
  Stack,
  Badge,
  TextInput,
  Select,
  SegmentedControl,
  Grid,
  Divider
} from "@mantine/core";

import { Link } from "react-router-dom";

export default function TutorPaymentsPage() {

const dispatch = useDispatch();

const { stats, history, payouts, page, totalPages, loading } =
useSelector((state) => state.payments);

const [view,setView] = useState("payments");
const [opened,setOpened] = useState(false);
const [submitting,setSubmitting] = useState(false);

const [amount,setAmount] = useState("");
const [method,setMethod] = useState("bank");
const [notes,setNotes] = useState("");

const [overviewOpened,setOverviewOpened] = useState(false);
const [selectedItem,setSelectedItem] = useState(null);
const [overviewType,setOverviewType] = useState("");

const [statusFilter,setStatusFilter] = useState("all");

useEffect(()=>{

dispatch(fetchTutorEarnings());

if(view==="payments"){
dispatch(fetchTutorHistory(page));
}else{
dispatch(fetchTutorPayouts(page));
}

},[dispatch,page,view]);

if(loading){
return(
<div className="flex justify-center p-10">
<Loader/>
</div>
);
}

/* -----------------------------
SUBMIT PAYOUT
----------------------------- */

const submit = async () => {

if(!amount){
notifications.show({
title:"Error",
message:"Enter payout amount",
color:"red"
});
return;
}

if(Number(amount) > stats.walletBalance){
notifications.show({
title:"Error",
message:"Amount exceeds wallet balance",
color:"red"
});
return;
}

try{

setSubmitting(true);

const result = await dispatch(
requestPayout({ amount:Number(amount), method, notes })
);

if(requestPayout.fulfilled.match(result)){

notifications.show({
title:"Success",
message:"Payout request submitted",
color:"green"
});

setAmount("");
setMethod("bank");
setNotes("");
setOpened(false);

}else{

notifications.show({
title:"Error",
message: result.payload || "Failed to request payout",
color:"red"
});

}

}catch(err){

notifications.show({
title:"Error",
message:"Something went wrong",
color:"red"
});

}finally{
setSubmitting(false);
}

};

/* -----------------------------
FILTER PAYOUTS
----------------------------- */

const filteredPayouts =
statusFilter === "all"
? payouts
: payouts.filter(p=>p.status===statusFilter);

/* -----------------------------
OPEN OVERVIEW
----------------------------- */

const openOverview = (item,type)=>{
setSelectedItem(item);
setOverviewType(type);
setOverviewOpened(true);
};

return(

<div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">

{/* HEADER */}

<div>

<Text fw={700} size="lg">
Payments
</Text>

<Text size="xs" c="dimmed">
Your earnings and payout requests
</Text>

</div>

{!stats?.hasBankDetails && (

<Card
withBorder
radius="md"
p="md"
style={{
background:"#fff7e6",
borderColor:"#ffd591"
}}
>

<Group justify="space-between">

<div>

<Text fw={600}>
Add your bank details to receive payouts
</Text>

<Text size="sm" c="dimmed">
You must add bank details before requesting a withdrawal.
</Text>

</div>

<Link to="/tutor/settings/bank">

<Button color="orange">
Add Bank Details
</Button>

</Link>

</Group>

</Card>

)}
{/* STATS */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

<Card shadow="sm" p="md">
<Text size="xs" c="dimmed">Total Earnings</Text>
<Text fw={700} size="lg">₹{stats?.totalEarnings}</Text>
</Card>

<Card shadow="sm" p="md">
<Text size="xs" c="dimmed">Total Withdrawn</Text>
<Text fw={700} size="lg">
₹{stats?.totalWithdrawn?.toLocaleString() || 0}
</Text>
</Card>

<Card shadow="sm" p="md">
<Text size="xs" c="dimmed">Pending Payout</Text>
<Text fw={700} size="lg">₹{stats?.pendingAmount}</Text>
</Card>

<Card shadow="sm" p="md">

<Text size="xs" c="dimmed">Wallet Balance</Text>
<Text fw={700} size="lg">₹{stats?.walletBalance}</Text>

<Button
size="xs"
mt="sm"
fullWidth
disabled={!stats?.walletBalance}
onClick={() => {

if(!stats?.hasBankDetails){

notifications.show({
title:"Add Bank Details",
message:"Please add bank details before requesting payout",
color:"red"
});

return;

}

setOpened(true);

}}
>
Request Payout
</Button>

</Card>

</div>


{/* SWITCH */}

<Group justify="space-between">

<SegmentedControl
value={view}
onChange={setView}
data={[
{label:"Payments",value:"payments"},
{label:"Payout Requests",value:"payouts"},
]}
/>

{view==="payouts" && (

<Select
size="xs"
value={statusFilter}
onChange={setStatusFilter}
data={[
{value:"all",label:"All"},
{value:"pending",label:"Pending"},
{value:"paid",label:"Paid"},
{value:"rejected",label:"Rejected"},
]}
/>

)}

</Group>


<Text fw={600}>
{view==="payments"
? "Student Course Payments"
: "Payout Requests"}
</Text>


{/* TABLE */}

<Card shadow="sm" p="md">

<Table highlightOnHover>

{view==="payments" && (

<>
<Table.Thead>
<Table.Tr>
<Table.Th>Parent</Table.Th>
<Table.Th>Student</Table.Th>
<Table.Th>Subject</Table.Th>
<Table.Th>Amount Earned</Table.Th>
<Table.Th>Date</Table.Th>
<Table.Th>Action</Table.Th>
</Table.Tr>
</Table.Thead>

<Table.Tbody>

{history.map((p)=>{

const student = p.studentName;
const parent = p.parentName;

return(

<Table.Tr key={p._id}>

<Table.Td>

<Group gap="xs">

<Avatar size="sm">
{parent?.charAt(0)}
</Avatar>

<Text size="sm">{parent}</Text>

</Group>

</Table.Td>

<Table.Td>{student}</Table.Td>

<Table.Td>{p.subject}</Table.Td>

<Table.Td>
<Text fw={600} c="green">
₹{p.tutorEarning}
</Text>
</Table.Td>

<Table.Td>
{new Date(p.createdAt).toLocaleDateString()}
</Table.Td>

<Table.Td>

<Button
size="xs"
variant="light"
onClick={()=>openOverview(p,"payment")}
>
Overview
</Button>

</Table.Td>

</Table.Tr>

);

})}

</Table.Tbody>

</>

)}


{view==="payouts" && (

<>
<Table.Thead>

<Table.Tr>

<Table.Th>Amount</Table.Th>
<Table.Th>Method</Table.Th>
<Table.Th>Status</Table.Th>
<Table.Th>Date</Table.Th>
<Table.Th>Action</Table.Th>

</Table.Tr>

</Table.Thead>

<Table.Tbody>

{filteredPayouts.map((p)=>(

<Table.Tr key={p._id}>

<Table.Td>₹{p.amount}</Table.Td>

<Table.Td>{p.method}</Table.Td>

<Table.Td>

<Badge
color={
p.status==="paid"
?"green"
:p.status==="pending"
?"yellow"
:"red"
}
>
{p.status}
</Badge>

</Table.Td>

<Table.Td>
{new Date(p.createdAt).toLocaleDateString()}
</Table.Td>

<Table.Td>

<Button
size="xs"
variant="light"
onClick={()=>openOverview(p,"payout")}
>
Overview
</Button>

</Table.Td>

</Table.Tr>

))}

</Table.Tbody>

</>

)}

</Table>

</Card>


{/* PAGINATION */}

{totalPages>1 && (

<div className="flex justify-end">

<Pagination
value={page}
onChange={(p)=>{
if(view==="payments"){
dispatch(fetchTutorHistory(p));
}else{
dispatch(fetchTutorPayouts(p));
}
}}
total={totalPages}
/>

</div>

)}


{/* PAYOUT MODAL */}

<Modal
opened={opened}
onClose={()=>setOpened(false)}
title="Request Payout"
>

<Stack>

<TextInput
label="Amount"
placeholder="Enter amount"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
/>

<Select
label="Method"
data={[
{value:"bank",label:"Bank Transfer"},
{value:"upi",label:"UPI"},
]}
value={method}
onChange={setMethod}
/>

<TextInput
label="Notes"
placeholder="Optional notes"
value={notes}
onChange={(e)=>setNotes(e.target.value)}
/>

<Button
loading={submitting}
onClick={submit}
>
Submit Request
</Button>

</Stack>

</Modal>
{/* OVERVIEW MODAL */}

<Modal
opened={overviewOpened}
onClose={()=>setOverviewOpened(false)}
title="Overview"
size="lg"
radius="md"
>

{selectedItem && overviewType==="payment" && (

<Stack gap="md">

<Card withBorder radius="md">

<Group>

<Avatar size="lg">
{selectedItem.studentName?.charAt(0)}
</Avatar>

<div>

<Text fw={600}>
{selectedItem.studentName}
</Text>

<Text size="xs" c="dimmed">
Student
</Text>

</div>

</Group>

</Card>

<Grid>

<Grid.Col span={6}>

<Card withBorder>

<Text fw={600}>
Subject
</Text>

<Divider my="xs"/>

<Text size="sm">
{selectedItem.subject}
</Text>

</Card>

</Grid.Col>

<Grid.Col span={6}>

<Card withBorder>

<Text fw={600}>
Tutor Earnings
</Text>

<Divider my="xs"/>

<Text size="sm" c="green" fw={600}>
₹{selectedItem.tutorEarning}
</Text>

</Card>

</Grid.Col>

<Grid.Col span={6}>

<Card withBorder>

<Text fw={600}>
Payment Date
</Text>

<Divider my="xs"/>

<Text size="sm">
{new Date(selectedItem.createdAt).toLocaleString()}
</Text>

</Card>

</Grid.Col>

<Grid.Col span={6}>

<Card withBorder>

<Text fw={600}>
Parent
</Text>

<Divider my="xs"/>

<Text size="sm">
{selectedItem.parentName || "Not Available"}
</Text>

</Card>

</Grid.Col>

</Grid>

<Card withBorder>

<Group justify="space-between">

<div>

<Text fw={600}>
Course
</Text>

<Text size="xs" c="dimmed">
View course details and sessions
</Text>

</div>

{selectedItem.courseId && (

<Link to={`/tutor/courses/${selectedItem.courseId}`}>

<Button size="xs">
Open Course Overview
</Button>

</Link>

)}

</Group>

</Card>

</Stack>

)}


{selectedItem && overviewType==="payout" && (

<Stack gap="md">

<Card withBorder>

<Text fw={600}>
Payout Request
</Text>

<Text size="xs" c="dimmed">
Withdrawal request from wallet
</Text>

</Card>

<Grid>

<Grid.Col span={6}>

<Card withBorder>

<Text fw={600}>
Amount
</Text>

<Divider my="xs"/>

<Text fw={600}>
₹{selectedItem.amount}
</Text>

</Card>

</Grid.Col>

<Grid.Col span={6}>

<Card withBorder>

<Text fw={600}>
Method
</Text>

<Divider my="xs"/>

<Text>
{selectedItem.method}
</Text>

</Card>

</Grid.Col>

<Grid.Col span={6}>

<Card withBorder>

<Text fw={600}>
Status
</Text>

<Divider my="xs"/>

<Badge
color={
selectedItem.status==="paid"
? "green"
: selectedItem.status==="pending"
? "yellow"
: "red"
}
>
{selectedItem.status}
</Badge>

</Card>

</Grid.Col>

<Grid.Col span={6}>

<Card withBorder>

<Text fw={600}>
Requested Date
</Text>

<Divider my="xs"/>

<Text>
{new Date(selectedItem.createdAt).toLocaleString()}
</Text>

</Card>

</Grid.Col>

</Grid>

<Card withBorder>

<Text fw={600}>
Notes
</Text>

<Divider my="xs"/>

<Text size="sm">
{selectedItem.notes || "No notes added"}
</Text>

</Card>

</Stack>

)}

</Modal>

</div>

);
}