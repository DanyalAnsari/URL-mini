const express = require("express");
const homeRouter = express.Router();
const { isAuthenticated } = require("../middleware/authMIddleware");
const urlController = require("../controller/urlController");
const validation = require("../middleware/validation");

homeRouter.use(isAuthenticated);
// Analytics (admin)
homeRouter.get("/check", urlController.Analytics);

// User dashboard
homeRouter.get("/dashboard", urlController.viewURL);

// Create short URL
homeRouter.post(
  "/dashboard",
  validation.url,
  urlController.generateShortId
);

module.exports = homeRouter;
