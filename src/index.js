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
app.use('/', (req, res) =>
    res.send('Welcome to the Food Delivery API!')
);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected')
        console.log('----------------------------------');
        // deleteAllCollections();
    })
    .catch((err) => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.clear();
    console.log('----------------------------------');
    console.log(`Server running on port ${PORT}`);
});


const deleteAllCollections = async () => {
    try {
        // Get a list of all collections
        const collections = await mongoose.connection.db.listCollections().toArray();

        // Loop through each collection and delete all documents
        for (let collection of collections) {
            await mongoose.connection.db.collection(collection.name).deleteMany({});
            console.log(`Deleted all data from collection: ${collection.name}`);
        }
    } catch (err) {
        console.error('Error deleting data from collections:', err);
    } finally {
        // Close the connection after deletion
        mongoose.connection.close();
    }
};
