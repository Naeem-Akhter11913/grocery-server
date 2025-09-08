const uploadStream = require("../utils/uploadFunctions");
const productModel = require('../models/product.schema');
const sliderSchema = require("../models/slider.schema");
const blogsModel = require("../models/blog.schema");
const { blogValidation } = require("../utils/auth.validation");

const addProducts = async (req, res) => {
    const { _id, name, familyName, email, fullName } = req.userDetails;
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
        tags: tags.split(","),
        life,
        stock,
        description: {
            productDisc,
            typeOfPacking,
            color: color.split(","),
            quantityPerCase,
            ethylAlcohol,
            pieceInOne,
            packagingAndDelivery,
            suggestedUse: suggestedUse.split(","),
            otherIngredients: otherIngredients.split(","),
            warnings: warnings.split(",")
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
            size: size.split(','),
            productColor: productColor.split(",")
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
    // let products = null;
    // if (isadmin === "true") {
    //     products = await productModel.find({ verderId: _id }).skip(skip).limit(limit);
    // } else {
    //     products = await productModel.find().skip(skip).limit(limit);
    // }
    let products = await productModel.find({ verderId: _id }).skip(skip).limit(limit);
    const total = await productModel.countDocuments({ verderId: _id });
    res.status(200).send({
        status: true,
        message: "Prduct fetched success",
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        products,
    })

}

const getSingleProduct = async (req, res) => {
    const { productid } = req.query;

    if (!productid) {
        return res.status(400).send({
            status: false,
            message: "Product ID is required"
        })
    }
    const product = await productModel.findOne({ _id: productid });
    if (!product) {
        return res.status(404).send({
            status: false,
            message: "Product not found"
        })
    }
    res.status(200).send({
        status: true,
        message: "Product fetched success",
        singleProduct: product
    })

}

const updateProduct = async (req, res) => {
    const { _id, name, familyName, email, fullName } = req.userDetails
    const { frontImage, backImage, images } = req.files;
    const { item_id } = req.query;
    const {
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
        productColor,
        imagesHTTPsURL,
        backImageURL,
        frontImageURL
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


    let flipFrontImage = frontImageURL;
    let flipBackImage = backImageURL;
    if (frontImage && Array.isArray(frontImage) && frontImage.length > 0) {
        const imge1Object = frontImage[0];
        flipFrontImage = await uploadStream(imge1Object.buffer, 'frontImage');
    }
    if (backImage && Array.isArray(backImage) && backImage.length > 0) {
        const imge2Object = backImage[0];
        flipBackImage = await uploadStream(imge2Object.buffer, 'backImage');
    }

    let imageUrl = Array.isArray(imagesHTTPsURL) ? [...imagesHTTPsURL] : [imagesHTTPsURL];
    if (Array.isArray(images) && images.length > 0) {
        let newImageUrl = await Promise.all(
            images.map(item => uploadStream(item.buffer, 'product'))
        )
        imageUrl = [...imageUrl, ...newImageUrl]
    }
    const productToSave = {
        productName,
        productType,
        frontImage: flipFrontImage,
        backImage: flipBackImage,
        actualPrice,
        falsePrice,
        images: imageUrl,
        sku,
        mfg,
        tags: tags.split(","),
        life,
        stock,
        description: {
            productDisc,
            typeOfPacking,
            color: color.split(","),
            quantityPerCase,
            ethylAlcohol,
            pieceInOne,
            packagingAndDelivery,
            suggestedUse: suggestedUse.split(","),
            otherIngredients: otherIngredients.split(","),
            warnings: warnings.split(",")
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
            size: size.split(','),
            productColor: productColor.split(",")
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
    const { item_id } = req.query;

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




// Slider
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
        verdorId: _id,
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
    const allSlider = await sliderSchema.findOne({ verdorId: _id });

    return res.status(200).send({
        status: true,
        message: "Here is your content",
        sliderContent: allSlider
    })

}

const editSliderContent = async (req, res) => {
    const { _id } = req.userDetails;

    const { sliderImage } = req.files;
    const { sliderTitle, sliderHeading, sliderImageURL, isShow } = req.body;
    const { sliderid } = req.query;

    const isPresent = await sliderSchema.findOne({ _id: sliderid, isShow: true })

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
    isPresent.sliderTitle = sliderTitle;
    isPresent.sliderHeading = sliderHeading;
    isPresent.isShow = isShow;
    await isPresent.save();

    return res.status(200).send({
        status: true,
        message: "Slider content is edited success"
    })

}

const deleteSliderContent = async (req, res) => {
    const { _id } = req.userDetails;
    const { sliderId } = req.query;

    if (!_id) {
        return res.status(400).json({ status: false, message: "Vendor ID is required" });
    }

    const isPresent = await sliderSchema.findOne({ _id: sliderId });

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

// Blog
const addBlogContent = async (req, res) => {
    const { _id, name, familyName, email, fullName } = req.userDetails;
    const {
        type, mainHeading, image, firstHeading, firstHeadingDesc, secondHeading, secondHeadingFirstDesc, secondHeadingImg, secondHeadingSecDesc, quote, secondHeadingThirdDesc } = req.body

    const { error } = blogValidation.validate(req.body);

    if (error) {
        return res.status(400).send({
            status: false,
            message: error.details[0].message
        });
    }

    let headingImage = null;
    if (req.files.image && Array.isArray(req.files.image) && req.files.image.length > 0) {
        const imge1Object = req.files.image[0];
        headingImage = await uploadStream(imge1Object.buffer, 'image');
    }

    let imageUrl = [];
    if (req.files.secondHeadingImg && Array.isArray(req.files.secondHeadingImg) && req.files.secondHeadingImg.length) {
        imageUrl = await Promise.all(
            req.files.secondHeadingImg.map(item => uploadStream(item.buffer, 'product'))
        )
    }

    const ObjTobeSave = {
        vendorId: _id, type, mainHeading, image: headingImage, firstHeading, firstHeadingDesc, secondHeading, secondHeadingFirstDesc, secondHeadingImg: imageUrl, secondHeadingSecDesc, quote, secondHeadingThirdDesc
    }

    const mongooseInstance = await blogsModel.create(ObjTobeSave);

    await mongooseInstance.save();

    res.status(201).send({
        status: true,
        message: "Blog added Success",
    })
}

const getBlogContent = async (req, res) => {
    const { _id, name, familyName, email, fullName } = req.userDetails
    let { page = 1, pageSize = 10 } = req.query;

    page = parseInt(page);
    pageSize = parseInt(pageSize);

    const skip = (page - 1) * pageSize;

    const blogs = await blogsModel.find({ vendorId: _id, isDeleted: false }).skip(skip).limit(pageSize);

    const total = await blogsModel.countDocuments({ vendorId: _id, isDeleted: false });

    res.status(200).json({
        success: true,
        currentPage: page,
        totalPages: Math.ceil(total / pageSize),
        totalItems: total,
        data: blogs,
    });

}


const updateBlogContent = async (req, res) => {
    const { blogId } = req.query;
    const {
        type, mainHeading, firstHeading, firstHeadingDesc, secondHeading,
        secondHeadingFirstDesc, secondHeadingSecDesc, quote, secondHeadingThirdDesc, imageHTPPSurl, secondHeadingImgHTPPSurl
    } = req.body;

    const blog = await blogsModel.findOne({ _id: blogId });

    if (!blog) {
        return res.status(404).json({
            status: false,
            message: "Blog not found"
        });
    }


    if (type) blog.type = type;
    if (mainHeading) blog.mainHeading = mainHeading;
    if (firstHeading) blog.firstHeading = firstHeading;
    if (firstHeadingDesc) blog.firstHeadingDesc = firstHeadingDesc;
    if (secondHeading) blog.secondHeading = secondHeading;
    if (secondHeadingFirstDesc) blog.secondHeadingFirstDesc = secondHeadingFirstDesc;
    if (secondHeadingSecDesc) blog.secondHeadingSecDesc = secondHeadingSecDesc;
    if (quote) blog.quote = quote;
    if (secondHeadingThirdDesc) blog.secondHeadingThirdDesc = secondHeadingThirdDesc;



    if (secondHeadingImgHTPPSurl) { blog.secondHeadingImg = Array.isArray(secondHeadingImgHTPPSurl) ? secondHeadingImgHTPPSurl : [secondHeadingImgHTPPSurl]; } else {
        blog.secondHeadingImg = [];
    }

    if (imageHTPPSurl) {
        blog.image = imageHTPPSurl;
    } else {
        blog.image = imageHTPPSurl
    }


    if (req.files.image && req.files.image.length > 0) {
        const imgObj = req.files.image[0];
        const uploadedImg = await uploadStream(imgObj.buffer, 'BlogImage');
        blog.image = uploadedImg;
    }

    // Upload and replace secondHeadingImg array if provided
    if (req.files.secondHeadingImg && req.files.secondHeadingImg.length > 0) {
        const uploadedImgs = await Promise.all(
            req.files.secondHeadingImg.map(item => uploadStream(item.buffer, 'BlogArrayImage'))
        );

        const existing = blog.secondHeadingImg || [];
        blog.secondHeadingImg = [...existing, ...uploadedImgs];
    }

    await blog.save();

    return res.status(200).json({
        status: true,
        message: "Blog updated successfully"
    });

}

const deleteBlogContent = async (req, res) => {
    const { _id, name, familyName, email, fullName } = req.userDetails;
    const { blogId } = req.query;

    const blog = await blogsModel.findOne({ _id: blogId });

    if (!blog && Object.keys(blog).length > 0) {
        return res.status(404).json({
            status: false,
            message: "Blog not found"
        });
    }

    await blogsModel.findOneAndDelete({ _id: blogId })

    res.status(200).send({
        status: true,
        message: 'Blog deleted success'
    })
}

const getSingleBlog = async (req, res) => {
    const { blogid } = req.query;

    if (!blogid) {
        return res.status(400).send({
            status: false,
            message: "Blog ID is required"
        })
    }

    const blog = await blogsModel.findOne({ _id: blogid });

    if (!blog) {
        return res.status(404).send({
            status: false,
            message: "Blog not found"
        })
    }
    res.status(200).send({
        status: true,
        message: "Blog fetched success",
        blog
    })
}

// Blog Comment
const addComment = async (req, res) => {

}
const getComment = async (req, res) => {

}
const updateComment = async (req, res) => {

}
const deleteComment = async (req, res) => {

}

module.exports = {
    addProducts,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,

    addSliderContent,
    getSliderContent,
    editSliderContent,
    deleteSliderContent,

    addBlogContent,
    getBlogContent,
    updateBlogContent,
    deleteBlogContent,
    getSingleBlog,

    addComment,
    getComment,
    updateComment,
    deleteComment
}