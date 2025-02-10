const mongoose = require('mongoose');

const refereceTokenSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        require: true,
    },
    refereceToken:{
        type:String,
        require: true
    }
}, { timestamps: true });


module.exports = mongoose.Schema("refereceTokenSchema",refereceTokenSchema)