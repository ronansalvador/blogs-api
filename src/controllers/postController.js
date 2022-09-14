const jwt = require('jsonwebtoken');
const postService = require('../services/postCategoryService');
const { User } = require('../database/models');

const ERROR_MESSAGES = 'Server Error';

const { JWT_SECRET } = process.env;

const create = async (req, res) => {
  const token = req.headers.authorization;

  const { email } = jwt.verify(token, JWT_SECRET);

  const { dataValues: { id } } = await User.findOne({ where: { email } });

  try {
    const postInfo = req.body;

    const categoryExists = await postService.verifyCategoryExists(postInfo.categoryIds);

    if (categoryExists.message) {
      return res.status(400).json(categoryExists);
    }
    const newPost = await postService.create(postInfo, id);
    return res.status(201).json(newPost);
  } catch (err) {
    return res
      .status(500)
      .json({ message: ERROR_MESSAGES, error: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const posts = await postService.getAll();

    return res.status(200).json(posts);
  } catch (err) {
    return res
      .status(500)
      .json({ message: ERROR_MESSAGES, error: err.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postService.getById(id);

    if (post.message) {
      return res.status(404).json(post);
    }

    return res.status(200).json(post);
  } catch (err) {
    return res
      .status(500)
      .json({ message: ERROR_MESSAGES, error: err.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;

  const { email } = jwt.verify(token, JWT_SECRET);

  const { dataValues: { id: userId } } = await User.findOne({ where: { email } });

  try {
    const postUpdate = req.body;

    const authorPost = await postService.verifyAuthorPost(id, userId);

    if (authorPost.message) {
      return res.status(authorPost.code).json({ message: authorPost.message });
    }
    const updatedPost = await postService.update(postUpdate, id);

    return res.status(200).json(updatedPost);
  } catch (err) {
    return res
      .status(500)
      .json({ message: ERROR_MESSAGES, error: err.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
}; 