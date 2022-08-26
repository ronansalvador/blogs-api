const { User } = require('../database/models');
const tokenGenerator = require('../token/tokengenerator');

const userService = {
  create: async ({ displayName, email, password, image }) => {
    const validateEmail = await User.findOne({
      where: { 
        email,
      },
      raw: true,
    });

    if (validateEmail) return null;

    const newUser = await User.create({
      displayName,
      email,
      password,
      image,
    });

    const token = tokenGenerator.createToken({
      email: newUser.email,
    });

    return token;
  },
};

module.exports = userService;