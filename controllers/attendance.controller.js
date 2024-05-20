const Joi = require('joi');
const _ = require('lodash');
const Attendance = require('../models/Attendance.model');
const debug = require('../utils/logger')('app:attendance');

exports.markAttendance = async (req, res) => {
  // Validate input using Joi
  const schema = Joi.object({
    date: Joi.date().required(),
    present: Joi.boolean().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if attendance record already exists for the user and date
  let attendance = await Attendance.findOne({
    userId: req.user.id,
    date: req.body.date,
  });

  if (!attendance) {
    // Create a new attendance record
    attendance = new Attendance({
      userId: req.user.id,
      ...req.body,
    });
  } else {
    // Update the existing attendance record
    attendance.present = req.body.present;
  }

  await attendance.save();
  res.status(200).json(attendance);
};

exports.getAttendanceReport = async (req, res) => {
  // Fetch attendance records for the authenticated user
  const attendanceRecords = await Attendance.find({ userId: req.user.id });

  // Use Lodash to calculate attendance percentage
  const attendancePercentage = _.chain(attendanceRecords)
    .filter((record) => record.present)
    .size()
    .divide(attendanceRecords.length)
    .multiply(100)
    .value();

  res.status(200).json({ attendancePercentage });
};
