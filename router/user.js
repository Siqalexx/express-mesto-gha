const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { REGEPX_URL } = require('../constants/constants');

const {
  getUsers,
  updateProfile,
  updateAvatar,
  getInfoUser,
  getUser,
} = require('../controllers/user');

userRouter.get('/', getUsers);
userRouter.get('/me', getInfoUser); // наверное нужно проверять еще и куки
userRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile,
);
userRouter.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().hex().length(24),
    }),
  }),
  getUser,
);
userRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().regex(REGEPX_URL),
    }),
  }),
  updateAvatar,
);
module.exports = userRouter;
