import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchParentSessions } from "../../features/parent/parentSessionSlice";

import {
  Card,
  Text,
  Avatar,
  Group,
  Badge,
  Button,
  Tabs,

} from "@mantine/core";

export default function ParentSessionsPage(){

const dispatch = useDispatch();
const navigate = useNavigate();

const { sessions} = useSelector(
  (state)=>state.parentSessions
);

const [status,setStatus] = useState("live");




const { activeStudent } = useSelector(
  (state) => state.parentStudents
);

useEffect(()=>{

dispatch(fetchParentSessions({status}));

const interval = setInterval(()=>{
dispatch(fetchParentSessions({status}));
},5000);

return ()=>clearInterval(interval);

},[status, dispatch]);

// if(initialLoading){
// return(
// <div className="flex justify-center p-10">
// <Loader/>
// </div>
// );
// }

return(

<div className="min-h-screen bg-gray-50">

{/* HEADER */}

<div className="text-black p-5">

<Text fw={700} size="lg">
Classes
</Text>

<Text size="xs">
Manage {activeStudent?.name}'s sessions
</Text>

</div>


{/* TABS */}

<div className="p-4">

<Tabs
value={status}
onChange={setStatus}
variant="pills"
>

<Tabs.List>

<Tabs.Tab value="live">Live</Tabs.Tab>

<Tabs.Tab value="scheduled">
Upcoming
</Tabs.Tab>

<Tabs.Tab value="completed">
Completed
</Tabs.Tab>

<Tabs.Tab value="cancelled">
Cancelled
</Tabs.Tab>

</Tabs.List>

</Tabs>

</div>


{/* SESSION CARDS */}

<div className="px-4 pb-20 space-y-4">
{sessions.length === 0 ? (

  <div className="flex flex-col items-center justify-center py-16 text-center">

    <Text fw={600} size="lg">
      No {status} sessions
    </Text>

    <Text size="sm" c="dimmed" mt={4}>
      {status === "live" && "No live classes right now"}
      {status === "scheduled" && "No upcoming sessions scheduled"}
      {status === "completed" && "No completed sessions yet"}
      {status === "cancelled" && "No cancelled sessions"}
    </Text>

  </div>

) : (

  sessions.map((session)=>(

    <Card key={session._id} shadow="sm" radius="lg" p="lg">

      <Group justify="space-between">

        <Text fw={600}>
          {session.title}
        </Text>

        {session.status==="live" && (
          <Badge color="red">LIVE</Badge>
        )}

      </Group>

      <Group mt="sm">

        <Avatar
          src={session.tutorId?.profileImage}
          radius="xl"
        />

        <div>
          <Text size="sm">
            {session.tutorId?.fullName}
          </Text>

          <Text size="xs" c="dimmed">
            Math Tutor
          </Text>
        </div>

      </Group>

      <Text size="sm" mt="sm" c="dimmed">
        {session.courseId?.subject}
      </Text>

      <Text size="xs" c="dimmed">
        {new Date(session.sessionDate).toLocaleDateString()}
      </Text>

      {session.status==="live" && (

        <Button
          fullWidth
          radius="md"
          mt="md"
          color="blue"
          onClick={() =>
            navigate(`/parent/live/${session.channelName}/${session._id}`)
          }
        >
          JOIN CLASS
        </Button>

      )}

      {session.status==="scheduled" && (

        <Button
          variant="light"
          fullWidth
          radius="md"
          mt="md"
        >
          View Details
        </Button>

      )}

    </Card>

  ))

)}

</div>
</div>

);
}