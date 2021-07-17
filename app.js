
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
    "MONGO_URL":"mongodb://localhost:27017/jaisalmeria",
    "PORT":3000
}


// mongodb connection
connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());

var cors = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "accept, content-type, x-access-token, x-requested-with");
    next();
};
  
app.use(cors);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/',require('./server/routes/routes'));

module.exports = app;
