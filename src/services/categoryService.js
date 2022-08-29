const { Category } = require('../database/models');
const validateCategory = require('../middlewares/categoryValidator');

const CategoryServices = {

  addCategory: async ({ name }) => {
    const check = validateCategory({ name });
    const result = await Category.create(check);
    return result;
  },

  getCategory: async () => {
    const result = await Category.findAll();
    return result;
  },
};

module.exports = CategoryServices; 