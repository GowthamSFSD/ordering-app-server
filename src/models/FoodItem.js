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
    is_available: { type: Boolean, default: true },
    quantity: { type: Number },
    most_tastable: { type: Boolean, default: false },
    image_url: { type: String },
    description: { type: String },
    tags: [{ type: String }],
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('FoodItem', foodItemSchema);
