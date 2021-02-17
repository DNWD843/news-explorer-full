const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const { invalidArticleLinkMessage } = require('../constants/errorMessages');

/**
 * @module
 * @description Схема статьи - article
 * @param {String} keyword — ключевое слово, по которому ищутся статьи. Обязательное поле - строка.
 * @param {String} title — заголовок статьи. Обязательное поле - строка.
 * @param {String} text — текст статьи. Обязательное поле - строка.
 * @param {String} date — дата статьи. Обязательное поле - строка.
 * @param {String} source — источник статьи. Обязательное поле - строка.
 * @param {String} link — ссылка на статью. Обязательное поле - строка, URL-адрес.
 * @param {String} image — ссылка на иллюстрацию к статье. Обязательное поле - строка, URL-адресом.
 * @param {String} owner — _id пользователя, сохранившего статью. По умолчанию,
 *  база данных не возвращает это поле.
 * @since v.1.0.0
 */
const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: invalidArticleLinkMessage,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: invalidArticleLinkMessage,
    },
  },
  owner: {
    type: String,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
