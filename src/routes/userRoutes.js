const express = require("express");
const userRouter = express.Router();
const { isAuthenticated } = require("../middleware/authMIddleware");
const user = require("../controller/userController");
const validation = require("../middleware/validation");

// Registration and login views
userRouter.get("/signup", user.renderRegistrationView);
userRouter.get("/signin", user.renderLoginView);

// Registration and login actions
userRouter.post("/signup", validation.signup, user.handleRegistration);
userRouter.post("/signin", validation.signin, user.handleLogin);

// Logout and delete user
userRouter.use(isAuthenticated);
userRouter.get("/signout", user.handleLogOut);
userRouter.delete("/", user.handleUserDeletion);

module.exports = userRouter;
