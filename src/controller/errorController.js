const CustomError = require("../../utils/CustomError");
const logger = require("../../utils/logger");
const path = require("path");

// Development error response
const devErrors = (res, error) => {
  res.status(error.statusCode).json({
    status: error.status,
    statusCode: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error: error,
    timestamp: new Date().toISOString(),
    path: error.path,
  });
};

// Production error response
const prodError = (res, error) => {
  if (error.isOperational) {
    // Operational, trusted errors
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    // Programming or unknown errors
    logger.error("ERROR 💥", error);
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

// Specific error handlers
const errorHandlers = {
  CastError: (err) => {
    const msg = `Invalid ${err.path}: ${err.value}`;
    return new CustomError(msg, 400);
  },
  ValidationError: (err) => {
    const errors = Object.values(err.errors).map((val) => val.message);
    const msg = `Invalid input data. ${errors.join(". ")}`;
    return new CustomError(msg, 400);
  },
  MongoServerError: (err) => {
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      const value = err.keyValue[field];
      const msg = `Duplicate ${field}: ${value}. Please use another value.`;
      return new CustomError(msg, 400);
    }
    return err;
  },
  InvalidRouteError: (err) => {
    if (err.statusCode === 404) {
      const msg = `${err.path} is not available on this server, Verify the request.`;
      return new CustomError(msg, 404);
    }
  },
  TokenExpiredError: () =>
    new CustomError("Your token has expired! Please log in again.", 401),
  JsonWebTokenError: () =>
    new CustomError("Invalid token! Please log in again.", 401),
};

// Error classifier
const classifyError = (error) => {
  if (errorHandlers[error.name]) {
    return errorHandlers[error.name](error);
  }
  return error;
};

// Global error handler
const globalErrorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  error.message = error.message || "Something went wrong";
  error.path = req.originalUrl || req.url;

  // Log errors with status 500
  if (error.statusCode === 500) {
    logger.error(
      `Error: ${error.message}, StatusCode: ${error.statusCode}, Path: ${
        error.path
      }, Time: ${new Date().toISOString()}, Stack: ${error.stack}`
    );
  }

  const environment = process.env.NODE_ENV?.trim() || "development";
  const handledError =
    environment === "production" ? classifyError(error) : error;

  // Respond differently for API and web requests
  res.format({
    // For HTML requests, render the error view (MVC)
    html: () => {
      res.status(handledError.statusCode).render("error", {
        title: "Error",
        error: handledError.message,
        status: handledError.status,
        statusCode: handledError.statusCode,
        layout: path.join("layouts", "errorLayout"),
      });
    },
    // For JSON (API/AJAX), send JSON error
    json: () => {
      if (environment === "production") {
        prodError(res, handledError);
      } else {
        devErrors(res, handledError);
      }
    },
    // Default to HTML
    default: () => {
      res.status(handledError.statusCode).render("error", {
        error: handledError.message,
        status: handledError.status,
        statusCode: handledError.statusCode,
      });
    },
  });
};

module.exports = globalErrorHandler;
