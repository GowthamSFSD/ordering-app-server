const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    image_url: { type: String },
    type: { type: String },
    address: { type: String },
    start_time: { type: String },
    end_time: { type: String }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
