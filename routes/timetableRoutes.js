const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timetableController');

router.post('/', timetableController.createTimetable);
router.get('/:teacherId', timetableController.getTeacherTimetable);
