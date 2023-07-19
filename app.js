const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { createUser } = require('./controllers/users');
const login = require('./controllers/login');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { validateLogin, validateRegister } = require('./utils/validators/userValidator');

const { PORT = 3000, MONGODB = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
mongoose.connect(MONGODB);

app.post('/signin', validateLogin, login);
app.post('/signup', validateRegister, createUser);

app.use('/users', auth, userRoutes);
app.use('/cards', auth, cardRoutes);
app.use('*', (reg, res) => {
  res.status(404).send({ message: 'Запрошен несуществующий роут' });
});

app.use(errorHandler());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
