const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'userSchema',
    },
    type: {
        type: String,
        required: true,
    },
    mainHeading: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    firstHeading: {
        type: String,
        required: true,
    },
    firstHeadingDesc: {
        type: String,
        required: true,
    },
    secondHeading: {
        type: String,
        required: true,
    },
    secondHeadingFirstDesc: {
        type: String,
        required: true,
    },
    secondHeadingImg: {
        type: [String],
        required: true,
    },
    secondHeadingSecDesc: {
        type: String,
        required: true,
    },
    quote: {
        type: String,
        required: true,
    },
    secondHeadingThirdDesc: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        require: true,
        default: false,
    }
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);
