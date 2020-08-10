const ENV = require("./env.js");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const clinicRoutes = require("./routes/clinic");
const authRoutes = require("./routes/auth");
const medicalCaseRoutes = require("./routes/medicalCase");

const app = express();

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
    app.listen(8080);
  })
  .catch((err) => console.log(err));
