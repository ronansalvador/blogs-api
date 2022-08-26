const jwtToken = require('../token/tokengenerator');

module.exports = (req, _res, next) => {
  const { authorization } = req.headers;
  jwtToken.verifyToken(authorization);
  next();
}; 