const express = require('express');
const router = express.Router();
const restaurantController = require('../../controllers/restaurantController');

// Create a new restaurant
router.post('/', restaurantController.createRestaurant);

// Get all active (non-deleted) restaurants
router.get('/all', restaurantController.getAllRestaurants);

// Get a restaurant by ID
router.get('/:id', restaurantController.getRestaurantById);

// Get restaurants by pincode
router.get('/location/pincode/:pincode', restaurantController.getRestaurantByPincode);

// Update a restaurant by ID
router.put('/:id', restaurantController.updateRestaurant);

// Soft delete a restaurant by ID
router.delete('/:id', restaurantController.deleteRestaurant);


module.exports = router;
