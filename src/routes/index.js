const restaurantRoutes = require('../routes/restaurant');
const foodRoutes = require('../routes/food');
const authRoutes = require("../routes/auth")
const express = require('express');
const router = express.Router();

router.use('/restaurant', restaurantRoutes);
router.use('/food', foodRoutes);
router.use("/auth",authRoutes)


module.exports = router;