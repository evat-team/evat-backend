const express = require("express");

const {
  doctorRouter,
  nurseRouter,
  patientRouter,
  qaRouter,
} = require("./routes");

const app = express();

app.use(express.json());

app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/nurse", nurseRouter);
app.use("/api/v1/patient", patientRouter);
app.use("/api/v1/qa", qaRouter);

module.exports = app;
