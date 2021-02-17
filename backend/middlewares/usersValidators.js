const { celebrate, Joi } = require('celebrate');

/**
 * @module
 * @description Миддлвэры валидации данных в запросах, касающихся действий с данными
 *  пользователя<br>
 * Валидация выполняется библиотеками celebrate и Joi.
 * @since v.1.0.0
 */

/**
 * @description Миддлвэр handleRegisterReqValidator.<br>
 * Валидирует данные в запросе на создание (регистрацию) пользователя.
 * @since v.1.0.0
 */
const handleRegisterReqValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

/**
 * @description Миддлвэр handleLoginReqValidator.<br>
 * Валидирует данные в запросе на авторизацию (вход) пользователя.
 * @since v.1.0.0
 */
const handleLoginReqValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  handleRegisterReqValidator,
  handleLoginReqValidator,
};
