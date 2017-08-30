const fs = require('fs');
const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const routes = require("./routes");

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache')
app.set('layout', 'layout');
app.use('/static', express.static('static'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

app.use(routes);

app.listen(3000, function () {
    console.log('Preparing to mark boxes.')
});
