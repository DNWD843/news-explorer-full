const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleErrors = require('./middlewares/handleErrors');
const rootRouter = require('./routes');
const { TO_MONGODB_DEV } = require('./configs/index');

const { PORT = 4000, TO_NEWS_EXPLORER_DB, NODE_ENV = 'develop' } = process.env;

/**
 * @module app
 * @description Точка входа бэкенда, express-сервер.
 * @since v.1.0.0
 */
const app = express();

app.use(cors());

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(limiter);
app.use(rootRouter);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

mongoose.connect(
  NODE_ENV === 'production' ? TO_NEWS_EXPLORER_DB : TO_MONGODB_DEV,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
);

app.listen(PORT);
