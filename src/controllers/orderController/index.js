const Order = require('../../models/order');
const FoodItem = require('../../models/FoodItem');
const Address = require('../../models/address');

exports.placeOrder = async (req, res) => {
    try {
        const { restaurant, items, paymentMethod } = req.body;
        const { userId } = req.user;

        // 🔍 Get user's default address
        const defaultAddress = await Address.findOne({ user: userId, isDefault: true });
        if (!defaultAddress) {
            return res.status(400).json({
                success: false,
                message: "No default address found. Please add one before placing an order."
            });
        }

        // 💸 Calculate total amount
        let totalAmount = 0;
        for (const item of items) {
            const food = await FoodItem.findById(item.foodItem);
            if (!food || food.isDeleted || !food.is_available) {
                return res.status(400).json({
                    success: false,
                    message: `Item not available: ${item.foodItem}`
                });
            }
            totalAmount += food.rate * item.quantity;
        }

        // 🧾 Create and save order
        const order = new Order({
            user: userId,
            restaurant,
            items,
            deliveryAddress: defaultAddress._id,
            totalAmount,
            paymentMethod,
            paymentStatus: paymentMethod === 'online' ? 'paid' : 'pending'
        });

        const savedOrder = await order.save();
        res.status(201).json({ success: true, data: savedOrder });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const { userId } = req.user;
        const orders = await Order.find({ user: userId })
            .populate('restaurant')
            .populate('items.foodItem')
            .populate('deliveryAddress')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: orders });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('restaurant')
            .populate('items.foodItem')
            .populate('deliveryAddress')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: orders });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

