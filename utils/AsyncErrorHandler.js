/**
 * Higher-order function to handle asynchronous errors in Express route handlers
 * Eliminates the need for try/catch blocks in each controller function
 * 
 * @param {Function} fn - The async controller function to wrap
 * @returns {Function} Express middleware function that catches any errors and passes them to next()
 */
const AsyncErrorHandler = (fn) => {
  return (req, res, next) => {
    // Execute the passed function and catch any errors that occur
    Promise.resolve(fn(req, res, next)).catch((error) => {
      // Pass the error to Express error handling middleware
      next(error);
    });
  };
};

module.exports = AsyncErrorHandler;