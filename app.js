const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const userRouter = require('./router/user');
const cardRouter = require('./router/card');
const { ERRORSRC } = require('./constants/constants');
const { setUser, login } = require('./controllers/user');
const app = express();
const { auth } = require('./middlewares/auth');

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(cookieParser());
app.use(errors());

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required().min(6),
    }),
  }),
  login
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
      about: Joi.string().min(2).max(30).default('Исследователь'),
      avatar: Joi.string().default(
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
      ),
      email: Joi.string().required(),
      password: Joi.string().required().min(6),
    }),
  }),
  setUser
);

app.use(auth);

app.use('/', userRouter);

app.use('/', cardRouter);

app.use((err, req, res, next) => {
  const { message, status = 500 } = err;
  res.status(status).send({
    message: message,
  });
});

app.listen(3000, () => {
  // передаю порт таким образом, потому что нет возможности передать его через set в VScodе,
  console.log('Сервер запущен');
});
