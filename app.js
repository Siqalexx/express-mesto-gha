const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const userRouter = require('./router/user');
const cardRouter = require('./router/card');
const { REGEPX_URL } = require('./constants/constants');
const { setUser, login } = require('./controllers/user');

const app = express();
const { auth } = require('./middlewares/auth');
const NotFound = require('./errors/NotFoundError');

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(cookieParser());

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(REGEPX_URL),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
  setUser,
);

app.use('/users', auth, userRouter);

app.use('/cards', auth, cardRouter);

app.use(errors());

app.use((req, res, next) => {
  next(new NotFound('Неправильный адрес'));
});

app.use((err, req, res, next) => {
  let { status = 500 } = err;
  if (err.code === 11000) {
    status = 409;
  }
  if (status !== 500) {
    res.status(status).send({
      message: err.message,
    });
  }
  next();
});

app.listen(3000, () => {
  // передаю порт таким образом, потому что нет возможности передать его через set в VScodе,
  console.log('Сервер запущен');
});
