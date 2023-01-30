const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./router/user');
const cardRouter = require('./router/card');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use((req, res, next) => {
  req.user = {
    _id: '63d28a7105bd5c94d72e9dd5',
  };
  next();
});
app.use(express.json());

app.use('/', userRouter);

app.use('/', cardRouter);

app.use((req, res, next) => {
  res.status(404).json({
    message:
      'Неправильный адрес',
  });
});

app.listen(3000, () => {
  // передаю порт таким образом, потому что нет возможности передать его через set в VScodе,
  console.log('Сервер запущен');
});
