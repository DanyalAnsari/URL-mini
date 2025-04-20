const createField = (type, options = {}) => ({
  type,
  required: options.required !== false, // default true
  ...options
});

const createValidatedField = (type, validatorObj, options = {}) => ({
  ...createField(type, options),
  validate: {
    validator: validatorObj.isValid,
    message: validatorObj.message
  }
});

module.exports = { createField, createValidatedField };