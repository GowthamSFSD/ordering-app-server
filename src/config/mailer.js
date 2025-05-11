const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,         
        pass: process.env.PASS_CODE       
    }
});

// Send mail function
const sendMail = async ({ to, subject, html }) => {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to,
        subject,
        html
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};


module.exports = sendMail;
