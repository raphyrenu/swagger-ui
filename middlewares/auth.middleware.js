const jwt = require('jsonwebtoken');
const config = require('config');
const debug = require('../utils/logger')('app:auth');

exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, config.get('jwt.secret'));
    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    debug('Error verifying token:', err);
    res.status(400).send('Invalid token.');
  }
};

exports.authorizeAdmin = (req, res, next) => {
  // Check if the user is an admin
  if (req.user.role !== 'admin') {
    return res.status(403).send('Forbidden. Insufficient permissions.');
  }
  next();
};
