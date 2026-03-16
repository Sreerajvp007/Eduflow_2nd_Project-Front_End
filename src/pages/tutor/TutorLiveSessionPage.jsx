
import { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { endTutorSession } from "../../features/tutor/tutorSessionSlice";

import {
ActionIcon,
Group,
Paper,
Text,
Badge,

} from "@mantine/core";

import {
IconMicrophone,
IconMicrophoneOff,
IconVideo,
IconVideoOff,
IconPhoneOff,
IconScreenShare
} from "@tabler/icons-react";

const APP_ID = "dee73252120d4c58be3003dbb531aa51";

export default function TutorLiveSessionPage(){

const { channelName, sessionId } = useParams();

const navigate = useNavigate();
const dispatch = useDispatch();

const clientRef = useRef(
AgoraRTC.createClient({ mode:"rtc", codec:"vp8" })
);

const localRef = useRef(null);
const remoteRef = useRef(null);

const [audioTrack,setAudioTrack] = useState(null);
const [videoTrack,setVideoTrack] = useState(null);
const [screenTrack,setScreenTrack] = useState(null);

const [mic,setMic] = useState(true);
const [camera,setCamera] = useState(true);
const [sharing,setSharing] = useState(false);

const [remoteJoined,setRemoteJoined] = useState(false);


/* =========================
START CALL
========================= */

useEffect(()=>{

startCall();

return ()=>{
cleanup();
};

},[]);

const startCall = async()=>{

const client = clientRef.current;

await client.join(APP_ID,channelName,null,null);

const [micTrack,camTrack] =
await AgoraRTC.createMicrophoneAndCameraTracks();

setAudioTrack(micTrack);
setVideoTrack(camTrack);

camTrack.play(localRef.current);

await client.publish([micTrack,camTrack]);

/* USER JOIN */

client.on("user-published",async(user,mediaType)=>{

await client.subscribe(user,mediaType);

if(mediaType==="video"){

setRemoteJoined(true);

remoteRef.current.innerHTML="";

user.videoTrack.play(remoteRef.current);

}

if(mediaType==="audio"){

user.audioTrack.play();

}

});

/* USER LEAVE */

client.on("user-unpublished",()=>{

setRemoteJoined(false);

if(remoteRef.current){

remoteRef.current.innerHTML="";

}

});

};

/* =========================
MIC
========================= */

const toggleMic = async()=>{

if(!audioTrack) return;

await audioTrack.setEnabled(!mic);

setMic(!mic);

};

/* =========================
CAMERA
========================= */

const toggleCamera = async()=>{

if(!videoTrack) return;

await videoTrack.setEnabled(!camera);

setCamera(!camera);

};

/* =========================
SCREEN SHARE
========================= */

const toggleScreen = async()=>{

const client = clientRef.current;

if(!sharing){

const screen = await AgoraRTC.createScreenVideoTrack(
{ encoderConfig:"1080p_1" },
"auto"
);

setScreenTrack(screen);

await client.unpublish(videoTrack);

localRef.current.innerHTML="";

screen.play(localRef.current);

await client.publish(screen);

screen.on("track-ended",()=>{

stopScreenShare();

});

setSharing(true);

}else{

stopScreenShare();

}

};

const stopScreenShare = async()=>{

const client = clientRef.current;

if(!screenTrack) return;

await client.unpublish(screenTrack);

screenTrack.stop();
screenTrack.close();

setScreenTrack(null);

localRef.current.innerHTML="";

videoTrack.play(localRef.current);

await client.publish(videoTrack);

setSharing(false);

};

/* =========================
END SESSION
========================= */

const endSession = async()=>{

if(!window.confirm("End this session?")) return;

await cleanup();

/* UPDATE SESSION STATUS */

await dispatch(endTutorSession(sessionId));

navigate("/tutor/sessions");

};

/* =========================
CLEANUP
========================= */

const cleanup = async()=>{

const client = clientRef.current;

try{

if(audioTrack){

audioTrack.stop();
audioTrack.close();

}

if(videoTrack){

videoTrack.stop();
videoTrack.close();

}

if(screenTrack){

screenTrack.stop();
screenTrack.close();

}

await client.leave();

}catch(err){

console.log(err);

}

};

/* =========================
UI
========================= */

return(

<div className="h-[calc(100vh-80px)] w-full flex flex-col bg-gray-950 text-white rounded-xl overflow-hidden">

{/* HEADER */}

<div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">

<div>
<Text fw={700} size="lg">Live Class</Text>
<Text size="xs" c="dimmed">{channelName}</Text>
</div>

<Badge color="red">
LIVE
</Badge>

</div>

{/* VIDEO AREA */}

<div className="flex-1 flex items-center justify-center p-6">

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">

{/* LOCAL VIDEO */}

<Paper className="bg-black overflow-hidden aspect-video relative">

<div ref={localRef} className="w-full h-full"/>

<Text
size="xs"
className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded"
>
You
</Text>

</Paper>


{/* REMOTE VIDEO */}

<Paper className="bg-black overflow-hidden aspect-video flex items-center justify-center relative">

<div ref={remoteRef} className="w-full h-full"/>

{!remoteJoined && (

<Text c="dimmed" size="sm">

Waiting for student to join...

</Text>

)}

<Text
size="xs"
className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded"
>
Student
</Text>

</Paper>

</div>

</div>


{/* CONTROLS */}

<div className="flex justify-center pb-6 mb-6">

<Group className="bg-gray-900 px-6 py-3 rounded-full shadow-xl">

<ActionIcon
size="xl"
radius="xl"
variant="filled"
color={mic ? "blue":"red"}
onClick={toggleMic}
>
{mic ? <IconMicrophone/> : <IconMicrophoneOff/>}
</ActionIcon>

<ActionIcon
size="xl"
radius="xl"
variant="filled"
color={camera ? "blue":"red"}
onClick={toggleCamera}
>
{camera ? <IconVideo/> : <IconVideoOff/>}
</ActionIcon>

<ActionIcon
size="xl"
radius="xl"
variant="filled"
color={sharing ? "orange":"blue"}
onClick={toggleScreen}
>
<IconScreenShare/>
</ActionIcon>

<ActionIcon
size="xl"
radius="xl"
variant="filled"
color="red"
onClick={endSession}
>
<IconPhoneOff/>
</ActionIcon>

</Group>

</div>

</div>

);

}