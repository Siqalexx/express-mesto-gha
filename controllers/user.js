const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const NotFound = require('../errors/notFoundError');
const loginError = require('../errors/loginError');
const { userModel } = require('../models/user');
const {
  OK,
  VALIDERR,
  OTHERERR,
  REQUIRED_PARAMETER,
  DATA_ERROR,
  DUBLICATE_DATA,
} = require('../constants/constants');

const SECRET_SAUL = 10;
const PRIVATE_KEY = 'supersecretkey';

// const checkError = (err, res, next) => {
//   console.log(err);
//   if (err.name === 'CastError' || err.name === 'ValidationError') {
//     res.status(VALIDERR).send({ message: err.message });
//   } else if (err.name === 'notFound') {
//     res.status(err.status).send({ message: err.message });
//   } else {
//     res.status(OTHERERR).send({ message: err.message });
//   }
// };

const getUsers = (req, res, next) => {
  userModel
    .find({})
    .then((data) => res.status(OK).send(data))
    .catch(next);
};
const setUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  if (!email || password.length < 5) {
    throw new loginError('Required parameter email or password is missing');
  }
  userModel
    .findOne({ email: email })
    .then((data) => {
      console.log(data);
      if (data !== null) {
        const err = new Error(`user with email ${email} already exists`);
        err.status = DUBLICATE_DATA;
        throw err;
      }
      bcrypt
        .hash(password, SECRET_SAUL)
        .then((password) => {
          userModel
            .create({
              name,
              about,
              avatar,
              email,
              password,
            })
            .then((data) => {
              res.status(OK).send(data);
            });
        })
        .catch(next);
    })
    .catch(next);
};
const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  userModel
    .findByIdAndUpdate(
      req.user.user.id,
      { name, about },
      {
        new: true,
        runValidators: true,
      }
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
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
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
    .findOne({ email: email })
    .select('+password')
    .then((data) => {
      if (data == null) {
        throw new loginError(`email or password is not correct`);
      }

      bcrypt
        .compare(password, data.password)
        .then((result) => {
          if (!result) {
            throw new loginError(`email or password is not correct`);
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
            .end();
        })
        .catch(next);
    })
    .catch(next);
};

const getInfoUser = (req, res, next) => {
  const { user } = req.user;

  userModel
    .findById(user.id)
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
};
