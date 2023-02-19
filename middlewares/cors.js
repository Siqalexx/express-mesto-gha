const allowedCors = [
  'https://ivanov-social.nomoredomains.work/',
  'https://api.ivanov-social.nomoredomains.work/',
  'localhost:3000',
  'https://www.google.ru/',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const cors = (req, res, next) => {
  console.log(req.method, req.headers.origin);
  const { method } = req;
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  }
  next();
};

module.exports = {
  cors,
};
