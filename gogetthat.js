const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cors = require('cors');
const flash = require('connect-flash');

const app = express();
const constants = require('./config/constants');
const modules = require('./config/modules');
const baseMiddleware = require('./middlewares/baseMiddleware');

const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./swagger.json')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));
// app.use(session({
//   secret: 'djhxc34231241252asdf23slsakdf3adsflkas2',
// 	resave: true,
// 	saveUninitialized: true
// }));

app.set('trust proxy', 1)
app.use(session({
  secret: 'secret',
  resave: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 365 * 1000
  }
}));

app.use(baseMiddleware);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules_url', express.static(path.join(__dirname, 'node_modules')));

require('./routes/router')(app);

app.listen(global.appPort, (err, resu) => {
  if (err) throw err;
  console.log(`server listening on port: ${global.appPort}`);
});

module.exports = app;