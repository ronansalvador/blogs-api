const { Router } = require('express');
const userController = require('../controllers/userController');
const userValidator = require('../middlewares/userValidator');
const validateToken = require('../middlewares/validateToken');

const userRoute = Router();

userRoute.post('/', userValidator.validateCreateUser, userController.create);
userRoute.get('/', validateToken, userController.allUsers);

module.exports = userRoute; 