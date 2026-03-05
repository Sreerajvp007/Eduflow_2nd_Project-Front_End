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
  Select
} from "@mantine/core";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAdminRevenue,
  fetchAdminPayouts,
  fetchAdminPayments,
  markPayoutPaid
} from "../../features/common/paymentsSlice";

export default function AdminPaymentsPage() {

const dispatch = useDispatch();

const {
  adminStats,
  adminPayments,
  payouts,

  paymentsPage,
  paymentsTotalPages,

  payoutPage,
  payoutTotalPages,

  loading
} = useSelector((state)=>state.payments);

const [view,setView] = useState("payments");

const [statusFilter,setStatusFilter] = useState("all");

useEffect(()=>{

dispatch(fetchAdminRevenue());

if(view === "payments"){
dispatch(fetchAdminPayments(paymentsPage));
}
else{

dispatch(fetchAdminPayouts({
page:payoutPage,
status:statusFilter
}));

}

},[dispatch,view,paymentsPage,payoutPage,statusFilter]);

const markPaid = (id)=>{
dispatch(markPayoutPaid(id));
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
<Text fw={700} size="lg">Payments</Text>
<Text size="xs" c="dimmed">
Platform revenue and tutor payouts
</Text>
</div>


{/* STATS */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

<Card shadow="sm" p="md">
<Text size="xs" c="dimmed">Total Revenue</Text>
<Text fw={700} size="lg">₹{adminStats?.totalRevenue}</Text>
</Card>

<Card shadow="sm" p="md">
<Text size="xs" c="dimmed">Tutor Earnings</Text>
<Text fw={700} size="lg">₹{adminStats?.totalTutorEarnings}</Text>
</Card>

<Card shadow="sm" p="md">
<Text size="xs" c="dimmed">Pending Payout</Text>
<Text fw={700} size="lg">₹{adminStats?.pendingPayout}</Text>
</Card>

<Card shadow="sm" p="md">
<Text size="xs" c="dimmed">Platform Profit</Text>
<Text fw={700} size="lg">₹{adminStats?.platformProfit}</Text>
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

{view === "payouts" && (

<Select
size="xs"
value={statusFilter}
onChange={setStatusFilter}
data={[
{value:"all",label:"All"},
{value:"pending",label:"Pending"},
{value:"paid",label:"Paid"}
]}
/>

)}

</Group>


{/* TABLE */}

<Card shadow="sm" p="md">

<Table highlightOnHover>

{view === "payments" && (

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
<Text size="sm">{p.parentName}</Text>
</Group>
</Table.Td>

<Table.Td>{p.studentName}</Table.Td>

<Table.Td>{p.subject}</Table.Td>

<Table.Td>₹{p.amount}</Table.Td>

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

</Table.Tr>
))}

</Table.Tbody>
</>

)}


{view === "payouts" && (

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

<Table.Td>{p.tutorId?.fullName}</Table.Td>

<Table.Td>{p.tutorId?.email}</Table.Td>

<Table.Td>₹{p.amount}</Table.Td>

<Table.Td>{p.method}</Table.Td>

<Table.Td>
<Badge color={p.status === "paid" ? "green" : "yellow"}>
{p.status}
</Badge>
</Table.Td>

<Table.Td>

<Button
size="xs"
variant="light"
disabled={p.status === "paid"}
onClick={()=>markPaid(p._id)}
>

{p.status === "paid" ? "Paid" : "Mark Paid"}

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

{view === "payments" && paymentsTotalPages > 1 && (

<div className="flex justify-end">

<Pagination
value={paymentsPage}
onChange={(page)=>dispatch(fetchAdminPayments(page))}
total={paymentsTotalPages}
/>

</div>

)}

{view === "payouts" && payoutTotalPages > 1 && (

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

</div>

);

}