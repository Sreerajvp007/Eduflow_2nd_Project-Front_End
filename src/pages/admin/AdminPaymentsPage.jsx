

import {
Table,
Text,
Loader,
Pagination,
Avatar,
Group,
Card,
Button,
Badge,
SegmentedControl,
Select,
Modal,
Stack,
Grid,
Divider
} from "@mantine/core";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
fetchAdminRevenue,
fetchAdminPayouts,
fetchAdminPayments,
markPayoutPaid
} from "../../features/common/paymentsSlice";

export default function AdminPaymentsPage(){

const dispatch = useDispatch();

const{
adminStats,
adminPayments,
payouts,

paymentsPage,
paymentsTotalPages,

payoutPage,
payoutTotalPages,

loading
} = useSelector((state)=>state.payments);

const[view,setView] = useState("payments");
const[statusFilter,setStatusFilter] = useState("all");
const[payingId,setPayingId] = useState(null);
const [overviewOpened,setOverviewOpened] = useState(false);
const [selectedItem,setSelectedItem] = useState(null);
const [overviewType,setOverviewType] = useState("");

const openOverview = (item,type)=>{
setSelectedItem(item);
setOverviewType(type);
setOverviewOpened(true);
};


useEffect(()=>{

dispatch(fetchAdminRevenue());

if(view==="payments"){
dispatch(fetchAdminPayments(paymentsPage));
}
else{
dispatch(fetchAdminPayouts({
page:payoutPage,
status:statusFilter
}));
}

},[dispatch,view,paymentsPage,payoutPage,statusFilter]);


/* -----------------------------
HANDLE PAYOUT
----------------------------- */

const handlePayNow = async(id)=>{

try{

setPayingId(id);

await dispatch(markPayoutPaid(id));

}catch(err){

console.error(err);

}finally{

setPayingId(null);

}

};

if(loading){

return(
<div className="flex justify-center p-10">
<Loader/>
</div>
);

}

return(

<div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">

{/* HEADER */}

<div>

<Text fw={700} size="lg">
Payments
</Text>

<Text size="xs" c="dimmed">
Platform revenue and tutor payouts
</Text>

</div>


{/* STATS */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

<Card shadow="sm" p="md">

<Text size="xs" c="dimmed">
Total Revenue
</Text>

<Text fw={700} size="lg">
₹{adminStats?.totalRevenue}
</Text>

</Card>


<Card shadow="sm" p="md">

<Text size="xs" c="dimmed">
Tutor Earnings
</Text>

<Text fw={700} size="lg">
₹{adminStats?.totalTutorEarnings}
</Text>

</Card>


<Card shadow="sm" p="md">

<Text size="xs" c="dimmed">
Pending Payout
</Text>

<Text fw={700} size="lg">
₹{adminStats?.pendingPayout}
</Text>

</Card>


<Card shadow="sm" p="md">

<Text size="xs" c="dimmed">
Platform Profit
</Text>

<Text fw={700} size="lg">
₹{adminStats?.platformProfit}
</Text>

</Card>

</div>


{/* SWITCH */}

<Group justify="space-between">

<SegmentedControl
value={view}
onChange={setView}
data={[
{label:"Payments",value:"payments"},
{label:"Payout Requests",value:"payouts"}
]}
/>


{view==="payouts" &&(

<Select
size="xs"
value={statusFilter}
onChange={setStatusFilter}
data={[
{value:"all",label:"All"},
{value:"pending",label:"Pending"},
{value:"processing",label:"Processing"},
{value:"paid",label:"Paid"},
{value:"failed",label:"Failed"}
]}
/>

)}

</Group>


{/* TABLE */}

<Card shadow="sm" p="md">

<Table highlightOnHover>

{/* -------------------------
PAYMENTS TABLE
------------------------- */}

{view==="payments" &&(

<>

<Table.Thead>

<Table.Tr>

<Table.Th>Parent</Table.Th>
<Table.Th>Student</Table.Th>
<Table.Th>Course</Table.Th>
<Table.Th>Paid</Table.Th>
<Table.Th>Tutor Earn</Table.Th>
<Table.Th>Admin Fee</Table.Th>
<Table.Th>Date</Table.Th>
<Table.Th>Action</Table.Th>

</Table.Tr>


</Table.Thead>

<Table.Tbody>

{adminPayments.map((p)=>(

<Table.Tr key={p._id}>

<Table.Td>

<Group gap="xs">

<Avatar size="sm">
{p.parentName?.charAt(0)}
</Avatar>

<Text size="sm">
{p.parentName}
</Text>

</Group>

</Table.Td>

<Table.Td>
{p.studentName}
</Table.Td>

<Table.Td>
{p.subject}
</Table.Td>

<Table.Td>
₹{p.amount}
</Table.Td>

<Table.Td>

<Text c="green" fw={600}>
₹{p.tutorEarning}
</Text>

</Table.Td>

<Table.Td>

<Text c="blue" fw={600}>
₹{p.adminCommission}
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

))}

</Table.Tbody>

</>

)}



{/* -------------------------
PAYOUT TABLE
------------------------- */}

{view==="payouts" &&(

<>

<Table.Thead>

<Table.Tr>

<Table.Th>Tutor</Table.Th>
<Table.Th>Email</Table.Th>
<Table.Th>Amount</Table.Th>
<Table.Th>Method</Table.Th>
<Table.Th>Status</Table.Th>
<Table.Th>Action</Table.Th>

</Table.Tr>

</Table.Thead>


<Table.Tbody>

{payouts.map((p)=>(

<Table.Tr key={p._id}>

<Table.Td>
{p.tutorId?.fullName}
</Table.Td>

<Table.Td>
{p.tutorId?.email}
</Table.Td>

<Table.Td>
₹{p.amount}
</Table.Td>

<Table.Td>
{p.method}
</Table.Td>

<Table.Td>

<Badge
color={
p.status==="paid"
? "green"
: p.status==="processing"
? "blue"
: p.status==="failed"
? "red"
: "yellow"
}
>

{p.status}

</Badge>

</Table.Td>


<Table.Td>

<Group gap="xs">

<Button
size="xs"
variant="light"
onClick={()=>openOverview(p,"payout")}
>

Overview

</Button>

<Button
size="xs"
variant="light"
loading={payingId===p._id}
disabled={
p.status==="paid" ||
p.status==="processing"
}
onClick={()=>handlePayNow(p._id)}
>

{p.status==="paid"
? "Paid"
: p.status==="processing"
? "Processing"
: "Pay Now"}

</Button>

</Group>

</Table.Td>


</Table.Tr>

))}

</Table.Tbody>

</>

)}

</Table>

</Card>


{/* PAGINATION */}

{view==="payments" && paymentsTotalPages>1 &&(

<div className="flex justify-end">

<Pagination
value={paymentsPage}
onChange={(page)=>dispatch(fetchAdminPayments(page))}
total={paymentsTotalPages}
/>

</div>

)}


{view==="payouts" && payoutTotalPages>1 &&(

<div className="flex justify-end">

<Pagination
value={payoutPage}
onChange={(page)=>dispatch(fetchAdminPayouts({
page,
status:statusFilter
}))}
total={payoutTotalPages}
/>

</div>

)}
<Modal
opened={overviewOpened}
onClose={()=>setOverviewOpened(false)}
title="Overview"
size="lg"
>

{/* PAYMENT OVERVIEW */}

{selectedItem && overviewType==="payment" && (

<Stack gap="md">

<Card withBorder>

<Group>

<Avatar size="lg">
{selectedItem.parentName?.charAt(0)}
</Avatar>

<div>

<Text fw={600}>
{selectedItem.parentName}
</Text>

<Text size="xs" c="dimmed">
Parent
</Text>

</div>

</Group>

</Card>

<Grid>

<Grid.Col span={6}>

<Card withBorder>

<Text fw={600}>
Student
</Text>

<Divider my="xs"/>

<Text>
{selectedItem.studentName}
</Text>

</Card>

</Grid.Col>


<Grid.Col span={6}>

<Card withBorder>

<Text fw={600}>
Course
</Text>

<Divider my="xs"/>

<Text>
{selectedItem.subject}
</Text>

</Card>

</Grid.Col>


<Grid.Col span={6}>

<Card withBorder>

<Text fw={600}>
Amount Paid
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
Tutor Earnings
</Text>

<Divider my="xs"/>

<Text c="green" fw={600}>
₹{selectedItem.tutorEarning}
</Text>

</Card>

</Grid.Col>


<Grid.Col span={6}>

<Card withBorder>

<Text fw={600}>
Admin Commission
</Text>

<Divider my="xs"/>

<Text c="blue" fw={600}>
₹{selectedItem.adminCommission}
</Text>

</Card>

</Grid.Col>


<Grid.Col span={6}>

<Card withBorder>

<Text fw={600}>
Payment Date
</Text>

<Divider my="xs"/>

<Text>
{new Date(selectedItem.createdAt).toLocaleString()}
</Text>

</Card>

</Grid.Col>

</Grid>

</Stack>

)}


{/* PAYOUT OVERVIEW */}

{selectedItem && overviewType==="payout" && (

<Stack gap="md">

<Card withBorder>

<Text fw={600}>
Tutor
</Text>

<Divider my="xs"/>

<Text>
{selectedItem.tutorId?.fullName}
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
: selectedItem.status==="processing"
? "blue"
: selectedItem.status==="failed"
? "red"
: "yellow"
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

</Stack>

)}

</Modal>

</div>

);

}