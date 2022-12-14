const express = require('express');

const bodyParser = require('body-parser');
const helmet = require('helmet');
const { limiter } = require('./utils/limiter');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const centralErrorHandler = require('./middlewares/centralErrorHandler');

const router = require('./routes/index');

const { PORT = 8080 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(limiter);
app.use(cors);
app.use(helmet());

app.use('/', router);

app.use(errorLogger);
app.use(centralErrorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
