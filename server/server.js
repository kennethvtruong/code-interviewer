require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

// use the Express JSON middleware
app.use(cors());
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("text-update", (data) => {
    socket.broadcast.emit("text-update", data);
  });
});

// create the twilioClient
const twilioClient = require("twilio")(
  process.env.TWILIO_API_KEY_SID,
  process.env.TWILIO_API_KEY_SECRET,
  { accountSid: process.env.TWILIO_ACCOUNT_SID }
);

const findOrCreateRoom = async (roomName) => {
  try {
    // see if the room exists already. If it doesn't, this will throw
    // error 20404.
    const checkRooms = new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(twilioClient.video.v1.rooms(roomName).fetch());
      }, 2000);
    });
    await checkRooms;
  } catch (error) {
    // the room was not found, so create it
    if (error.code == 20404) {
      await twilioClient.video.v1.rooms.create({
        uniqueName: roomName,
        type: "go",
      });
    } else {
      // let other errors bubble up
      throw error;
    }
  }
};

const getAccessToken = (roomName) => {
  // create an access token
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY_SID,
    process.env.TWILIO_API_KEY_SECRET,

    // generate a random unique identity for this participant
    { identity: uuidv4() }
  );
  // create a video grant for this specific room
  const videoGrant = new VideoGrant({
    room: roomName,
  });

  // add the video grant
  token.addGrant(videoGrant);
  // serialize the token and return it
  return token.toJwt();
};

app.post("/join-room", async (req, res) => {
  // return 400 if the request has an empty body or no roomName
  if (!req.body || !req.body.roomName) {
    return res.status(400).send("Must include roomName argument.");
  }
  const roomName = req.body.roomName;
  const roomsList = await twilioClient.video.v1.rooms
    .list({
      status: "in-progress",
    })
    .then((room) => room);

  console.log(roomsList);
  // find or create a room with the given roomName
  findOrCreateRoom(roomName);
  // generate an Access Token for a participant in this room
  const token = getAccessToken(roomName);
  res.send({
    token: token,
  });
});

app.get("/getRooms", async (req, res) => {
  const roomsList = await twilioClient.video.v1.rooms
    .list({
      status: "in-progress",
    })
    .then((room) => room);

  console.log(roomsList);
  res.send({
    roomsList: roomsList,
  });
});

// Start the Express server
server.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});

// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
