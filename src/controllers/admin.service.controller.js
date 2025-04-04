const uploadStream = require("../utils/uploadFunctions");
const productModel = require('../models/product.schema');
// const sliderModel = require("../models/slider.schema");
const sliderSchema = require("../models/slider.schema");

const addProducts = async (req, res) => {
    const { _id, name, familyName, email, fullName } = req.userDetails
    // const { frontImage, backImage, images } = req.files;

    const { frontImage,
        backImage,
        productColor,
        images,
        productName,
        productType,
        actualPrice,
        falsePrice,
        sku,
        mfg,
        tags,
        life,
        stock,
        productDisc,
        typeOfPacking,
        color,
        quantityPerCase,
        ethylAlcohol,
        pieceInOne,
        packagingAndDelivery,
        suggestedUse,
        otherIngredients,
        warnings,
        standUp,
        foldedWithoutWheels,
        foldedWithWheels,
        doorPassThrough,
        frame,
        weightWithoutWheels,
        weightCapacity,
        width,
        handleHeight,
        wheels,
        seatBackHeight,
        headRoomInsideCanopy,
        size,
        // productColor
    } = req.body;
    // console.log(req.body['tags'].split(","));
    // return;


    let flipFrontImage = null;
    let flipBackImage = null;
    if (req.files.frontImage && Array.isArray(req.files.frontImage) && req.files.frontImage.length > 0) {
        const imge1Object = req.files.frontImage[0];
        flipFrontImage = await uploadStream(imge1Object.buffer, 'frontImage');
    }
    if (req.files.backImage && Array.isArray(req.files.backImage) && req.files.backImage.length > 0) {
        const imge2Object = req.files.backImage[0];
        flipBackImage = await uploadStream(imge2Object.buffer, 'frontImage');
    }
    let imageUrl = [];
    if (req.files.images && Array.isArray(req.files.images) && req.files.images.length) {
        imageUrl = await Promise.all(
            req.files.images.map(item => uploadStream(item.buffer, 'product'))
        )
    }
    //frontImage, backImage, images
    // console.log(imageUrl);
    const productToSave = {
        verderId: _id,
        productName,
        productType,
        frontImage: req.files.frontImage ? flipFrontImage : frontImage,
        backImage: req.files.backImage ? flipBackImage : backImage,
        actualPrice,
        falsePrice,
        images: imageUrl.length > 0 ? imageUrl : images,
        sku,
        mfg,
        tags: Array.isArray(tags) ? JSON.parse(tags) : tags.split(","),
        life,
        stock,
        description: {
            productDisc,
            typeOfPacking,
            color: Array.isArray(color) ? JSON.parse(color) : color.split(","),
            quantityPerCase,
            ethylAlcohol,
            pieceInOne,
            packagingAndDelivery,
            suggestedUse: Array.isArray(suggestedUse) ? JSON.parse(suggestedUse) : suggestedUse.split(","),
            otherIngredients: Array.isArray(otherIngredients) ? JSON.parse(otherIngredients) : otherIngredients.split(","),
            warnings: Array.isArray(warnings) ? JSON.parse(warnings) : warnings.split(",")
        },
        specifications: {
            standUp,
            foldedWithoutWheels,
            foldedWithWheels,
            doorPassThrough,
            frame,
            weightWithoutWheels,
            weightCapacity,
            width,
            handleHeight,
            wheels,
            seatBackHeight,
            headRoomInsideCanopy,
            size: Array.isArray(size) ? JSON.parse(size) : size.split(','),
            productColor: Array.isArray(productColor) ? JSON.parse(productColor) : productColor.split(",")
        }
    }

    const productMongooseInstance = new productModel(productToSave)
    await productMongooseInstance.save();

    res.status(200).send({
        status: true,
        message: "product added successfully"
    })
}

const getProducts = async (req, res) => {
    const { _id, name, familyName, email, fullName } = req.userDetails;
    let { isadmin, page, limit } = req.headers;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const skip = (page - 1) * limit;
    let products = null;
    if (isadmin === "true") {
        products = await productModel.find({ verderId: _id }).skip(skip).limit(limit);
    } else {
        products = await productModel.find().skip(skip).limit(limit);
    }
    res.status(200).send({
        status: true,
        products,
        message: "Prduct fetched success"
    })

}

const updateProduct = async (req, res) => {
    const { _id, name, familyName, email, fullName } = req.userDetails
    const { frontImg, backImg, imgs } = req.files;
    const {
        item_id,
        frontImage,
        backImage,
        images,
        productName,
        productType,
        actualPrice,
        falsePrice,
        sku,
        mfg,
        tags,
        life,
        stock,
        productDisc,
        typeOfPacking,
        color,
        quantityPerCase,
        ethylAlcohol,
        pieceInOne,
        packagingAndDelivery,
        suggestedUse,
        otherIngredients,
        warnings,
        standUp,
        foldedWithoutWheels,
        foldedWithWheels,
        doorPassThrough,
        frame,
        weightWithoutWheels,
        weightCapacity,
        width,
        handleHeight,
        wheels,
        seatBackHeight,
        headRoomInsideCanopy,
        size,
        productColor
    } = req.body;

    if (!item_id) {
        return res.status(400).send({
            status: false,
            message: 'Connect with frontend developer'
        })
    }

    const isPresentProduct = await productModel.findOne({ _id: item_id });
    if (!isPresentProduct || Object.keys(isPresentProduct).length === 0) {
        return res.status(400).send({
            status: false,
            message: 'Select your item'
        })
    }


    let flipFrontImage = null;
    let flipBackImage = null;
    if (frontImg && Array.isArray(frontImg) && frontImg.length > 0) {
        const imge1Object = frontImg[0];
        flipFrontImage = await uploadStream(imge1Object.buffer, 'frontImage');
    }
    if (backImg && Array.isArray(backImg) && backImg.length > 0) {
        const imge2Object = backImg[0];
        flipBackImage = await uploadStream(imge2Object.buffer, 'backImage');
    }

    let imageUrl = [];
    if (Array.isArray(imgs) && imgs.length > 0) {
        imageUrl = await Promise.all(
            imgs.map(item => uploadStream(item.buffer, 'product'))
        )
    }
    const productToSave = {
        productName,
        productType,
        frontImage: flipFrontImage || frontImage,
        backImage: flipBackImage || backImage,
        actualPrice,
        falsePrice,
        images: imageUrl.length > 0 ? imageUrl : images,
        sku,
        mfg,
        tags,
        life,
        stock,
        description: {
            productDisc,
            typeOfPacking,
            color,
            quantityPerCase,
            ethylAlcohol,
            pieceInOne,
            packagingAndDelivery,
            suggestedUse,
            otherIngredients,
            warnings
        },
        specifications: {
            standUp,
            foldedWithoutWheels,
            foldedWithWheels,
            doorPassThrough,
            frame,
            weightWithoutWheels,
            weightCapacity,
            width,
            handleHeight,
            wheels,
            seatBackHeight,
            headRoomInsideCanopy,
            size,
            productColor
        }
    }


    const updatedItem = await productModel.findOneAndUpdate({ _id: item_id }, { $set: productToSave }, { new: true });


    res.status(200).send({
        status: true,
        updatedItem,
        message: "Item updated successfull"
    });
}

const deleteProduct = async (req, res) => {
    const { item_id } = req.headers;

    if (!item_id) {
        return res.status(400).send({
            status: false,
            message: "Connect with frontend developer"
        })
    }

    await productModel.findOneAndDelete({ _id: item_id });

    res.status(200).send({
        status: true,
        message: "item deleted success"
    });
}





const addSliderContent = async (req, res) => {
    const { sliderImage } = req.files;
    const { sliderTitle, sliderHeading } = req.body;
    const { _id } = req.userDetails;

    const isPresent = await sliderSchema.findOne({ verderId: _id })

    if (isPresent) {
        return res.status(409).send({
            status: false,
            message: "You can't post more than one. Sorry"
        })
    }

    let imageUrl = '';
    if (Array.isArray(sliderImage) && sliderImage.length > 0) {
        const imge1Object = sliderImage[0];
        imageUrl = await uploadStream(imge1Object.buffer, 'frontImage');
    }

    if (!sliderHeading && sliderHeading.trim().length > 0) {
        return res.status(401).send({
            status: false,
            message: "Enter valid slider heading"
        })
    }
    if (!sliderTitle && sliderTitle.trim().length > 0) {
        return res.status(401).send({
            status: false,
            message: "Enter valid slider title"
        })
    }

    const sliderObj = {
        verderId: _id,
        sliderHeading,
        sliderTitle,
        sliderImage: imageUrl
    }

    const sliderMmongooseInstance = new sliderSchema(sliderObj);

    await sliderMmongooseInstance.save();

    return res.status(201).send({
        status: true,
        message: "Slider added success! Now it will appear in clint slider"
    })

}

const getSliderContent = async (req, res) => {
    const { _id } = req.userDetails;

    if (!_id) {
        return res.status(401).send({
            status: false,
            message: "You are not Authorized"
        })
    }

    const allSlider = await sliderSchema.findOne({ verderId: _id });

    return res.status(200).send({
        status: true,
        message: "Here is your content",
        sliderContent: allSlider
    })

}

const editSliderContent = async (req, res) => {
    const { _id } = req.userDetails;

    const { sliderImage } = req.files;
    const { sliderTitle, sliderHeading, sliderImageURL } = req.body;

    const isPresent = await sliderSchema.findOne({ verderId: _id })

    if (!isPresent) {
        return res.status(401).send({
            status: false,
            message: "Opps! you have no slider content"
        })
    }

    let imageUrl = sliderImageURL;
    if (Array.isArray(sliderImage) && sliderImage.length > 0) {
        const imge1Object = sliderImage[0];
        imageUrl = await uploadStream(imge1Object.buffer, 'frontImage');
    }

    isPresent.sliderImage = imageUrl;
    await isPresent.save();

    return res.status(200).send({
        status: true,
        message: "Slider content is edited success"
    })

}

const deleteSliderContent = async (req, res) => {
    const { _id } = req.userDetails;
    const {sliderId} = req.query;

    if (!_id) {
        return res.status(400).json({ status: false, message: "Vendor ID is required" });
    }

    const isPresent = await sliderSchema.findOne({ _id:sliderId });

    if (!isPresent) {
        return res.status(404).send({
            status: false,
            message: "Oops! You have no slider content",
        });
    }

    await sliderSchema.findOneAndDelete({ verderId: _id });

    return res.status(200).send({
        status: true,
        message: "Slider content deleted successfully",
    });


}
module.exports = {
    addProducts,
    getProducts,
    updateProduct,
    deleteProduct,
    addSliderContent,
    getSliderContent,
    editSliderContent,
    deleteSliderContent
}