const NotFound = require('../errors/notFoundError');
const { userModel } = require('../models/user');

const checkError = (err, res) => {
  console.log(err);
  if (err.name === 'CastError') {
    res.status(400).send({ message: err.message });
  } else if (err.name === 'notFound') {
    res.status(err.status).send({ message: err.message });
    // думаю, что эта проверка не нужна, но иначе я не смогу разграничить кода ошибок
  } else {
    res.status(400).send({ message: err.message });
  }
};

const getUsers = (req, res) => {
  userModel
    .find({})
    .then((data) => res.status(200).send(data))
    .catch((err) => console.log(err));
};
const getUser = (req, res) => {
  userModel
    .findOne({ _id: req.params.userId })
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        throw new NotFound('Пользователь не найден');
      }
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
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'CastError') {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
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
      if (data) {
        res.status(200).send(data);
      } else {
        throw new NotFound('Пользователь не найден');
      }
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
      if (data) {
        res.status(200).send(data);
      } else {
        throw new NotFound('Пользователь не найден');
      }
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
