const router = require('express').Router();
const {
  getCards, createCard, deleteCard, getLikes, deleteLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:id', deleteCard);
router.put('/:id/likes', getLikes);
router.delete('/:id/likes', deleteLike);

module.exports = router;
