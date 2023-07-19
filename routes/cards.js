const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, deleteLike,
} = require('../controllers/cards');
const { validateCardId, validateCard } = require('../utils/validators/cardValidator');

router.get('/', getCards);
router.post('/', validateCard, createCard);
router.delete('/:id', validateCardId, deleteCard);
router.put('/:id/likes', validateCardId, likeCard);
router.delete('/:id/likes', validateCardId, deleteLike);

module.exports = router;
