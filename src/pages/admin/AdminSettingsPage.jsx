

import {
Card,
Title,
Text,
Button,
Group,
Stack,
NumberInput,
Modal,
Loader
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconPercentage } from "@tabler/icons-react";

import { useDispatch,useSelector } from "react-redux";
import { useEffect,useState } from "react";

import {
fetchSettings,
updateSettings
} from "../../features/admin/adminSettingsSlice";

export default function AdminSettingsPage(){

const dispatch = useDispatch();

const { settings, loading } = useSelector(
(state)=>state.adminSettings
);

const [adminCommission,setAdminCommission] = useState(0);

const [modalOpen,setModalOpen] = useState(false);
const [saving, setSaving] = useState(false);

useEffect(()=>{

dispatch(fetchSettings());

},[dispatch]);

useEffect(()=>{

if(settings){
setAdminCommission(settings.adminCommission);
}

},[settings]);

const tutorCommission = 100 - adminCommission;

const handleSave = async () => {

try{

setSaving(true);

await dispatch(updateSettings({
adminCommission,
tutorCommission
})).unwrap();

notifications.show({
title:"Settings Updated",
message:"Commission settings updated successfully",
color:"green"
});

setModalOpen(false);

dispatch(fetchSettings());

}catch(err){

notifications.show({
title:"Update Failed",
message:"Failed to update settings",
color:"red"
});

} finally {

setSaving(false);

}

};

return(

<div className="p-6 max-w-5xl mx-auto">

<Title order={3}>
Platform Settings
</Title>

<Text size="sm" c="dimmed" mb={30}>
Manage platform configurations and commissions
</Text>


<Stack gap="lg">

{/* COMMISSION SETTINGS CARD */}

<Card
withBorder
radius="md"
shadow="sm"
p="lg"
>

<Group justify="space-between">

<Group>

<div className="bg-blue-100 p-2 rounded-md">

<IconPercentage size={20} color="#2563eb"/>

</div>

<div>

<Text fw={600}>
Commission Settings
</Text>

<Text size="sm" c="dimmed">
Configure admin and tutor commission percentages
</Text>

</div>

</Group>

<Button
variant="light"
onClick={()=>setModalOpen(true)}
>
Edit
</Button>

</Group>

</Card>

</Stack>



{/* EDIT MODAL */}

<Modal
opened={modalOpen}
onClose={()=>setModalOpen(false)}
title="Edit Commission Settings"
centered
>

<Stack>

<NumberInput
label="Admin Commission (%)"
value={adminCommission}
onChange={(value)=>{

if(value <= 100){
setAdminCommission(value);
}

}}
min={0}
max={100}
/>

<NumberInput
label="Tutor Commission (%)"
value={tutorCommission}
readOnly
/>

<Group justify="flex-end">

<Button
variant="default"
onClick={()=>setModalOpen(false)}
>
Cancel
</Button>

<Button 
onClick={handleSave}
loading={saving}
>
Save
</Button>

</Group>

</Stack>

</Modal>

</div>

);

}