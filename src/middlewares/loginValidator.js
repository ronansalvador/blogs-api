const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    'any,required': 'Some required fields are missing',
    'string.empty': 'Some required fields are missing',
  }),
  password: Joi.string().required().messages({
    'any,required': 'Some required fields are missing',
    'string.empty': 'Some required fields are missing',
  }),
});

const validadeLogin = {
  validateFields: (req, res, next) => {
    const { email, password } = req.body;

    const fields = { email, password };

    const { error } = loginSchema.validate(fields);

    if (error) return res.status(400).json({ message: error.message });
    next();
  },
};

module.exports = validadeLogin;