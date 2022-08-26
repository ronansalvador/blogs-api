const userService = require('../services/userService');

const userController = {
  create: async (req, res) => {
      const { displayName, email, password, image } = req.body;

      const token = await userService.create(
        { displayName, email, password, image },
      );

      if (!token) return res.status(409).json({ message: 'User already registered' });

    res.status(201).json({ token });
  },

  allUsers: async (_req, res) => {
    const result = await userService.allUsers();
    return res.status(200).json(result);
  },
};

module.exports = userController;