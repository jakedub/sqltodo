const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const routes = require("./routes");
const morgan = require("morgan");

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use("/css", express.static("public"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

app.use(routes);

app.use(morgan('dev'))

app.listen(3000, function () {
    console.log('Preparing to mark boxes.')
});
