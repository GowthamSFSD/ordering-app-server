const FoodItem = require('../../models/FoodItem');

exports.createFoodItem = async (req, res) => {
    try {
        const foodItem = new FoodItem({
            ...req.body,
            restaurant_id: req.params.restaurantId
        });
        await foodItem.save();
        res.status(201).json(foodItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getFoodsByRestaurant = async (req, res) => {
    try {
        const foods = await FoodItem.find({ restaurant_id: req.params.restaurantId, isDeleted: false });
        res.json(foods);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateFoodItem = async (req, res) => {
    try {
        const updatedFood = await FoodItem.findByIdAndUpdate(
            req.params.foodId,
            req.body,
            { new: true }
        );
        res.json(updatedFood);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteFoodItem = async (req, res) => {
    try {
        const food = await FoodItem.findByIdAndUpdate(
            req.params.foodId,
            { isDeleted: true },
            { new: true }
        );

        if (!food) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        res.json({ message: 'Food item deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

