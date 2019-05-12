require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('server');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');


// Mount routes
const locationsRoute = require('./routes/locationsRoute');

// APP
const app = express();

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect(
    process.env.MONGO_DB_URL,
    { useNewUrlParser: true }
)
    .then(() => debug(chalk.blue('MongoDB Connected')))
    .catch(err => debug(err));


// Use routes
app.use('/api/locations', locationsRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    debug(`listening on port ${chalk.yellow(PORT)}`);
});
