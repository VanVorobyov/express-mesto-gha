const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ERROR_UNAUTHORIZED } = require('../utils/errors/errors');

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'login_token');
      res.status(201).cookie('login_token', `Bearer ${token}`, {
        expires: new Date(Date.now() + 7 * 24 * 3600000), httpOnly: true,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError');
      res
        .status(ERROR_UNAUTHORIZED)
        .send({ message: 'Ошибка авторизации' });
    });
};
