const Restaurant = require('../../models/Restaurant');

exports.createRestaurant = async (req, res) => {
    try {
        const restaurant = new Restaurant(req.body);
        await restaurant.save();
        res.status(201).json(restaurant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({ isDeleted: false });
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getRestaurantByPincode = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({ pincode: req.params.pincode, isDeleted: false });
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateRestaurant = async (req, res) => {
    try {
        const { id } = req.params;

        const restaurant = await Restaurant.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.json(restaurant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteRestaurant = async (req, res) => {
    try {
        const { id } = req.params;

        const restaurant = await Restaurant.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        res.json({ message: 'Restaurant deleted successfully (soft delete)' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
