const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    name: { type: String, required: true },
    rate: { type: Number, required: true },
    type: { type: String },
    quantity: { type: Number },
    most_tastable: { type: Boolean, default: false },
    image_url: { type: String }
});

module.exports = mongoose.model('FoodItem', foodItemSchema);
