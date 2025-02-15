const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true
    },
    familyName: {
        type: String,
        required: true,
        // unique: true
    },
    fullName: {
        type: String,
        required: true,
        // unique: true
    },
    email: {
        type: String,
        required: true,
        // unique: true
    },
    profileImage: {
        type: String,
        required: false,
        default:null
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

// Create the model
const User = mongoose.model('userSchema', userSchema);

module.exports = User;
