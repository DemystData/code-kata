const Joi = require("joi");

exports.createUser = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
