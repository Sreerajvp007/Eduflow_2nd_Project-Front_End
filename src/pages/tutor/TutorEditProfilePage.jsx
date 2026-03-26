import {
Card,
TextInput,
Button,
Stack,
Text,
Group,
Avatar,
FileInput,
NumberInput,
Loader,
Grid,
Modal
} from "@mantine/core";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
fetchTutorProfile,
updateTutorProfile,
fetchProfileEditRequest
} from "../../features/tutor/settingsSlice";

import { notifications } from "@mantine/notifications";

export default function TutorEditProfilePage(){

const dispatch = useDispatch();
const navigate = useNavigate();

const { profile, loadingProfile, saving, editRequest } =
useSelector((state)=>state.settings);

const [image,setImage] = useState(null);
const [confirmOpen,setConfirmOpen] = useState(false);

const [form,setForm] = useState({
fullName:"",
mobile:"",
teachingExperience:0,
monthlyFee:0
});

useEffect(()=>{

dispatch(fetchTutorProfile());
dispatch(fetchProfileEditRequest());

},[dispatch]);
// fetch profile
useEffect(()=>{
dispatch(fetchTutorProfile());
},[dispatch]);


// fill form
useEffect(()=>{

if(profile){

setForm({
fullName:profile.fullName || "",
mobile:profile.mobile || "",
teachingExperience:profile.teachingExperience || 0,
monthlyFee:profile.monthlyFee || 0
});

}

},[profile]);



const handleSave = ()=>{

if(saving) return;

setConfirmOpen(true);

};



const submit = async ()=>{

try{

const formData = new FormData();

formData.append("fullName",form.fullName);
formData.append("mobile",form.mobile);
formData.append("teachingExperience",form.teachingExperience);
formData.append("monthlyFee",form.monthlyFee);

if(image){
formData.append("profileImage",image);
}

await dispatch(updateTutorProfile(formData)).unwrap();

notifications.show({
title:"Success",
message:"Profile updation submitted successfully",
color:"green"
});

navigate("/tutor/settings",{replace:true});

}catch(err){

const errorMsg =
  err?.errors?.length
    ? err.errors.map(e => e.message).join(", ")
    : err?.message || "Failed to update profile";

notifications.show({
  title:"Error",
  message:errorMsg,
  color:"red"
});

}

};



// if(loadingProfile){

// return(
// <div className="flex justify-center mt-20">
// <Loader size="lg"/>
// </div>
// );

// }



return(

<div className="w-full px-8 py-6">

<Text fw={700} size="xl">
Edit Profile
</Text>

<Text size="sm" c="dimmed" mb="lg">
Update your tutor profile information
</Text>



<Card
withBorder
radius="md"
shadow="sm"
p="xl"
>

<Stack gap="lg">


{/* Profile image */}

<Group align="center" gap="lg">

<Avatar
src={
image
? URL.createObjectURL(image)
: profile?.profileImage
}
size={100}
radius="xl"
/>

<div>

<Text fw={500} mb={4}>
Profile Photo
</Text>

<FileInput
accept="image/*"
value={image}
onChange={setImage}
variant="unstyled"
styles={{
input: { display: "none" }
}}
/>

<Button
variant="light"
size="sm"
component="label"
>
Change Photo
<input
type="file"
hidden
accept="image/*"
onChange={(e)=>setImage(e.target.files[0])}
/>
</Button>

<Text size="xs" c="dimmed" mt={4}>
JPG, PNG up to 2MB
</Text>

</div>

</Group>



{/* GRID INPUTS */}

<Grid>

<Grid.Col span={{ base:12, md:6 }}>

<TextInput
label="Full Name"
value={form.fullName}
onChange={(e)=>setForm({
...form,
fullName:e.target.value
})}
/>

</Grid.Col>


<Grid.Col span={{ base:12, md:6 }}>

<TextInput
label="Mobile"
value={form.mobile}
onChange={(e)=>setForm({
...form,
mobile:e.target.value
})}
/>

</Grid.Col>


<Grid.Col span={{ base:12, md:6 }}>

<NumberInput
label="Teaching Experience (Years)"
value={form.teachingExperience}
min={0}
onChange={(value)=>setForm({
...form,
teachingExperience:value
})}
/>

</Grid.Col>


<Grid.Col span={{ base:12, md:6 }}>

<NumberInput
label="Monthly Fee"
value={form.monthlyFee}
min={0}
onChange={(value)=>setForm({
...form,
monthlyFee:value
})}
/>

</Grid.Col>

</Grid>



<Group justify="flex-end">

{editRequest ? (

<Text fw={500} c="orange">
Profile edit request is under review
</Text>

) : (

<Button
onClick={handleSave}
loading={saving}
disabled={saving}
>
Save Profile
</Button>

)}

</Group>


</Stack>

</Card>



{/* CONFIRMATION MODAL */}

<Modal
opened={confirmOpen}
onClose={()=>setConfirmOpen(false)}
title="Confirm Update"
centered
>

<Text size="sm" mb="lg">
Are you sure you want to update your profile details?
</Text>

<Group justify="flex-end">

<Button
variant="default"
onClick={()=>setConfirmOpen(false)}
>
Cancel
</Button>

<Button
onClick={submit}
loading={saving}
>
Confirm Save
</Button>

</Group>

</Modal>



</div>

)

}