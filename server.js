require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('server');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect('mongodb://alejo:alejo123@ds155606.mlab.com:55606/locations-api', { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => debug(err));


const locationsRoute = require('./routes/locationsRoute');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(morgan('dev'));


const PORT = process.env.PORT || 4000;
app.use('/locations', locationsRoute);

app.listen(PORT, () => {
    debug(`listening on port ${chalk.yellow(PORT)}`);
});
