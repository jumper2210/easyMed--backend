const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const clinicRoutes = require("./routes/clinic");
const authRoutes = require("./routes/auth");
const medicalCaseRoutes = require("./routes/medicalCase");
const conversationRoutes = require("./routes/conversation");
const doctorsRoutes = require("./routes/doctors");
const messageRoutes = require("./routes/message");
const handlers = require("./messagesHandlers/createMessage");
const userRoutes = require("./routes/user");
const ENV = require("./env.js");
const PORT = 8080;
const app = express();
const socket = require("socket.io");
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/clinicImages", express.static(path.join(__dirname, "clinicImages")));

app.use("/clinicFeed", clinicRoutes);

app.use("/auth", authRoutes);

app.use("/medicalCase", medicalCaseRoutes);

app.use("/conversation", conversationRoutes);

app.use("/message", messageRoutes);

app.use("/doctors", doctorsRoutes);

app.use("/user", userRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const server = app.listen(PORT);
const io = socket(server);
const sockets = {};

io.on("connection", (socket) => {
  socket.on("init", (userId) => {
    sockets[userId.senderId] = socket;
  });
  socket.on("message", (message) => {
    if (sockets[message.receiverId]) {
      sockets[message.receiverId].emit("message", message);
    }
    handlers.createMessage(message);
  });
  socket.on("disconnect", (userId) => {
    delete sockets[userId.senderId];
  });
});

mongoose
  .connect(ENV.keys.mongoKey, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .catch((err) => console.log(err));
