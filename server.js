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

// template engine


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

// handle 404
app.use((req, res, next) => {
    res.status(404);
    // respond with json
    if (req.accepts('json')) {
        res.send({
            errorMessage: 'The endpoint you requested could not be found',
            status: 'failure'
        });
        return;
    }
    // default to plain-text. send()
    res.type('txt').send('Not found');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    debug(`listening on port ${chalk.yellow(PORT)}`);
});
