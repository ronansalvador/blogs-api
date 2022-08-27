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

  allUsers: async () => {
    const result = await User.findAll(
      { attributes: { exclude: ['password'] } },
    );
    return result;
  },

  getUser: async (id) => {
    const result = await User.findOne(
      {
        where: { id },
        attributes: { exclude: ['password'] },
      },
    );
    return result;
  },
};

module.exports = userService;