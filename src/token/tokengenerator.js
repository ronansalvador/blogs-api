const jwt = require('jsonwebtoken');

require('dotenv').config();

const { JWT_SECRET } = process.env;
const JWT_OPTIONS = { algorithm: 'HS256', expiresIn: '1d' };

const tokenGenerator = {
  createToken: (payload) => {
    const token = jwt.sign(payload, JWT_SECRET, JWT_OPTIONS);

    return token;
  },

  verifyToken: (token) => {
    console.log('token error');
    if (!token) throw new Error('401|Token not found');
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.log(error);
      throw new Error('401|Expired or invalid token');
    }
  },
};

module.exports = tokenGenerator;