var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/Routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/myDatabase');

app.use('/', routes);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});