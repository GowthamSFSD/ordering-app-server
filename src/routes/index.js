const restaurantRoutes = require('./restaurantRoutes');
const foodRoutes = require('./foodRoutes');
const express = require('express');
const router = express.Router();

router.use('/restaurants', restaurantRoutes);
router.use('/foods', foodRoutes);


module.exports = router;