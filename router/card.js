const cardRouter = require('express').Router();

const {
  getCards,
  setCard,
  deleteCard,
  setLike,
  deleteLike,
} = require('../controllers/card');

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', setCard);
cardRouter.put('/cards/:cardId/likes', setLike);
cardRouter.delete('/cards/:cardId/likes', deleteLike);
cardRouter.delete('/cards/:cardId', deleteCard);
module.exports = cardRouter;
