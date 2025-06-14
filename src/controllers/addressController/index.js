const Address = require('../../models/address');

// Create Address
exports.createAddress = async (req, res) => {

    try {
        const {
            user,
            addressLine1,
            addressLine2,
            city,
            state,
            postalCode,
            country,
            latitude,
            longitude,
            isDefault
        } = req.body;

        const newAddress = new Address({
            user,
            addressLine1,
            addressLine2,
            city,
            state,
            postalCode,
            country,
            isDefault,
            location: {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        });

        const savedAddress = await newAddress.save();
        res.status(201).json({ success: true, data: savedAddress });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get all addresses for a user
exports.getUserAddresses = async (req, res) => {
    try {
        const { userId } = req.params;

        const addresses = await Address.find({ user: userId });
        res.status(200).json({ success: true, data: addresses });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update address
exports.updateAddress = async (req, res) => {
    try {
        const { addressId } = req.params;
        const updateData = req.body;

        if (updateData.latitude && updateData.longitude) {
            updateData.location = {
                type: 'Point',
                coordinates: [updateData.longitude, updateData.latitude]
            };
        }

        const updated = await Address.findByIdAndUpdate(addressId, updateData, {
            new: true
        });

        if (!updated) return res.status(404).json({ success: false, message: 'Address not found' });

        res.status(200).json({ success: true, data: updated });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Delete address
exports.deleteAddress = async (req, res) => {
    try {
        const { addressId } = req.params;

        const deleted = await Address.findByIdAndDelete(addressId);
        if (!deleted) return res.status(404).json({ success: false, message: 'Address not found' });

        res.status(200).json({ success: true, message: 'Address deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
