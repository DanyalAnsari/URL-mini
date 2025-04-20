const JWT = require("jsonwebtoken");

const handleTokenGeneration = (userInfo) => {
  const payload = {
    id: userInfo._id.toString(),
    Name: userInfo.Username,
  };
  const token = JWT.sign(payload, process.env.SECRET_KEY, { expiresIn: "2h" });
  return token;
};

module.exports = handleTokenGeneration;
