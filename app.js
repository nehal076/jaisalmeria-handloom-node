
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

const connectDB = require('./server/database/connection');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

process.env = {
    "MONGO_URL":"mongodb://localhost:27017/jaisalmeria"
}


// mongodb connection
connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',require('./server/routes/routes'));

module.exports = app;
