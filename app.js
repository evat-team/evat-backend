require("express-async-errors");

const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./routes");
const middlewares = require("./middlewares");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/medical-daily-form", router.dailyFormRouter);
app.use("/api/v1/red-evat", router.redEvatRouter);

app.use("/api/v1/patient", router.patientRouter);

app.use("/api/v1/record", router.recordRouter);

app.use("/api/v1/doctor", router.doctorRouter);
app.use("/api/v1/nurse", router.nurseRouter);
app.use("/api/v1/qa", router.qaRouter);
app.use("/api/v1/resident", router.residentRouter);

app.use("/api/v1/login", router.authRouter);

app.use(middlewares.notFoundMiddleware);
app.use(middlewares.errorHandlerMiddleware);

module.exports = app;
