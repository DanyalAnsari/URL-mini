const JWT = require("jsonwebtoken");
const User = require("../model/userModel");
const CustomError = require("../../utils/CustomError");
const AsyncErrorHandler = require("../../utils/AsyncErrorHandler");

const isAuthenticated = AsyncErrorHandler(async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return next(new CustomError("Please sign in to continue.", 401));
  }
  const payload = JWT.verify(token, process.env.SECRET_KEY);
  const user = await User.findById(payload.id).lean();
  
  if (!user) {
    return next(new CustomError("User not found. Please sign in again.", 401));
  }

  res.locals.User = user;
  next();
});

// Optional authentication middleware that doesn't throw errors if no token exists
const optionalAuth = AsyncErrorHandler(async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    res.locals.User = null;
    return next();
  }
  
  try {
    const payload = JWT.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(payload.id).lean();
    
    if (user) {
      res.locals.User = user;
    } else {
      res.locals.User = null;
    }
  } catch (error) {
    res.locals.User = null;
  }
  
  next();
});

module.exports = { isAuthenticated, optionalAuth };
