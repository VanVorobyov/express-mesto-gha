const jwt = require('jsonwebtoken');
const NotFoundError = require('../utils/errors/unauthorizedError');
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { token } = req.cookie;
  if (!token) {
    return next(new NotFoundError('Необходима авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(token, 'login-token');
  } catch (err) {
    return next(new NotFoundError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
