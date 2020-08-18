const ENV = require("./env.js");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

const clinicRoutes = require("./routes/clinic");
const authRoutes = require("./routes/auth");
const medicalCaseRoutes = require("./routes/medicalCase");
const messageRoutes = require("./routes/message");
const chatGroupRoutes = require("./routes/chatGroup");

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

app.use("/chatGroup", chatGroupRoutes);

app.use("/message", messageRoutes);
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(ENV.mongoKey, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then((result) => {
    const server = app.listen(8080);
    const io = require("./socket").init(server);
    io.on("connection", (socket) => {
      console.log("User connected");
    });
  })
  .catch((err) => console.log(err));
