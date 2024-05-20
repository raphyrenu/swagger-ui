const express = require('express');
const authController = require('../controllers/auth.controller');
const validationMiddleware = require('../middlewares/validation.middleware');

const router = express.Router();

// Register a new user
router.post('/register', validationMiddleware.validateRequest(authController.register), authController.register);

// Login an existing user
router.post('/login', validationMiddleware.validateRequest(authController.login), authController.login);

module.exports = router;
