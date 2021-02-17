const winston = require('winston');
const expressWinston = require('express-winston');

/**
 * @module
 * @description Логгеры.<br>
 * @since v.1.0.0
 */

/**
 * @description Логгер запросов.<br>
 * Сохраняет логи в logs/request.log
 * @since v.1.0.0
 */
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: './logs/request.log' }),
  ],
  format: winston.format.json(),
});

/**
 * @description Логгер ошибок.<br>
 * Сохраняет логи в logs/error.log
 * @since v.1.0.0
 */
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: './logs/error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
