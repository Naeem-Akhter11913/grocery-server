const mongoose = require('mongoose');


const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema',
        required: true,
    },
    addressType: {
        type: String,
        required: true,
        enum: ['permanent', 'corresponding'],
    },
    addressLine1: {
        type: String,
        required: false,
    },
    addressLine2: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    zipCode: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});

const address = mongoose.model('Address',addressSchema);

module.exports = address;