const User = require('../../models/User');


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-__v'); // omit __v
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.changeUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const allowedRoles = ['user', 'admin', 'restaurant_owner', 'division_owner', 'sub_division_owner', 'delivery_boy'];
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        ).select('-__v');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User role updated successfully', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

