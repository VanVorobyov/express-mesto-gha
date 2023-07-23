const { Joi, celebrate } = require('celebrate');
const { isURL } = require('../constants');
const BadRequest = require('../errors/badRequestError');

const urlRegex = (url) => {
  if (isURL) {
    return url;
  }
  throw new BadRequest('Некорректный адрес URL');
};

module.exports.validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(urlRegex),
  }),
});

module.exports.validateCardById = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});
