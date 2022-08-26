const { Router } = require('express');
const userController = require('../controllers/userController');
const userValidator = require('../middlewares/userValidator'); 

const userRoute = Router();

userRoute.post('/', userValidator.validateCreateUser, userController.create);

module.exports = userRoute; 