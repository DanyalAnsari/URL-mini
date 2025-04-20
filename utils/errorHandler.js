const CustomError = require('./CustomError');
const { ErrorTypes } = require('./errorTypes');

/**
 * Global error handler middleware
 * Handles all errors in the application
 */
const errorHandler = (err, req, res, next) => {
  // Already a custom error instance
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json(err.toJSON());
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const customError = new CustomError(
      'Validation failed',
      400
    );
    
    customError.code = ErrorTypes.VALIDATION_ERROR.code;
    customError.metadata = {
      fields: Object.keys(err.errors).reduce((acc, key) => {
        acc[key] = err.errors[key].message;
        return acc;
      }, {})
    };
    
    return res.status(customError.statusCode).json(customError.toJSON());
  }

  // Handle duplicate key error (MongoDB)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const customError = new CustomError(
      `Duplicate value for ${field}. Please use another value.`,
      400
    );
    
    customError.code = ErrorTypes.VALIDATION_ERROR.code;
    
    return res.status(customError.statusCode).json(customError.toJSON());
  }

  // Default error (unhandled)
  const defaultError = new CustomError(
    process.env.NODE_ENV === 'production' 
      ? 'Something went wrong, please try again later.'
      : err.message || 'Something went wrong, please try again later.',
    500
  );
  
  defaultError.code = ErrorTypes.INTERNAL_SERVER_ERROR.code;
  
  // Log the original error in non-production environments
  if (process.env.NODE_ENV !== 'production') {
    console.error('ERROR:', err);
  }
  
  return res.status(defaultError.statusCode).json(defaultError.toJSON());
};

module.exports = errorHandler; 