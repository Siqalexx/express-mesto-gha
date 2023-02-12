const { REGEPX_URL } = require('../constants/constants');

function validationAvatar(link) {
  return REGEPX_URL.test(link);
}

module.exports = {
  validationAvatar,
};
