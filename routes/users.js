const router = require('express').Router();
const {
  getUsers, getUser, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const { validateUserId, validateUserInfo, validateAvatar } = require('../utils/validators/userValidator');

router.get('/', getUsers);
router.get('/:id', validateUserId, getUser);
router.get('/:id', getCurrentUser);
router.patch('/me', validateUserInfo, updateUser);
router.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
