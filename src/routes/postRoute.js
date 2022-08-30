const { Router } = require('express');
const postController = require('../controllers/postController');

const isValid = require('../middlewares/postValidator');
const isAuth = require('../middlewares/validateTokenLogin');

const postRoute = Router();

postRoute.post('/', isAuth.validToken, isValid.validPost, postController.create);
postRoute.get('/', isAuth.validToken, postController.getAll);

module.exports = postRoute; 