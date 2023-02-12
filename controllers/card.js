const NotFound = require('../errors/NotFoundError');
const { cardModel } = require('../models/card');
const { OK, CREATE_OBJECT } = require('../constants/constants');
const Forbidden = require('../errors/Forbidden');

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
    .create({ name, link, owner: req.user.id })
    .then((data) => res.status(CREATE_OBJECT).send(data))
    .catch(next);
};
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  console.log(112);
  cardModel
    .findOne({ _id: cardId })
    .then((data) => {
      if (!data) {
        throw new NotFound('Карточка не найдена');
      }
      if (data.owner.toString() !== req.user.id) {
        throw new Forbidden('Карточка не принадлежит вам');
      }
      console.log(112);
      console.log(data.owner.toString());
      data
        .remove()
        .then((result) => {
          res.status(OK).send(result);
        })
        .catch(next);
    })
    .catch(next);
};
const setLike = (req, res, next) => {
  const { cardId } = req.params;
  const { id } = req.user;
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
  const { id } = req.user;
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
