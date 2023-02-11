const moongose = require('mongoose');
const validator = require('validator');

function validationEmail(email) {
  return validator.isEmail(email);
}
function validationAvatar(link) {
  return /https?:\/\/[www\.]?[a-z1-9\-*\.*\_*\~*\:*\/*\?*\#*\[*\]*\@*\!*\$*\&*\'*\(*\)*\**\+*\,*\;*\=*]+\.[a-z]+[a-z1-9\-*\.*\_*\~*\:*\/*\?*\#*\[*\]*\@*\!*\$*\&*\'*\(*\)*\**\+*\,*\;*\=*]*/gim.test(
    link
  );
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
    minlength: 6,
    select: false,
  },
});
module.exports.userModel = moongose.model('user', userSchema);
