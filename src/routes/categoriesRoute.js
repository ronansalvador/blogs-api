const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const validateToken = require('../middlewares/validateToken');

const categoriesRoute = Router();

categoriesRoute.post('/', validateToken, categoryController.addCategory);

module.exports = categoriesRoute; 