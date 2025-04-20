const express = require("express");

// Import routers
const rootRouter = require("./rootRoutes");
const homeRouter = require("./homeRoutes");
const userRouter = require("./userRoutes");
const urlRouter = require("./urlRoutes");

const router = express.Router();

// Landing and home
router.use("/", rootRouter);

// Home/dashboard
router.use("/home", homeRouter);

// User authentication and profile
router.use("/user", userRouter);

// URL shortener and redirect
router.use("/url", urlRouter);

module.exports = router;
