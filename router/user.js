const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  updateProfile,
  updateAvatar,
  getInfoUser,
  getUser,
} = require('../controllers/user');
userRouter.get('/users', getUsers);
userRouter.get('/users/me', getInfoUser); //наверное нужно проверять еще и куки
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
userRouter.get(
  '/users/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().length(24),
    }),
  }),
  getUser
);
userRouter.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .regex(
          /https?:\/\/[www\.]?[a-z1-9\-*\.*\_*\~*\:*\/*\?*\#*\[*\]*\@*\!*\$*\&*\'*\(*\)*\**\+*\,*\;*\=*]+\.[a-z]+\/?[a-z1-9\-*\.*\_*\~*\:*\/*\?*\#*\[*\]*\@*\!*\$*\&*\'*\(*\)*\**\+*\,*\;*\=*]*\#?/m
        ),
    }),
  }),
  updateAvatar
);
module.exports = userRouter;
