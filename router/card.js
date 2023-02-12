const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { REGEPX_URL } = require('../constants/constants');

const {
  getCards,
  setCard,
  deleteCard,
  setLike,
  deleteLike,
} = require('../controllers/card');

cardRouter.get('/', getCards);
cardRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(REGEPX_URL),
    }),
  }),
  setCard,
);
cardRouter.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().hex().length(24),
    }),
  }),
  setLike,
);
cardRouter.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().hex().length(24),
    }),
  }),
  deleteLike,
);
cardRouter.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().hex().length(24),
    }),
  }),
  deleteCard,
);
module.exports = cardRouter;
