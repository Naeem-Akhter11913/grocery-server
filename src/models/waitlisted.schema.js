const mongoose = require('mongoose');

const waitlistedInstance = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    waitlisted: {
        type: [String],
        require: true,
    }
}, { timestamps: true });

module.exports = new mongoose.model("waitlisted", waitlistedInstance);