const mongoose = require('mongoose');

const mongooseBlogInstance = new mongoose.Schema({
    verderId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    blogHeadingImage: {
        type: String,
        require: true
    },
    blogHeadingTitle: {
        type: String,
        require: true
    },
    blogHeadingDesc: {
        type: String,
        require: true
    },
    blogHeadingDesc: {
        type: String,
        require: true
    },
    subImageTitle: {
        type: String,
        require: true
    },


}, { timestamps: true });

module.exports = new mongoose.model("blog", mongooseBlogInstance);
