const express = require('express');
const router = express.Router();

// Routes
const restaurantRoutes = require('../routes/restaurant');
const foodRoutes = require('../routes/food');
const authRoutes = require('../routes/auth');
const adminRoutes = require('../routes/admin');
const addressRoutes = require('../routes/address');

// Middlewares
const optionalAuth = require('../middleware/optionalAuth');


router.use('/auth', authRoutes);

router.use('/food', optionalAuth, foodRoutes);
router.use('/restaurant', restaurantRoutes);
router.use('/address', addressRoutes);

router.use('/admin', adminRoutes);


module.exports = router;
