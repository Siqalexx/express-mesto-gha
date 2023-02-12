const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const NotFound = require('../errors/NotFoundError');
const LoginError = require('../errors/LoginError');
const { userModel } = require('../models/user');
const { OK } = require('../constants/constants');

const SECRET_SAUL = 10;
const PRIVATE_KEY = 'supersecretkey';

const getUsers = (req, res, next) => {
  userModel
    .find({})
    .then((data) => res.status(OK).send(data))
    .catch(next);
};
const setUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, SECRET_SAUL)
    .then((passwordHash) => {
      userModel
        .create({
          name,
          about,
          avatar,
          email,
          password: passwordHash,
        })
        .then((data) => {
          res.status(OK).send({
            name: data.name,
            about: data.about,
            avatar: data.avatar,
            email: data.email,
          });
        })
        .catch((err) => {
          console.log(123);
          next(err);
        });
    })
    .catch(next);
};
const updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  userModel
    .findByIdAndUpdate(
      req.user.id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    )
    .then((data) => {
      if (!data) {
        throw new NotFound('Пользователь не найден');
      }
      res.status(OK).send(data);
    })
    .catch(next);
};
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  userModel
    .findByIdAndUpdate(
      req.user.id,
      { avatar },
      { new: true, runValidators: true },
    )
    .then((data) => {
      if (!data) {
        throw new NotFound('Пользователь не найден');
      }
      res.status(OK).send(data);
    })
    .catch(next);
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  userModel
    .findOne({ email })
    .select('+password')
    .then((data) => {
      if (data == null) {
        throw new LoginError('email or password is not correct');
      }

      bcrypt
        .compare(password, data.password)
        .then((result) => {
          if (!result) {
            throw new LoginError('email or password is not correct');
          }
          const token = jwt.sign({ id: data._id }, PRIVATE_KEY, {
            expiresIn: '7d',
          });
          console.log(token);
          res
            .cookie('jwt', token, {
              maxAge: 3600000,
              httpOnly: true,
            })
            .send({ message: 'cookie is download' });
        })
        .catch(next);
    })
    .catch(next);
};

const getInfoUser = (req, res, next) => {
  const { id } = req.user;

  userModel
    .findById(id)
    .then((data) => {
      if (!data) {
        throw new NotFound('Пользователь не найден');
      }
      res.status(OK).send(data);
    })
    .catch(next);
};
const getUser = (req, res, next) => {
  userModel
    .findOne({ _id: req.params.userId })
    .then((data) => {
      if (!data) {
        throw new NotFound('Пользователь не найден');
      }
      res.status(OK).send(data);
    })
    .catch(next);
};
module.exports = {
  getUsers,
  setUser,
  updateProfile,
  updateAvatar,
  login,
  getInfoUser,
  getUser,
};
