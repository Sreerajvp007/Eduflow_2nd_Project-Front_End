

import { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useParams, useNavigate } from "react-router-dom";

import {
  ActionIcon,
  Group,
  Paper,
  Text,
  Badge
} from "@mantine/core";

import {
  IconMicrophone,
  IconMicrophoneOff,
  IconVideo,
  IconVideoOff,
  IconPhoneOff
} from "@tabler/icons-react";

const APP_ID = "dee73252120d4c58be3003dbb531aa51";

export default function ParentLiveSessionPage() {

  const { channelName } = useParams();
  const navigate = useNavigate();

  const clientRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const audioTrackRef = useRef(null);
  const videoTrackRef = useRef(null);

  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);
  const [remoteJoined, setRemoteJoined] = useState(false);

  /* =========================
     START CALL
  ========================= */

  useEffect(() => {

    const client = AgoraRTC.createClient({
      mode: "rtc",
      codec: "vp8"
    });

    clientRef.current = client;

    let mounted = true;

    const start = async () => {

      try {

        /* JOIN CHANNEL */

        await client.join(APP_ID, channelName, null, null);

        if (!mounted) return;

        /* CREATE TRACKS */

        const [micTrack, camTrack] =
          await AgoraRTC.createMicrophoneAndCameraTracks();

        audioTrackRef.current = micTrack;
        videoTrackRef.current = camTrack;

        /* PLAY LOCAL VIDEO */

        camTrack.play(localVideoRef.current);

        /* PUBLISH */

        await client.publish([micTrack, camTrack]);

        /* =====================
           LISTEN FOR TUTOR
        ===================== */

        client.on("user-published", async (user, mediaType) => {

          await client.subscribe(user, mediaType);

          if (mediaType === "video") {

            remoteVideoRef.current.innerHTML = "";

            user.videoTrack.play(remoteVideoRef.current);

            setRemoteJoined(true);

          }

          if (mediaType === "audio") {
            user.audioTrack.play();
          }

        });

        /* =====================
           EXISTING USERS
        ===================== */

        client.remoteUsers.forEach(async (user) => {

          await client.subscribe(user, "video");

          if (user.videoTrack) {

            remoteVideoRef.current.innerHTML = "";

            user.videoTrack.play(remoteVideoRef.current);

            setRemoteJoined(true);

          }

          if (user.audioTrack) {
            user.audioTrack.play();
          }

        });

      } catch (err) {

        console.error("Join error:", err);

      }

    };

    start();

    /* =====================
       CLEANUP
    ===================== */

    return async () => {

      mounted = false;

      try {

        if (audioTrackRef.current) {
          audioTrackRef.current.stop();
          audioTrackRef.current.close();
        }

        if (videoTrackRef.current) {
          videoTrackRef.current.stop();
          videoTrackRef.current.close();
        }

        await client.leave();

      } catch (err) {
        console.log("cleanup error", err);
      }

    };

  }, [channelName]);


  /* =========================
     MIC
  ========================= */

  const toggleMic = async () => {

    if (!audioTrackRef.current) return;

    await audioTrackRef.current.setEnabled(!mic);

    setMic(!mic);

  };


  /* =========================
     CAMERA
  ========================= */

  const toggleCamera = async () => {

    if (!videoTrackRef.current) return;

    await videoTrackRef.current.setEnabled(!camera);

    setCamera(!camera);

  };


  /* =========================
     LEAVE
  ========================= */

  const leaveClass = async () => {

    navigate("/parent/sessions");

  };


  /* =========================
     UI
  ========================= */

  return (

    <div className="h-[calc(100vh-80px)] flex flex-col bg-gray-950 text-white">

      {/* HEADER */}

      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">

        <div>
          <Text fw={700} size="lg">Live Class</Text>
          <Text size="xs" c="dimmed">{channelName}</Text>
        </div>

        <Badge color="red">LIVE</Badge>

      </div>


      {/* VIDEO AREA */}

      <div className="flex-1 flex items-center justify-center p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">

          {/* STUDENT VIDEO */}

          <Paper className="bg-black overflow-hidden aspect-video relative">

            <div ref={localVideoRef} className="w-full h-full" />

            <Text
              size="xs"
              className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded"
            >
              You
            </Text>

          </Paper>


          {/* TUTOR VIDEO */}

          <Paper className="bg-black overflow-hidden aspect-video flex items-center justify-center relative">

            <div ref={remoteVideoRef} className="w-full h-full" />

            {!remoteJoined && (
              <Text c="dimmed" size="sm">
                Waiting for tutor...
              </Text>
            )}

            <Text
              size="xs"
              className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded"
            >
              Tutor
            </Text>

          </Paper>

        </div>

      </div>


      {/* CONTROLS */}

      <div className="flex justify-center pb-6">

        <Group className="bg-gray-900 px-6 py-3 rounded-full shadow-xl">

          <ActionIcon
            size="xl"
            radius="xl"
            variant="filled"
            color={mic ? "blue" : "red"}
            onClick={toggleMic}
          >
            {mic ? <IconMicrophone /> : <IconMicrophoneOff />}
          </ActionIcon>

          <ActionIcon
            size="xl"
            radius="xl"
            variant="filled"
            color={camera ? "blue" : "red"}
            onClick={toggleCamera}
          >
            {camera ? <IconVideo /> : <IconVideoOff />}
          </ActionIcon>

          <ActionIcon
            size="xl"
            radius="xl"
            variant="filled"
            color="red"
            onClick={leaveClass}
          >
            <IconPhoneOff />
          </ActionIcon>

        </Group>

      </div>

    </div>

  );

}