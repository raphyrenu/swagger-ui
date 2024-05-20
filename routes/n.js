const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.post('/', attendanceController.recordAttendance);
router.get('/:teacherId/:date', attendanceController.getAttendanceReport);
