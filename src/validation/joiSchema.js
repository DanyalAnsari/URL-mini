const Joi = require("joi");

const joiSchema = {
  url: Joi.object({
    URL: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .required(),
  }),

  signup: Joi.object({
    Username: Joi.string().alphanum().min(3).max(16).required(),
    Email: Joi.string().email().required(),
    Password: Joi.string().min(8).required(),
  }),

  signin: Joi.object({
    Email: Joi.string().email().required(),
    Password: Joi.string().min(8).required(),
  }),
};

module.exports = joiSchema;
