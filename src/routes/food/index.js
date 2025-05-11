const express = require('express');
const router = express.Router();
const foodController = require('../../controllers/foodController');

// Create food item for a restaurant
router.post('/:restaurantId', foodController.createFoodItem);

// Get all food items for a restaurant
router.get('/:restaurantId', foodController.getFoodsByRestaurant);

// Update a food item
router.put('/update/:foodId', foodController.updateFoodItem);

// Delete a food item
router.delete('/delete/:foodId', foodController.deleteFoodItem);

module.exports = router;
