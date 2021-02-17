const SALT_ROUND = 10;
const JWT_MAX_AGE = 3600000 * 24 * 7;
const JWT_SECRET_DEV = 'dev-secret';
const TO_MONGODB_DEV = 'mongodb://localhost:27017/explorerdb';

module.exports = {
  SALT_ROUND,
  JWT_MAX_AGE,
  JWT_SECRET_DEV,
  TO_MONGODB_DEV,
};
