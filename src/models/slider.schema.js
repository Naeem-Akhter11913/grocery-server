const mongoose = require('mongoose');

const sliderMongooseSchema = new mongoose.Schema({
    verdorId: {
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
        require: true,
    },
    isShow:{
        type: Boolean,
        default: true,
        require: true,
    },
    isDeleted:{
        type: Boolean,
        default: false,
        require: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('slider', sliderMongooseSchema);