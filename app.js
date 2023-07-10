const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const { ERROR_NOT_FOUND } = require('./utils/errors/errors');

const { PORT = 3000, MONGODB = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();
app.use(bodyParser.json());

mongoose.connect(MONGODB);

app.use((req, res, next) => {
  req.user = {
    _id: '649f378e602babba1d1a2872',
  };
  next();
});

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use('*', (reg, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Запрошен несуществующий роут' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
