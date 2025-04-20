const validator = require("validator");

const Validators = {
  URL: {
    isValid: url => validator.isURL(url, { require_protocol: true }),
    message: "Invalid URL format. Please include the protocol (http/https)."
  },
  Email: {
    isValid: validator.isEmail,
    message: "Invalid email format."
  },
  Username: {
    isValid: username => /^[0-9A-Za-z]{3,16}$/.test(username),
    message: "Username must be alphanumeric and between 3-16 characters."
  },
  IPAddress: {
    isValid: validator.isIP,
    message: "Invalid IP address format."
  },
  UserAgent: {
    isValid: userAgent => typeof userAgent === "string" && userAgent.trim().length > 0,
    message: "Invalid User-Agent format."
  }
};

module.exports = Validators;