const mongoose = require('mongoose');

const { Schema } = mongoose;

const LocationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    file: {
        type: JSON,
        required: true
    },
});

module.exports = mongoose.model('Location', LocationSchema);
