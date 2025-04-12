const mongoose = require('mongoose');


const blogComments = new mongoose.Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Blog'
    },
    star: {
        type: Number,
        require: true,
    },
    message: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    link: {
        type: String,
        require: true,
    },
    isViewed: {
        type: Boolean,
        require: true,
        default: false,
    },
    isDeleted:{
        type: Boolean,
        require: true,
        default: false,
    }
}, { timestamps: true });

module.exports = new mongoose.model('blogcomment', blogComments);