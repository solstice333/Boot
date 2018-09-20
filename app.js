const process = require('process');
const path = require('path');
const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');

const indexRouter = require('./routes/index');
const bootRouter = require('./routes/boot');

const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/boot', bootRouter);

app.use((req, res, next) => {
   next(createError(404));
});

app.use((err, req, res, next) => {
   res.status(err.status || 500);

   if (req.app.get('env') === 'development') {
      err.stack = err.stack.split(/\r\n|\n|\r/);
      Object.defineProperty(err, 'stack', { enumerable: true });
      Object.defineProperty(err, 'name', { enumerable: true });
   }
   else
      err = {};

   res.json(err);
})

module.exports = app;
