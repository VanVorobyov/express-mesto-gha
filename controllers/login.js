const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      const day = 24 * 60 * 60 * 1000;
      res.cookie('login_token', token, {
        maxAge: 7 * day, httpOnly: true,
      });
      res.status(200).send(user);
    })
    .catch(next);
};
