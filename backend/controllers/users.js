const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const { SALT_ROUND, JWT_MAX_AGE, JWT_SECRET_DEV } = require('../configs/index');
const { userNotFoundMessage, invalidRequestDataMessage, existingUserMessage } = require('../constants/errorMessages');
const { registrationSuccessMessage } = require('../constants/responseMessages');

/**
 * @module
 * @description Контроллеры модели User.<br>
 * Обрабатывают запросы:<br>
 *  - GET /users/me - возвращает данные авторизованного пользователя<br>
 *  - POST /signup - создает (регистрирует) нового пользователя<br>
 *  - POST /signin — авторизует пользователя<br>
 * @since v.1.0.0
 */

/**
 * @description Контроллер getUserData()<br>
 * Получает и возвращает данные авторизованного пользователя.<br>
 * Обрабатывает запрос GET /users/me
 * @returns {JSON} данные пользователя
 * @since v.1.0.0
 */
const getUserData = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFoundMessage);
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new BadRequestError(invalidRequestDataMessage);
        return next(error);
      }
      return next(err);
    });
};

/**
 * @description Контроллер handleRegister()<br>
 * Создает нового пользователя, в ответ отправляет сообщение об успешной регистрации<br>
 * Принимает параметры из тела запроса: { email, password, name }<br>
 * Обрабатываeт запрос POST /signup
 * @property {String} req.body.email - емэйл пользователя
 * @property {String} req.body.password - пароль пользователя
 * @property {String} req.body.name - имя пользователя
 * @returns {Object} message
 * @since v.1.0.0
 * @instance
 * @public
 */
const handleRegister = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, SALT_ROUND)
    .then((hash) => User.create({ email, password: hash, name })
      .then(() => res.status(200).send({ message: registrationSuccessMessage }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          const error = new BadRequestError(invalidRequestDataMessage);
          return next(error);
        }
        if (err.name === 'MongoError') {
          const error = new ConflictError(existingUserMessage);
          return next(error);
        }
        return next(err);
      }));
};

/**
 * @description Контроллер handleLogin()<br>
 * Принимает в теле запроса емэйл и пароль. Проверяет учетные данные пользователя.
 *  Если пользователь найден в базе - возвращает токен.
 * Обрабатывает запрос POST /signin
 * @property {String} req.body.email - емэйл пользователя
 * @property {String} req.body.password - пароль пользователя
 * @returns {Object} token
 * @since v.1.0.0
 */
const handleLogin = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV = 'develop', JWT_SECRET } = process.env;
      const secret = NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV;
      const token = jwt.sign({ _id: user._id }, secret, { expiresIn: JWT_MAX_AGE });
      return res.status(200).send({ token });
    })
    .catch((err) => {
      const error = new UnauthorizedError(err.message);
      return next(error);
    });
};

module.exports = {
  getUserData,
  handleRegister,
  handleLogin,
};
