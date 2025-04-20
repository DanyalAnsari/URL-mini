const User = require("../model/userModel");
const urlModel = require("../model/urlModel");
const AsyncErrorHandler = require("../../utils/AsyncErrorHandler");
const CustomError = require("../../utils/CustomError");
const handleTokenGeneration = require("../../utils/authentication");

const userController = {
  // Render Signup (Registration) Page
  renderRegistrationView: (req, res) => {
    return res.status(200).render("auth", {
      title: "URL-mini | Register",
      activeTab: "signup",
    });
  },

  // Render Login Page
  renderLoginView: (req, res) => {
    res.status(200).render("auth", {
      title: "URL-mini | Login",
      activeTab: "signin",
    });
  },

  // Handle User Registration
  handleRegistration: AsyncErrorHandler(async (req, res, next) => {
    const { Username, Email, Password } = req.body;
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return next(new CustomError("User already exists", 400));
    }
    const newUser = await User.create({ Username, Email, Password });
    const token = handleTokenGeneration(newUser);
    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .redirect("../home/dashboard");
  }),

  // Handle User Login
  handleLogin: AsyncErrorHandler(async (req, res, next) => {
    const { Email, Password } = req.body;

    const user = await User.findOne({ Email });
    if (!user) {
      return next(new CustomError("User not found", 404));
    }

    const isValid = await user.handlePasswordVerification(Password);
    if (!isValid) {
      return next(new CustomError("Email or Password not valid", 401));
    }

    const token = handleTokenGeneration(user);
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .redirect("../home/dashboard");
  }),

  // Handle Logout
  handleLogOut(req, res) {
    try {
      return res.clearCookie("token").redirect("../");
    } catch (error) {
      return next(error);
    }
  },

  // Handle User Deletion
  handleUserDeletion: AsyncErrorHandler(async (req, res, next) => {
    const user = res.locals.User;
    if (!user) {
      return next(new CustomError("Please login to continue", 400));
    }

    const DeleteUser = await User.findOne({ _id: user.id });
    if (!DeleteUser) {
      return next(new CustomError("User not found", 404));
    }

    const isDeleted = await User.deleteOne({ _id: DeleteUser._id });
    if (isDeleted) {
      await urlModel.deleteMany({ UserID: DeleteUser._id });
      return res.redirect("/home");
    }
    return res.redirect("../");
  }),
};

module.exports = userController;
