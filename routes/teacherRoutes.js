const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.post('/', teacherController.createTeacherDailyRecord);
router.get('/:teacherId/records', teacherController.getTeacherDailyRecords);
