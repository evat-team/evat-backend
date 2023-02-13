require("express-async-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./routes");
const middlewares = require("./middlewares");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitizate = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests",
});

app.use(cors());
app.use(helmet());
app.use(mongoSanitizate());
app.use(xss());
app.use(hpp());
app.use("/api/", limiter);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/medical-daily-form", router.dailyFormRouter);
app.use("/api/v1/red-evat", router.redEvatRouter);

app.use("/api/v1/patient", router.patientRouter);

app.use("/api/v1/record", router.recordRouter);
app.use("/api/v1/notification", router.notificationsRouter);

app.use("/api/v1/employee", router.employeeRouter);

app.use("/api/v1/auth", router.authRouter);

app.use(middlewares.notFoundMiddleware);
app.use(middlewares.errorHandlerMiddleware);

module.exports = app;
