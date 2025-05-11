const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

// Registration
router.post('/register/send-otp', authController.sendRegisterOtp);
router.post('/register/verify', authController.verifyRegisterOtp);

// Login
router.post('/login/send-otp', authController.sendLoginOtp);
router.post('/login/verify', authController.verifyLoginOtp);

module.exports = router;
