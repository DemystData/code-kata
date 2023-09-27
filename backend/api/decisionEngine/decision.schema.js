const Joi = require("joi");

exports.decisionEngine = {
  body: Joi.object({
    name: Joi.string().required(),
    yearEstblished: Joi.string().required(),
    profitorloss: Joi.array().required(),
    preassessmentValue: Joi.string().required(),
  }),
};

