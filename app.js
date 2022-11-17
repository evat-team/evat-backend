require("express-async-errors");

const express = require("express");
const router = require("./routes");

const app = express();

const cookieParser = require("cookie-parser");
const errorHandlerMiddleware = require("./middlewares/error-handler");

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/medical-response", router.medicalResponseRouter);
app.use("/api/v1/red-evat", router.redEvatRouter);
app.use(
  "/api/v1/register-components-evat",
  router.registerComponentsEvatRouter
);
app.use("/api/v1/tracking", router.trackingRouter);

app.use("/api/v1/patient", router.patientRouter);

app.use("/api/v1/record", router.recordRouter);

app.use("/api/v1/doctor", router.doctorRouter);
app.use("/api/v1/nurse", router.nurseRouter);
app.use("/api/v1/qa", router.qaRouter);
app.use("/api/v1/resident", router.residentRouter);

app.use("/api/v1/login", router.authRouter);

app.use(errorHandlerMiddleware);

module.exports = app;
