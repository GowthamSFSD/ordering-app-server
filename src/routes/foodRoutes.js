const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');

// Create food item
router.post('/:restaurantId', async (req, res) => {
    try {
        const foodItem = new FoodItem({
            ...req.body,
            restaurant_id: req.params.restaurantId
        });
        await foodItem.save();
        res.status(201).json(foodItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all foods for a restaurant
router.get('/:restaurantId', async (req, res) => {
    try {
        const foods = await FoodItem.find({ restaurant_id: req.params.restaurantId });
        res.json(foods);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update food item
router.put('/update/:foodId', async (req, res) => {
    try {
        const updatedFood = await FoodItem.findByIdAndUpdate(req.params.foodId, req.body, { new: true });
        res.json(updatedFood);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete food item
router.delete('/delete/:foodId', async (req, res) => {
    try {
        await FoodItem.findByIdAndDelete(req.params.foodId);
        res.json({ message: 'Food item deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
