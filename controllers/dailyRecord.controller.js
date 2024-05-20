const Joi = require('joi');
const _ = require('lodash');
const DailyRecord = require('../models/DailyRecord.model');
const debug = require('../utils/logger')('app:dailyRecord');

exports.createDailyRecord = async (req, res) => {
  // Validate input using Joi
  const schema = Joi.object({
    date: Joi.date().required(),
    lessonTopics: Joi.array().items(Joi.string()).required(),
    notes: Joi.string().allow(''),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Create a new daily record
  const dailyRecord = new DailyRecord({
    userId: req.user.id,
    ...req.body,
  });
  await dailyRecord.save();

  res.status(201).json(dailyRecord);
};

exports.getDailyRecords = async (req, res) => {
  // Fetch daily records for the authenticated user
  const dailyRecords = await DailyRecord.find({ userId: req.user.id });

  // Use Lodash to transform the response
  const transformedRecords = _.map(dailyRecords, (record) => ({
    id: record._id,
    date: record.date,
    lessonTopics: record.lessonTopics,
    notes: record.notes,
  }));

  res.status(200).json(transformedRecords);
};
