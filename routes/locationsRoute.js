const express = require('express');

const router = express.Router();

const locationsController = require('../controllers/locationsController');


router.get('/all', locationsController.getLocations);

router.get('/id/:id', locationsController.getLocationById);

router.get('/name/:name', locationsController.getLocationByName);


module.exports = router;
