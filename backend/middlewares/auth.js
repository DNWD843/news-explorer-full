const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const { JWT_SECRET_DEV } = require('../configs/index');
const { authorizationRequiredMessage } = require('../constants/errorMessages');

/**
 * @module
 * @description Миддлвэр проверки права доступа пользователя.<br>
 * Если пользователь зарегистрирован и передал достоверные и валидные данные при авторизации,
 *  он становится авторизованным и получает право на доступ к информации и взаимодействие с ней.
 * @since v.1.0.0
 */
const authorizationCheck = (req, res, next) => {
  const { authorization } = req.headers;
  const { NODE_ENV = 'develop', JWT_SECRET } = process.env;
  const secret = NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    const error = new UnauthorizedError(authorizationRequiredMessage);
    return next(error);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, secret);
  } catch (err) {
    const error = new UnauthorizedError(authorizationRequiredMessage);
    return next(error);
  }
  req.user = payload;
  return next();
};

module.exports = { authorizationCheck };
