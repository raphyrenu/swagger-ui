const express = require('express');
const dailyRecordController = require('../controllers/dailyRecord.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');

const router = express.Router();

// Create a new daily record
router.post('/', authMiddleware.verifyToken, validationMiddleware.validateRequest(dailyRecordController.createDailyRecord), dailyRecordController.createDailyRecord);

// Fetch all daily records for the authenticated user
router.get('/', authMiddleware.verifyToken, dailyRecordController.getDailyRecords);

module.exports = router;
