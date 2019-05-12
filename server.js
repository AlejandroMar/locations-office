require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('server');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Mount routes
const locationsRoute = require('./routes/locationsRoute');

// APP
const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect(
    'mongodb://alejo:alejo123@ds155606.mlab.com:55606/locations-api',
    { useNewUrlParser: true }
)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => debug(err));


// Use routes
app.use('/locations', locationsRoute);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    debug(`listening on port ${chalk.yellow(PORT)}`);
});
