const moongose = require('mongoose');
const validator = require('validator');
const { validationAvatar } = require('../utils/validationAvatar');

function validationEmail(email) {
  return validator.isEmail(email);
}

const userSchema = moongose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: validationAvatar,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validationEmail,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
module.exports.userModel = moongose.model('user', userSchema);
