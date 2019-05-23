var express = require('express');
var app = express();

app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/Routes.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/public', express.static('public'));

mongoose.connect('mongodb://localhost:27017/myDatabase');

app.use('/', routes);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});