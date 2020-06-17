const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const clinicRoutes = require("./routes/clinic");

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

app.use("/clinicFeed", clinicRoutes);

mongoose
  .connect(
    `mongodb+srv://jumper1022:vL8d62l9DqL24ae8@cluster0-xkyz5.mongodb.net/easyMed?retryWrites=true&w=majority
`,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
  )
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
