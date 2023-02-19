const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const userRouter = require('./router/user');
const cardRouter = require('./router/card');
const { REGEPX_URL } = require('./constants/constants');
const { setUser, login } = require('./controllers/user');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { auth } = require('./middlewares/auth');
const NotFound = require('./errors/NotFoundError');

mongoose.connect('mongodb://localhost:27017/mestodb');

const allowedCors = [
  'https://ivanov-social.nomoredomains.work',
  'https://api.ivanov-social.nomoredomains.work',
  'http://localhost:3000',
  'http://localhost:3000/',
  'https://www.google.ru',
];
// const corsOptions = {
//   origin: (origin, callback) => {
//     console.log(origin);
//     if (allowedCors.indexOf(origin) !== -1 || !origin) {
//       callback(null, { origin: true });
//     } else {
//       callback(new Error('Cors error'));
//     }
//   },
//   methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTIONS'],
// };

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'https://ivanov-social.nomoredomains.work',
      'https://api.ivanov-social.nomoredomains.work',
      'http://localhost:3000',
      'http://localhost:3000/',
      'https://www.google.ru',
    ],
  }),
);
app.use(requestLogger);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
  login
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
  setUser
);

app.use('/users', auth, userRouter);

app.use('/cards', auth, cardRouter);

app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFound('Неправильный адрес'));
});

app.use(errors());

app.use((err, req, res, next) => {
  const { message, status = 500 } = err;
  if (status !== 500) {
    res.status(status).send({
      message,
    });
  } else {
    res.status(status).send({
      message: 'Ошибка сервера',
    });
    console.log(message);
  }
  next();
});

app.listen(3000, () => {
  // передаю порт таким образом, потому что нет возможности передать его через set в VScodе,
  console.log('Сервер запущен');
});
