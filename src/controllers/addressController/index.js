const Address = require('../../models/address');

exports.createAddress = async (req, res) => {
    try {
        const {
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

        const user = req.user.userId;

   
        if (isDefault) {
            await Address.updateMany(
                { user, isDefault: true },
                { $set: { isDefault: false } }
            );
        }

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

        res.status(201).json({ success: true , data: savedAddress });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get all addresses for a user
exports.getUserAddresses = async (req, res) => {
    try {
        const { userId } = req.user;

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

        // Get the existing address (so we can grab the user ID)
        const existingAddress = await Address.findById(addressId);
        if (!existingAddress) {
            return res.status(404).json({ success: false, message: 'Address not found' });
        }

        // If setting as default, unset isDefault for other addresses
        if (updateData.isDefault) {
            await Address.updateMany(
                { user: existingAddress.user, isDefault: true, _id: { $ne: addressId } },
                { $set: { isDefault: false } }
            );
        }

        // Handle geo location update if provided
        if (updateData.latitude && updateData.longitude) {
            updateData.location = {
                type: 'Point',
                coordinates: [updateData.longitude, updateData.latitude]
            };
        }

        const updated = await Address.findByIdAndUpdate(addressId, updateData, {
            new: true
        });

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
