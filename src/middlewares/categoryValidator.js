const Joi = require('joi');

const MESSAGE = 'Some required fields are missing';

const validateCategory = (catName) => {
  const Category = Joi.object({
    name: Joi.string().required().messages({
      'any.required': '400|"name" is required',
      'string.empty': `400|${MESSAGE}`,
    }),
  });

  const { error, value } = Category.validate(catName);

  if (error) {
    throw error;
  }
  return value;
};

module.exports = validateCategory;