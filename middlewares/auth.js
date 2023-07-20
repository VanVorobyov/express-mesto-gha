const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../utils/errors/unauthorizedError');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    next(new UnauthorizedError('Необходимо авторизоваться'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new UnauthorizedError('Необходимо авторизоваться'));
    return;
  }
  req.user = payload;
  next();
};
