const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('server:locations');
const multer = require('multer');
const LocationModel = require('../models/LocationModel');
const haversine = require('haversine');

const storage = multer.memoryStorage();
const upload = multer({ storage });


const router = express.Router();


router.get('/', async (req, res) => {
    res.send('hello');
});

router.post('/', upload.single('avatar'), async (req, res) => {
    let json;
    let fileName;
    const errors = {};
    const regex = /\.[json]+$/i;
    const { file } = req;
    const { buffer, originalname } = file;
    try {
        json = JSON.parse(buffer);
    } catch (error) {
        errors.fileType = 'File type needs to be json';
        res.send({ errors });
    }

    if (originalname.match(regex)) {
        fileName = originalname.replace(regex, '');
    } else {
        errors.fileType = 'File extension needs to be json';
        res.send({ errors });
    }

    if (!json.lat || !json.lng) {
        errors.missingProperties = 'File requires latitud and longitud fields writen as: lat and lng';
        res.send({ errors });
    } else {
        try {
            const newLocation = new LocationModel({ name: fileName, file: json });
            const savedLocation = await newLocation.save();
            res.json(savedLocation);
        } catch (error) {
            errors.DB = 'could not save to database';
        }
    }
});


module.exports = router;
