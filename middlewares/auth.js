const jsonwebtoken = require('jsonwebtoken');
const LoginError = require('../errors/LoginError');
// const LoginError = require('../errors/loginError');
const auth = (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    throw new LoginError('Необходима авторизация');
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
