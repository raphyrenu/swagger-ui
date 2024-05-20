const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/User.model');
const debug = require('../utils/logger')('app:auth');

exports.register = async (req, res) => {
  // Validate input using Joi
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user already exists
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) return res.status(409).send('Email already registered');

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password, // Hash the password before saving
  });
  await user.save();

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(201).json({ token });
};

exports.login = async (req, res) => {
  // Validate input using Joi
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Find the user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).send('Invalid email or password');

  // Verify the password
  const isPasswordValid = await user.verifyPassword(req.body.password);
  if (!isPasswordValid) return res.status(401).send('Invalid email or password');

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(200).json({ token });
};
