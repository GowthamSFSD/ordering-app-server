const express = require('express');
const router = express.Router();
const orderController = require("../../controllers/orderController")


router.post('/', orderController.placeOrder);
router.get('/', orderController.getUserOrders);
router.get('/admin', orderController.getAllOrders);


module.exports = router;

module.exports = router;
