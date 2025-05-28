const express = require('express');
const router = express.Router();
const restaurantController = require('../../controllers/restaurantController');
const requireAuth = require('../../middleware/requireAuth');


router.get('/all', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurantById);
router.get('/location/pincode/:pincode', restaurantController.getRestaurantByPincode);


// ✅ Protected routes (require login)
router.post('/', requireAuth, restaurantController.createRestaurant);
router.put('/:id', requireAuth, restaurantController.updateRestaurant);
router.delete('/:id', requireAuth, restaurantController.deleteRestaurant);

module.exports = router;
