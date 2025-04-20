/**
 * Custom Error class that extends the native Error
 * Allows for adding HTTP status codes and other properties to error objects
 */
class CustomError extends Error {
  /**
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   */
  constructor(message, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
    
    // Capture stack trace (V8 engines only)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Formats the error to be returned in API responses
   * @returns {Object} Formatted error object
   */
  toJSON() {
    return {
      error: {
        code: this.code || 'UNKNOWN_ERROR',
        message: this.message,
        statusCode: this.statusCode,
        timestamp: this.timestamp
      },
      ...(this.metadata && { metadata: this.metadata })
    };
  }
}

module.exports = CustomError;
