const process = require('process');
const path = require('path');
const express = require('express');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const bootRouter = require('./routes/boot');

const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/boot', bootRouter);

module.exports = app;
