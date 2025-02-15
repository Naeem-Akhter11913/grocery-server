const mongoose = require('mongoose');

const tableInstance = new mongoose.Schema({
    verderId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    productName:{
        type: String,
        require: true,
    },
    productType: {
        type: String,
        require: true,
    },
    frontImage: {
        type: String,
        require: true,
    },
    backImage: {
        type: String,
        require: true,
    },
    actualPrice: {
        type: Number,
        require: true,
    },
    falsePrice: {
        type: Number,
        require: true,
    },
    images: {
        type: [String],
        require: true,
    },
    sku: {
        type: String,
        require: true,
    },
    mfg: {
        type: Number,
        require: true,
    },
    tags: {
        type: [String],
        require: true,
    },
    life: {
        type: Number,
        require: true,
    },
    stock: {
        type: Number,
        require: true,
    },
    description: {
        productDisc: {
            type: String,
            require: true,
        },
        typeOfPacking: {
            type: String,
            required: true,
        },
        color: {
            type: [String],
            required: true,
        },
        quantityPerCase: {
            type: String,
            required: true,
        },
        ethylAlcohol: {
            type: Number,
            required: true,
        },
        pieceInOne: {
            type: String,
            required: true,
        },
        packagingAndDelivery: {
            type: String,
            required: true,
        },
        suggestedUse: {
            type: [String],
            required: true,
        },
        otherIngredients: {
            type: [String],
            required: true,
        },
        warnings: {
            type: [String],
            required: true,
        }
    },
    specifications: {
        standUp: {
            type: String,
            required: true
        },
        foldedWithoutWheels: {
            type: String,
            required: true
        },
        foldedWithWheels: {
            type: String,
            required: true

        },
        doorPassThrough: {
            type: String,
            required: true

        },
        frame: {
            type: String,
            required: true

        },
        weightWithoutWheels: {
            type: String,
            required: true

        },
        weightCapacity: {
            type: String,
            required: true

        },
        width: {
            type: String,
            required: true

        },
        handleHeight: {
            type: String,
            required: true

        },
        wheels: {
            type: String,
            required: true

        },
        seatBackHeight: {
            type: String,
            required: true

        },
        headRoomInsideCanopy: {
            type: String,
            required: true

        },
        productColor: {
            type: [String],
            required: true

        },
        size: {
            type: [String],
            required: true

        }
    }
}, { timestamps: true });

module.exports = mongoose.model("product", tableInstance);