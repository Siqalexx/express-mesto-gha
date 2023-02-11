const jsonwebtoken = require('jsonwebtoken');
const { DATA_ERROR } = require('../constants/constants');
const auth = (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    return res.status(DATA_ERROR).send({ message: 'Необходима авторизация' });
  }
  const payload = jsonwebtoken.verify(jwt, 'supersecretkey');
  req.user = { user: payload };
  next();
};

module.exports = {
  auth,
};
