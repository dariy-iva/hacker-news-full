const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 8080 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);




app.use(errorLogger);
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log('Server started');
});