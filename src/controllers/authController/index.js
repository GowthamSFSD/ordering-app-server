const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../../config/mailer');

const otpStore = new Map();

// Generate OTP and store it temporarily
const generateOtp = (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000;
    otpStore.set(email, { otp, expiresAt });
    return otp;
};


// ✅ Register - Send OTP
exports.sendRegisterOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });
    if (user) return res.status(409).json({ message: 'User already exists. Please log in.' });

    const otp = generateOtp(email);

    await sendEmail({
        to: email,
        subject: 'Registration OTP',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Gokul Eats - OTP Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f6f8fa;
      margin: 0;
      padding: 0;
    }
    .container {
      background-color: #ffffff;
      max-width: 500px;
      margin: 40px auto;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #e63946;
      text-align: center;
    }
    h2 {
      color: #1d3557;
      text-align: center;
    }
    p {
      font-size: 16px;
      color: #333333;
      text-align: center;
    }
    .footer {
      text-align: center;
      font-size: 13px;
      color: #888888;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to Gokul Eats 🍽️</h1>
    <p>Thanks for signing up!</p>
    <h2>Your OTP is: <strong>${otp}</strong></h2>
    <p>This OTP is valid for the next <strong>5 minutes</strong>.</p>
    <p>If you didn’t request this, you can safely ignore this email.</p>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Gokul Eats. All rights reserved.
    </div>
  </div>
</body>
</html>
`
    });

    res.json({ message: 'OTP sent to email for registration' });
};

// ✅ Register - Verify OTP & Create User
exports.verifyRegisterOtp = async (req, res) => {
    const { name, email, otp } = req.body;
    if (!name || !email || !otp) return res.status(400).json({ message: 'All fields are required' });

    const record = otpStore.get(email);
    if (!record || record.otp !== otp || Date.now() > record.expiresAt)
        return res.status(400).json({ message: 'Invalid or expired OTP' });

    const user = new User({ name, email });
    await user.save();
    otpStore.delete(email);

    const token = jwt.sign({ userId: user._id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET);

    res.status(201).json({
        message: 'Registration successful',
        token,
    });
};

// ✅ Login - Send OTP
exports.sendLoginOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found. Please register.' });

    const otp = generateOtp(email);

    await sendEmail({
        to: email,
        subject: 'Login OTP',
        html: `
  <div style="font-family: Arial, sans-serif; background-color: #f8f8f8; padding: 20px;">
    <div style="max-width: 500px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h1 style="text-align: center; color: #e63946;">Welcome to Gokul Eats 🍽️</h1>
      <p style="text-align: center; font-size: 16px;">Thank you for signing in!</p>
      <h2 style="text-align: center; color: #1d3557;">Your OTP is: <strong>${otp}</strong></h2>
      <p style="text-align: center;">This OTP is valid for <strong>5 minutes</strong>.</p>
      <p style="text-align: center; color: #555;">If you didn’t request this, you can ignore this email.</p>
      <p style="text-align: center; font-size: 13px; color: #999;">&copy; ${new Date().getFullYear()} Gokul Eats</p>
    </div>
  </div>
`

    });

    res.json({ message: 'OTP sent to email for login' });
};

// ✅ Login - Verify OTP
exports.verifyLoginOtp = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP required' });
    const record = otpStore.get(email);
    if (!record || record.otp !== otp || Date.now() > record.expiresAt)
        return res.status(400).json({ message: 'Invalid or expired OTP' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    otpStore.delete(email);

  const token = jwt.sign({ userId: user._id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET);

    res.json({
        message: 'Login successful',
        token
    });
};
