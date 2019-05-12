const LocationModel = require('../models/LocationModel');


exports.getLocations = async (req, res) => {
    const locationsList = await LocationModel.find();
    res.json(locationsList);
};

exports.getLocationById = async (req, res) => {
    try {
        const { id } = req.query;
        console.log(id);

        const location = await LocationModel.findById(id);
        res.status(200).json(location);
    } catch (error) {
        res.status(404).json('Error: Location not found');
    }
};

exports.getLocationByName = async (req, res) => {
    try {
        const { name } = req.query;
        console.log(name);
        const location = await LocationModel.findOne({ name });
        res.json(location);
    } catch (error) {
        res.status(404).json('Error: Location not found');
    }
};

