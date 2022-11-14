const express = require("express");

const {
  medicalResponseRouter,
  redEvatRouter,
  registerComponentsEvatRouter,
  trackingRouter,
  recordRouter,
  doctorRouter,
  nurseRouter,
  patientRouter,
  qaRouter,
  residentRouter,
} = require("./routes");

const app = express();

app.use(express.json());

app.use("/api/v1/medical-response", medicalResponseRouter);
app.use("/api/v1/red-evat", redEvatRouter);
app.use("/api/v1/register-components-evat", registerComponentsEvatRouter);
app.use("/api/v1/tracking", trackingRouter);

app.use("/api/v1/patient", patientRouter);

app.use("/api/v1/record", recordRouter);

app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/nurse", nurseRouter);
app.use("/api/v1/qa", qaRouter);
app.use("/api/v1/resident", residentRouter);

module.exports = app;
