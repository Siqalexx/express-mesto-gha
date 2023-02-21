const jsonwebtoken = require('jsonwebtoken');
const LoginError = require('../errors/LoginError');
// const LoginError = require('../errors/loginError');
const auth = (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    return next(new LoginError('Необходима авторизация'));
  }
  try {
    const payload = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
    req.user = payload;
  } catch (error) {
    return next(new LoginError(error.message)); // отправляем кастомную ошибку авторизации
  }
  return next();
};

module.exports = {
  auth,
};
