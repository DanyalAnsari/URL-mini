const appConfig = require("./config/appConfig");
const appSecurity = require("./config/appSecurity");
const router = require("./src/routes/routes");
const globalErrorHandler = require("./src/controller/errorController");
const CustomError = require("./utils/CustomError");
const express = require('express');
const path = require('path');
const errorHandler = require('./utils/errorHandler');

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// App configuration and security middleware
appConfig(app);
appSecurity(app);

// Health check endpoints
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })});

// Mount all routes
app.use("/", router);

app.use((req, res, next) => {
  return next(new CustomError("", 404));
});

// Global error handler middleware
app.use(globalErrorHandler);

// Error handling middleware (should be after all routes)
app.use(errorHandler);

module.exports = app;
