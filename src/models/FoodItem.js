const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    name: { type: String, required: true },
    rate: { type: Number, required: true },
    food_type: {
        type: String,
        enum: ['Veg', 'Non-Veg', 'Mixed'],
        required: true
    },
    is_available: {
        type: String,
        enum: ["Available", "Non-Available"],
        required: true
    },
    quantity: { type: Number },
    most_tastable: { type: Boolean, default: false },
    image_url: { type: String },
    isDeleted: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('FoodItem', foodItemSchema);
