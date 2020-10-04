const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const clinicRoutes = require("./routes/clinic");
const authRoutes = require("./routes/auth");
const medicalCaseRoutes = require("./routes/medicalCase");
const chatGroupRoutes = require("./routes/chatGroup");

const ENV = require("./env.js");
const PORT = 8080;
const app = express();
const socket = require("socket.io");

app.use(bodyParser.json());

// @ts-ignore
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, ");
  next();
});

app.use("/clinicImages", express.static(path.join(__dirname, "clinicImages")));

app.use("/clinicFeed", clinicRoutes);

app.use("/auth", authRoutes);

app.use("/medicalCase", medicalCaseRoutes);

app.use("/chatGroup", chatGroupRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const server = app.listen(PORT);
const io = socket(server);

const users = {};

function createUsersOnline() {
  const values = Object.values(users);
  const onlyWithUsernames = values.filter((u) => u.userName !== undefined);
  return onlyWithUsernames;
}

function createUserAvatarUrl() {
  const rand1 = Math.round(Math.random() * 200 + 100);
  const rand2 = Math.round(Math.random() * 200 + 100);
  return `https://placeimg.com/${rand1}/${rand2}/any`;
}

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("action", { type: "users_online", data: createUsersOnline() });
  });
  socket.on("action", (action) => {
    switch (action.type) {
      case "server/join":
        users[socket.id] = { userId: action.data.userId };
        users[socket.id].userName = action.data.userName;
        users[socket.id].groupId = action.data.groupId;
        users[socket.id].avatar = createUserAvatarUrl();

        io.emit("action", {
          type: "users_online",
          data: createUsersOnline(),
        });
        break;
      case "server/private_message":
        const conversationId = action.data.conversationId;
        if (users[socket.id].groupId === conversationId) {
          io.emit("action", {
            type: "private_message",
            data: {
              conversationId: conversationId,
            },
          });
          break;
        }
    }
  });
});

mongoose
  .connect(ENV.mongoKey, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .catch((err) => console.log(err));
