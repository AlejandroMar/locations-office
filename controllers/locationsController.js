const LocationModel = require('../models/LocationModel');
const haversine = require('haversine');
const officeLocation = require('../utils/officeLocation.json');
const isEmpty = require('../utils/is-empty');


exports.postLocation = async (req, res) => {
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

    if (isEmpty(json)) {
        errors.emptyFile = 'Empty file, file requires latitude and longitude fields. Other fields are optional';
        res.send(errors);
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
        // calculate distance to Ofice
        try {
            const startDistance = { latitude: json.lat, longitude: json.lng };
            json.distanceToOfice = haversine(startDistance, officeLocation);
        } catch (error) {
            errors.distance = 'unable to calculate distance';
            res.send(errors);
        }
        // save to database
        try {
            const newLocation = new LocationModel({ name: fileName, file: json });
            const savedLocation = await newLocation.save();

            res.json(savedLocation);
        } catch (error) {
            errors.DB = 'could not save to database';
            res.send(errors);
        }
    }
};

