const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    image_url: { type: String },
    food_type: {
        type: String,
        enum: ['Veg', 'Non-Veg', 'Mixed'], 
        required: true
    },
    food_styles: {
        type: [String],
        required: true 
    },
    address: { type: String },
    pincode : { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    start_time: { type: String },
    end_time: { type: String }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
