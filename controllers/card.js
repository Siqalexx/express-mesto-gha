const NotFound = require('../errors/notFoundError');
const { cardModel } = require('../models/card');

const checkError = (err, res) => {
  console.log(err);
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(400).send({ message: err.message });
  } else if (err.name === 'notFound') {
    res.status(err.status).send({ message: err.message });
    // думаю, что эта проверка не нужна, но иначе я не смогу разграничить кода ошибок
  } else {
    res.status(500).send({ message: err.message });
  }
};

const getCards = (req, res) => {
  cardModel
    .find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      checkError(err, res);
    });
};
const setCard = (req, res) => {
  const { name, link } = req.body;
  cardModel
    .create({ name, link, owner: req.user._id })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      console.log(err);
      checkError(err, res);
    });
};
const deleteCard = (req, res) => {
  const { cardId } = req.params;
  cardModel
    .findByIdAndDelete(cardId)
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        throw new NotFound('Карточка не найдена');
      }
    })
    .catch((err) => {
      checkError(err, res);
    });
};
const setLike = (req, res) => {
  const { cardId } = req.params;
  const id = req.user._id;
  cardModel
    .findByIdAndUpdate(cardId, { $addToSet: { likes: id } }, { new: true })
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        throw new NotFound('Карточка не найдена');
      }
    })
    .catch((err) => {
      checkError(err, res);
    });
};
const deleteLike = (req, res) => {
  const { cardId } = req.params;
  const id = req.user._id;
  cardModel
    .findByIdAndUpdate(cardId, { $pull: { likes: id } }, { new: true })
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        throw new NotFound('Карточка не найдена');
      }
    })
    .catch((err) => {
      checkError(err, res);
    });
};

module.exports = {
  getCards,
  setCard,
  deleteCard,
  setLike,
  deleteLike,
};
