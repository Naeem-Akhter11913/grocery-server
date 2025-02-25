const mongoose = require('mongoose');

const sliderMongooseSchema = mongoose.Schema({
    verderId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    sliderHeading: {
        type: String,
        require: true,
    },
    sliderTitle: {
        type: String,
        require: true,
    },
    sliderImage: {
        type: String,
        type: true,
    }
}, { timestamps: true });

module.exports = new mongoose.model('slider', sliderMongooseSchema);