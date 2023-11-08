import React, { useState, useCallback, useEffect } from "react";
import Form from "./Form";
import Room from "./Room";
import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-javascript";
// import "ace-builds/src-noconflict/mode-java";
// import "ace-builds/src-noconflict/mode-python";
// import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import CodeSettings from "./CodeSettings";
import io from "socket.io-client";

const VideoChat = () => {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [token, setToken] = useState(null);
  const [code, setCode] = useState(null);
  const [socket, setSocket] = useState(null);
  const [settings, setSettings] = useState({
    mode: "javascript",
    themes: "monokai",
    fontSize: 16,
  });

  const handleUsernameChange = useCallback((event) => {
    setUserName(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback((event) => {
    setRoomName(event.target.value);
  }, []);

  const handleLogout = useCallback((e) => {
    setToken(null);
  }, []);

  const handleCodeChange = (event) => {
    setCode(event);

    socket.emit("text-update", { text: event });
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const data = await fetch("http://localhost:5000/join-room", {
        method: "POST",
        body: JSON.stringify({
          identity: userName,
          roomName: roomName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      setToken(data.token);
    },
    [userName, roomName]
  );

  useEffect(() => {
    const socket = io("http://localhost:5000/");

    // socket.on("connect", () => {
    //   console.log("Connected to server");
    // });

    socket.on("text-update", (data) => {
      // Apply the received update to the editor
      console.log("data", data);
      setCode(data.text);
    });

    console.log("code", code);

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, [code]);
  return (
    <div className="flex flex-row w-full h-5/6">
      {token !== null ? (
        <>
          <div className="min-w-8/12 w-4/5">
            <AceEditor
              mode={settings["mode"]}
              theme={settings["themes"]}
              value={code}
              onChange={handleCodeChange}
              fontSize={settings["fontSize"]}
              style={{
                width: "100%",
                height: "100%",
              }}
              name="code-editor"
              editorProps={{ $blockScrolling: true }}
              enableBasicAutocompletion={true}
            />
            <CodeSettings settings={settings} setSettings={setSettings} />
          </div>
          <div className="flex flex-row w-1/5">
            <Room
              roomName={roomName}
              token={token}
              handleLogout={handleLogout}
            />
          </div>
        </>
      ) : (
        <Form
          userName={userName}
          roomName={roomName}
          handleUsernameChange={handleUsernameChange}
          handleRoomNameChange={handleRoomNameChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};
export default VideoChat;
