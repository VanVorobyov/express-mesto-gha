const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// // TODO:
// module.exports.getLikes = (req, res) => {
//   Card.findByIdAndRemove(req.params.id)
//     .then((card) => res.status(200).send({ data: card }))
//     .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
// };
// // TODO:
// module.exports.deleteLike = (req, res) => {
//   Card.findByIdAndRemove(req.params.id)
//     .then((card) => res.status(200).send({ data: card }))
//     .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
// };
