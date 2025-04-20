const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

// Security middleware setup
const appSecurity = (app) => {
  // Set security HTTP headers
  app.use(helmet());

  // Enable CORS (customize origin as needed)
  app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  }));

  // Rate limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      standardHeaders: true,
      legacyHeaders: false,
    })
  );

  // Prevent HTTP Parameter Pollution
  app.use(hpp());

  // Data sanitization against NoSQL injection
  app.use(mongoSanitize());

  // Data sanitization against XSS
  app.use(xss());
};

module.exports=appSecurity;