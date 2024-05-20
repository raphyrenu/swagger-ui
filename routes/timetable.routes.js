const express = require('express');
const timetableController = require('../controllers/timetable.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');

const router = express.Router();

// Create a new timetable entry
router.post('/', authMiddleware.verifyToken, validationMiddleware.validateRequest(timetableController.createTimetableEntry), timetableController.createTimetableEntry);

// Fetch the timetable for the authenticated user
router.get('/', authMiddleware.verifyToken, timetableController.getTimetable);

module.exports = router;
