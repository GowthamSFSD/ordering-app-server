const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const allRoutes = require('./routes');



dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', allRoutes);
app.use('/', (req,res) => 
    res.send('Welcome to the Food Delivery API!')
);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.clear();
    console.log('----------------------------------');
    console.log(`Server running on port ${PORT}`);
});
