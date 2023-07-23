const { celebrate, Joi } = require('celebrate');
const { isURL } = require('../constants');
const BadRequest = require('../errors/badRequestError');

const urlRegex = (url) => {
  if (isURL) {
    return url;
  }
  throw new BadRequest('Некорректный адрес URL');
};

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(urlRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(urlRegex),
  }),
});

module.exports.validateUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});
