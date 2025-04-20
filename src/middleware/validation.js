const joiSchema = require("../validation/joiSchema");
const CustomError = require("../../utils/CustomError");

const validation = {
  url(req, res, next) {
    const { error } = joiSchema.url.validate(req.body);
    if (error) {
      return next(new CustomError(error.details[0].message, 400));
    }
    next();
  },

  signup(req, res, next) {
    const { error } = joiSchema.signup.validate(req.body);
    if (error) {
      return next(new CustomError(error.details[0].message, 400));
    }
    next();
  },

  signin(req, res, next) {
    const { error } = joiSchema.signin.validate(req.body);
    if (error) {
      return next(new CustomError(error.details[0].message, 400));
    }
    next();
  },
};

module.exports = validation;
