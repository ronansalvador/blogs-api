const { User } = require('../database/models');
const tokenGenerator = require('../token/tokengenerator');

const loginService = {
  login: async ({ email, password }) => {
    const result = await User.findOne({
      where: {
        email,
        password,
      },
      raw: true,
    });

    if (!result) return null;

    const token = tokenGenerator.createToken({
      email: result.email,
    });

    return token;
  },
};

module.exports = loginService; 