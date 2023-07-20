const router = require('express').Router();
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/users');
const { validateLogin, validateRegister } = require('../utils/validators/userValidator');

router.post('/signup', validateRegister, createUser);
router.post('/signin', validateLogin, login);

module.exports = router;
