

import {
  Card,
  TextInput,
  Button,
  Stack,
  Text,
  Group,
  Loader
} from "@mantine/core";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  fetchBankDetails,
  saveBankDetails
} from "../../features/tutor/settingsSlice";

import { notifications } from "@mantine/notifications";

export default function TutorBankDetailsPage() {

const dispatch = useDispatch();
const navigate = useNavigate();

const { bankDetails, loadingFetch } = useSelector((state)=>state.settings);

const [saving,setSaving] = useState(false);

const [form,setForm] = useState({
accountHolderName:"",
accountNumber:"",
ifsc:"",
bankName:""
});


// Fetch bank details on page load
useEffect(()=>{

dispatch(fetchBankDetails());

},[dispatch]);


// Fill form if bank details exist
useEffect(()=>{

if(bankDetails){

setForm({
accountHolderName:bankDetails.accountHolderName || "",
accountNumber:bankDetails.accountNumber || "",
ifsc:bankDetails.ifsc || "",
bankName:bankDetails.bankName || ""
});

}

},[bankDetails]);


const submit = async () => {

if (saving) return;

try {

setSaving(true);

await dispatch(saveBankDetails(form)).unwrap();

notifications.show({
title: "Success",
message: "Bank details updated successfully",
color: "green"
});

// redirect immediately
navigate("/tutor/settings", { replace: true });

}catch (err) {

const errorMsg =
  err?.errors?.length
    ? err.errors.map(e => e.message).join(", ") // Joi multiple errors
    : err?.message || "Failed to save bank details";

notifications.show({
  title: "Error",
  message: errorMsg,
  color: "red"
});

} finally {
setSaving(false);
}

};



// if(loadingFetch){
// return (
// <div className="flex justify-center mt-10">
// <Loader/>
// </div>
// );
// }


return(

<div className="max-w-2xl mx-auto p-6">

<Text fw={700} size="xl">
Bank Details
</Text>

<Text size="sm" c="dimmed" mb="lg">
Add or update your payout bank account
</Text>

<Card
withBorder
radius="md"
shadow="sm"
p="lg"
>

<Stack>

<TextInput
label="Account Holder Name"
placeholder="Enter account holder name"
value={form.accountHolderName}
onChange={(e)=>setForm({
...form,
accountHolderName:e.target.value
})}
/>

<TextInput
label="Account Number"
placeholder="Enter account number"
value={form.accountNumber}
onChange={(e)=>setForm({
...form,
accountNumber:e.target.value
})}
/>

<TextInput
label="IFSC Code"
placeholder="Enter IFSC code"
value={form.ifsc}
onChange={(e)=>setForm({
...form,
ifsc:e.target.value
})}
/>

<TextInput
label="Bank Name"
placeholder="Enter bank name"
value={form.bankName}
onChange={(e)=>setForm({
...form,
bankName:e.target.value
})}
/>

<Group justify="flex-end">

<Button
onClick={submit}
loading={saving}
disabled={saving}
>
Save Bank Details
</Button>

</Group>

</Stack>

</Card>

</div>

)

}