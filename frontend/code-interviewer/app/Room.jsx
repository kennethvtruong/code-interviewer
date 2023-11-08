import { useState, useEffect } from "react";
import Video from "twilio-video";
import Participant from "./Participant";
import { Button } from "@mui/material";
import AceEditor from "react-ace";
import {
  Videocam,
  VideocamOff,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";

const Room = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [camera, setCamera] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const remoteParticipants = room
    ? [...room?.participants?.values()]
        // .filter((value, index, self) => {
        //   return self.findIndex((p) => p.identity === value.identity) === index;
        // })
        .map((participant) => {
          if (participant.state === "connected") {
            return (
              <Participant key={participant.sid} participant={participant} />
            );
          }
        })
    : [];

  // const remoteParticipants = participants.map((participant) => (
  //   <Participant key={participant.sid} participant={participant} />
  // ));

  useEffect(() => {
    const participantConnected = (participant) => {
      console.log(participant);
      setParticipants((prevParticipants) => {
        if (
          prevParticipants.findIndex(
            (p) => p.identity === participant.identity
          ) === -1
        ) {
          return [...prevParticipants, participant];
        } else return prevParticipants;
      });
      // setParticipants(...participants, participant);
    };
    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter(
          (p) => JSON.stringify(p) !== JSON.stringify(participant)
        )
      );
    };

    Video.connect(token, {
      name: roomName,
      // video: true,
      // audio: true,
    }).then((room) => {
      setRoom(room);
      room.on("participantConnected", participantConnected);
      room.on("participantDisconnected", participantDisconnected);
      room.participants.forEach(participantConnected);
      console.log("room", [...room?.participants?.values()]);
    });
    return () => {
      setRoom((currentRoom) => {
        if (currentRoom && currentRoom.localParticipant.state === "connected") {
          currentRoom.localParticipant.tracks.forEach(function (
            trackPublication
          ) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  console.log("participants", participants);
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 items-center text-gray-250">
      <h2>Room: {roomName}</h2>
      <Button
        className="Button"
        // type="submit"
        onClick={handleLogout}
        variant="contained"
        // startIcon={isMuted ? <VolumeUp /> : <VolumeOff />}
      >
        Logout
      </Button>
      <div className="flex flex-col">
        {room ? (
          <>
            <Participant
              key={room.localParticipant.sid}
              participant={room.localParticipant}
              isMuted={isMuted}
            />
            <div className="flex flex-row items-left">
              <Button
                className="Button"
                // type="submit"
                onClick={() => {
                  room.localParticipant.videoTracks.forEach((publication) => {
                    camera
                      ? publication.track.disable()
                      : publication.track.enable();
                  });
                  setCamera(!camera);
                }}
                variant="contained"
                startIcon={camera ? <Videocam /> : <VideocamOff />}
              ></Button>
              <Button
                className="Button"
                // type="submit"
                onClick={() => {
                  setIsMuted(!isMuted);
                }}
                variant="contained"
                startIcon={isMuted ? <VolumeUp /> : <VolumeOff />}
              ></Button>
            </div>
          </>
        ) : (
          ""
        )}
        {room ? remoteParticipants : ""}
      </div>
    </div>
  );
};

export default Room;
