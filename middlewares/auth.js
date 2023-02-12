const jsonwebtoken = require('jsonwebtoken');
const { DATA_ERROR } = require('../constants/constants');
// const LoginError = require('../errors/loginError');
const auth = (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    // это все запускает бесконечный вызов ошибки до момента прихода токена
    // throw new LoginError('Необходима авторизация');
    // next(new LoginError('Необходима авторизация'));
    return res.status(DATA_ERROR).send({ message: 'Необходима авторизация' });
  }
  try {
    const payload = jsonwebtoken.verify(jwt, 'supersecretkey');
    req.user = payload;
  } catch (error) {
    next(error);
  }
  return next();
};

module.exports = {
  auth,
};
