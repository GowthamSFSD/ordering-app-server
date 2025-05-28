const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminController');


// Get all users — only for admin
router.get('/users', adminController.getAllUsers);
router.put('/user/:id/role', adminController.changeUserRole);


module.exports = router;
