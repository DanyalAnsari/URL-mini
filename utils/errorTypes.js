/**
 * Standard error types for the application
 * This file centralizes error types and helps maintain consistent error handling across the app
 */

// Import the custom error class
const CustomError = require('./CustomError');

/**
 * Error Types Enum
 * Standardized error codes and messages for the application
 */
const ErrorTypes = {
  // Authentication Errors (401)
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    message: 'Authentication required',
    statusCode: 401
  },
  INVALID_CREDENTIALS: {
    code: 'INVALID_CREDENTIALS',
    message: 'Invalid credentials provided',
    statusCode: 401
  },
  TOKEN_EXPIRED: {
    code: 'TOKEN_EXPIRED',
    message: 'Authentication token has expired',
    statusCode: 401
  },
  
  // Authorization Errors (403)
  FORBIDDEN: {
    code: 'FORBIDDEN',
    message: 'You do not have permission to access this resource',
    statusCode: 403
  },
  
  // Resource Errors (404)
  NOT_FOUND: {
    code: 'NOT_FOUND',
    message: 'The requested resource was not found',
    statusCode: 404
  },
  USER_NOT_FOUND: {
    code: 'USER_NOT_FOUND',
    message: 'User not found',
    statusCode: 404
  },
  URL_NOT_FOUND: {
    code: 'URL_NOT_FOUND',
    message: 'URL not found',
    statusCode: 404
  },
  
  // Validation Errors (400)
  VALIDATION_ERROR: {
    code: 'VALIDATION_ERROR',
    message: 'The request contains invalid data',
    statusCode: 400
  },
  MISSING_REQUIRED_FIELD: {
    code: 'MISSING_REQUIRED_FIELD',
    message: 'Required field is missing',
    statusCode: 400
  },
  INVALID_INPUT: {
    code: 'INVALID_INPUT',
    message: 'Invalid input provided',
    statusCode: 400
  },
  DUPLICATE_ENTRY: {
    code: 'DUPLICATE_ENTRY',
    message: 'A resource with this identifier already exists',
    statusCode: 400
  },
  
  // Server Errors (500)
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred',
    statusCode: 500
  },
  DATABASE_ERROR: {
    code: 'DATABASE_ERROR',
    message: 'Database operation failed',
    statusCode: 500
  },
  SERVICE_UNAVAILABLE: {
    code: 'SERVICE_UNAVAILABLE',
    message: 'Service is temporarily unavailable',
    statusCode: 503
  },
  
  // Rate Limiting (429)
  RATE_LIMIT_EXCEEDED: {
    code: 'RATE_LIMIT_EXCEEDED',
    message: 'Rate limit exceeded, please try again later',
    statusCode: 429
  }
};

/**
 * Creates a CustomError instance with standardized properties from ErrorTypes
 * 
 * @param {string} errorType - Error type from ErrorTypes enum
 * @param {string} details - Additional error details (optional)
 * @param {Object} metadata - Additional metadata about the error (optional)
 * @returns {CustomError} A properly formatted error object
 */
function createError(errorType, details = '', metadata = {}) {
  if (!ErrorTypes[errorType]) {
    // Default to internal server error if type not found
    errorType = 'INTERNAL_SERVER_ERROR';
  }
  
  const error = ErrorTypes[errorType];
  let message = error.message;
  
  if (details) {
    message = `${message}: ${details}`;
  }
  
  const customError = new CustomError(message, error.statusCode);
  customError.code = error.code;
  customError.metadata = metadata;
  
  return customError;
}

module.exports = {
  ErrorTypes,
  createError
}; 