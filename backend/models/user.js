const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { invalidUserEmailMessage, invalidAuthDataMessage } = require('../constants/errorMessages');

/**
 * @module
 * @description Схема пользователя - User<br>
 * @param {String} email - почта пользователя, по которой он регистрируется.
 *  Это обязательное поле, уникальное для каждого пользователя.
 * @param {String} password - хеш пароля. Обязательное поле-строка.
 *  По умолчанию, база данных не возвращает это поле.
 * @param {String} name - имя пользователя. Это обязательное поле-строка от 2 до 30 символов.
 * @since v.1.0.0
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: invalidUserEmailMessage,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

/**
 * @method findUserByCredentials
 * @description Статический метод поиска пользователя.
 *  Принимает аргументами емэйл (логин) и пароль, возвращает объект с данными пользователя.
 * @param {String} email - почта пользователя
 * @param {String} password - пароль
 * @since v.1.0.0
 */
userSchema.statics.findUserByCredentials = function fn(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(invalidAuthDataMessage));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(invalidAuthDataMessage));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
