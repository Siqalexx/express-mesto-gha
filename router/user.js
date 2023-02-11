const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  updateProfile,
  updateAvatar,
  getInfoUser,
} = require('../controllers/user');
userRouter.get('/users', getUsers);
userRouter.get('/users/me', getInfoUser); //наверное нужно проверять куки
userRouter.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile
);
userRouter.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required(),
    }),
  }),
  updateAvatar
);
module.exports = userRouter;
