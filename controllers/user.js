const NotFound = require('../errors/notFoundError');
const { userModel } = require('../models/user');
const { OK, VALIDERR, OTHERERR } = require('../constants/constants');

const checkError = (err, res) => {
  console.log(err);
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(VALIDERR).send({ message: err.message });
  } else if (err.name === 'notFound') {
    res.status(err.status).send({ message: err.message });
    // думаю, что эта проверка не нужна, но иначе я не смогу разграничить кода ошибок
  } else {
    res.status(OTHERERR).send({ message: err.message });
  }
};

const getUsers = (req, res) => {
  userModel
    .find({})
    .then((data) => res.status(OK).send(data))
    .catch((err) => checkError(err, res));
};
const getUser = (req, res) => {
  userModel
    .findOne({ _id: req.params.userId })
    .then((data) => {
      if (!data) {
        throw new NotFound('Пользователь не найден');
      }
      res.status(OK).send(data);
    })
    .catch((err) => {
      checkError(err, res);
    });
};
const setUser = (req, res) => {
  const { name, about, avatar } = req.body;
  userModel
    .create({ name, about, avatar })
    .then((data) => {
      res.status(OK).send(data);
    })
    .catch((err) => {
      console.log(err);
      checkError(err, res);
    });
};
const updateProfile = (req, res) => {
  const { name, about } = req.body;
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true, runValidators: true,
      },
    )
    .then((data) => {
      if (!data) {
        throw new NotFound('Пользователь не найден');
      }
      res.status(OK).send(data);
    })
    .catch((err) => {
      checkError(err, res);
    });
};
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    )
    .then((data) => {
      if (!data) {
        throw new NotFound('Пользователь не найден');
      }
      res.status(OK).send(data);
    })
    .catch((err) => {
      checkError(err, res);
    });
};
module.exports = {
  getUsers,
  getUser,
  setUser,
  updateProfile,
  updateAvatar,
};
