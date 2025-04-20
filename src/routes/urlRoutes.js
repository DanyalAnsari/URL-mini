const express = require("express");
const urlRouter = express.Router();
const url = require("../controller/urlController");
const { isAuthenticated } = require("../middleware/authMIddleware");

// Redirect to full URL (public)
urlRouter.get("/:shortId", url.redirectURL);

urlRouter.use(isAuthenticated);
// Create a new short URL (authenticated)
urlRouter.post("/", url.generateShortId);

// Delete a URL record (authenticated)
urlRouter.delete("/:id", url.removeUrlRecord);

module.exports = urlRouter;
