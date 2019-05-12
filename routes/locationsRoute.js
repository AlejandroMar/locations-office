const express = require('express');

const router = express.Router();

const locationsController = require('../controllers/locationsController');


router.get('/all', locationsController.getLocations);

router.get('/:id?', locationsController.getLocationById);
router.get('/:name?', locationsController.getLocationByName);


module.exports = router;
