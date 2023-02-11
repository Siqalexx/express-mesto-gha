const NotFound = require('../errors/notFoundError');
const { cardModel } = require('../models/card');
const { OK, VALIDERR, OTHERERR } = require('../constants/constants');

const getCards = (req, res, next) => {
  cardModel
    .find({})
    .then((data) => {
      res.status(OK).send(data);
    })
    .catch(next);
};
const setCard = (req, res, next) => {
  const { name, link } = req.body;
  cardModel
    .create({ name, link, owner: req.user.user.id })
    .then((data) => res.status(OK).send(data))
    .catch(next);
};
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  cardModel
    .findOne({ _id: cardId })
    .then((data) => {
      if (!data) {
        throw new NotFound('Карточка не найдена');
      }
      if (data.owner.toString() !== req.user.user.id) {
        throw new NotFound('Карточка не принадлежит вам');
      }
      console.log(data.owner.toString());
      cardModel
        .deleteOne({ _id: cardId })
        .then((data) => {
          res.status(OK).send(data);
        })
        .catch(next);
    })
    .catch(next);
};
const setLike = (req, res, next) => {
  const { cardId } = req.params;
  const id = req.user.user.id;
  cardModel
    .findByIdAndUpdate(cardId, { $addToSet: { likes: id } }, { new: true })
    .then((data) => {
      if (!data) {
        throw new NotFound('Карточка не найдена');
      }
      res.status(OK).send(data);
    })
    .catch(next);
};
const deleteLike = (req, res, next) => {
  const { cardId } = req.params;
  const id = req.user.user.id;
  cardModel
    .findByIdAndUpdate(cardId, { $pull: { likes: id } }, { new: true })
    .then((data) => {
      if (!data) {
        throw new NotFound('Карточка не найдена');
      }
      res.status(OK).send(data);
    })
    .catch(next);
};

module.exports = {
  getCards,
  setCard,
  deleteCard,
  setLike,
  deleteLike,
};
