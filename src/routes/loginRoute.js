const { Router } = require('express');
const loginController = require('../controllers/loginController');
const loginValidator = require('../middlewares/loginValidator');

const loginRoute = Router();

loginRoute.post('/', loginValidator.validateFields, loginController.login);

module.exports = loginRoute; 