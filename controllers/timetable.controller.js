const Joi = require('joi');
const _ = require('lodash');
const Timetable = require('../models/Timetable.model');
const debug = require('../utils/logger')('app:timetable');

exports.createTimetableEntry = async (req, res) => {
  // Validate input using Joi
  const schema = Joi.object({
    date: Joi.date().required(),
    subject: Joi.string().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Create a new timetable entry
  const timetableEntry = new Timetable({
    userId: req.user.id,
    ...req.body,
  });
  await timetableEntry.save();

  res.status(201).json(timetableEntry);
};

exports.getTimetable = async (req, res) => {
  // Fetch timetable entries for the authenticated user
  const timetableEntries = await Timetable.find({ userId: req.user.id });

  // Use Lodash to transform the response
  const transformedEntries = _.map(timetableEntries, (entry) => ({
    id: entry._id,
    date: entry.date,
    subject: entry.subject,
    startTime: entry.startTime,
    endTime: entry.endTime,
  }));

  res.status(200).json(transformedEntries);
};
