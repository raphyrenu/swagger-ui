const express = require("express");
// const config = require('config');
const debug = require("debug")("teacher-daily-record");
const teacherRoutes = require("./routes/teacherRoutes");
const timetableRoutes = require("./routes/timetableRoutes");
const attendanceRoutes = require("./routes/n");
const authRoutes = require("./routes/authRoute");
const swaggerConfig = require("./utils/swaggerConfig");

const app = express.Router();

app.use(express.json());

// Routes
app.use("/api/teachers", teacherRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
