const express = require('express');
const attendanceController = require('../controllers/attendance.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const { expressjwt: expressJwt } = require('express-jwt');

const router = express.Router();

const jwtMiddleware = expressJwt({
    secret: jwtSecret,
    algorithms: ['HS256'],
        
}).unless({
    path: [
    '/login',
     '/register'
    ]
});


// Mark attendance for the authenticated user
router.post('/mark', authMiddleware.verifyToken, validationMiddleware.validateRequest(attendanceController.markAttendance), attendanceController.markAttendance);

// Get attendance report for the authenticated user
router.get('/report', authMiddleware.verifyToken, attendanceController.getAttendanceReport);

module.exports = router;
