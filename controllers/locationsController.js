const LocationModel = require('../models/LocationModel');
const haversine = require('haversine');


exports.postLocation = async (req, res) => {
    const startDistance = {};
    const endDistance = {
        latitude: 52.502931,
        longitude: 13.408249
    };
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
        // calculate distance to Ofice
        try {
            startDistance.latitude = json.lat;
            startDistance.longitude = json.lng;
            json.distanceToOfice = haversine(startDistance, endDistance);
        } catch (error) {
            errors.distance = 'unable to calculate distance';
        }
        // save to database
        try {
            const newLocation = new LocationModel({ name: fileName, file: json });
            const savedLocation = await newLocation.save();
            res.json(savedLocation);
        } catch (error) {
            errors.DB = 'could not save to database';
        }
    }
};

