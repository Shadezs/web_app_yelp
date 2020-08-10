const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3030;

require('dotenv').config();

const indexRouter = require('./routes/index');
const zipcodeRouter = require('./routes/zipcode');

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true })); // <---- ADDED
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/zipcode', zipcodeRouter);

app.listen(PORT, (err) =>
  console.log(`${err ? err : `running on PORT ${PORT}`}`),
);
