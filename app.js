const express = require("express");

const clinicRoutes = require("./routes/clinic");

const app = express();

app.use("/clinic", clinicRoutes);

app.listen(8080);
