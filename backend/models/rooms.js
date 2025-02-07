const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    place: {
        type: String,
        required: true,
    },
    rent: {
        type: Number,  
        required: true,
    },
    distance: {
        type: Number, 
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    wifi: {
        type: String,
        required: true,
    },
    food: {
        type: String,
        required: true,
    },
    parking: {
        type: String,
        required: true,
    },
    amenities: {
        type: String,
        required: true,
    },
    combined: {
        type: String,
        required: true, 
    }
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
