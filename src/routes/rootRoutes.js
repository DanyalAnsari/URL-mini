const express = require("express");
const { isAuthenticated, optionalAuth } = require("../middleware/authMIddleware");
const { renderHome } = require("../controller/urlController");

const rootRouter = express.Router();

// Apply optional authentication to root route
rootRouter.get("/", optionalAuth, renderHome);

module.exports = rootRouter;
