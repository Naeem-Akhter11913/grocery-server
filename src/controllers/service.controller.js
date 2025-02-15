const uploadStream = require("../utils/uploadFunctions");
const productModel = require('../models/product.schema');

const addProducts = async (req, res) => {

    const { frontImage, backImage, images } = req.files;
    const { productname, producttype, actualprice, falseprice, sku, mfg, tags, life, stock, productdisc, typeofpacking, color, quantitypercase, ethylalcohol, pieceinone, packaginganddelivery, suggesteduse, otheringredients, warnings, standup, foldedwithoutwheels, foldedwithwheels, doorpassthrough, frame, weightwithoutwheels, weightcapacity, width, handleheight, wheels, seatbackheight, headroominsidecanopy, productcolor, size } = req.body;

    // const { productName,productType,actualPrice,falsePrice,sku,mfg,tags,life,stock,productDisc,typeOfPacking,color,quantityPerCase,ethylAlcohol,pieceInOne,packagingAndDelivery,suggestedUse,otherIngredients,warnings,standUp,foldedWithoutWheels,foldedWithWheels,doorPassThrough,frame,weightWithoutWheels,weightCapacity,width,handleHeight,wheels,seatBackHeight,headRoomInsideCanopy,productColor,size } = req.hearder;



    let flipFrontImage = null;
    let flipBackImage = null;
    if (frontImage && Array.isArray(frontImage) && frontImage.length > 0) {
        const imge1Object = frontImage[0];
        flipFrontImage = await uploadStream(imge1Object.buffer, 'frontImage');
    }
    if (backImage && Array.isArray(backImage) && backImage.length > 0) {
        const imge2Object = backImage[0];
        flipBackImage = await uploadStream(imge2Object.buffer, 'frontImage');
    }

    let imageUrl = [];
    if (images && images.length) {
        imageUrl = await Promise.all(
            images.map(item => uploadStream(item.buffer, 'product'))
        )
    }

    const productToSave = {
        productName: productname,
        productType: producttype,
        frontImage: flipFrontImage,
        backImage: flipBackImage,
        actualPrice: actualprice,
        falsePrice: falseprice,
        images: imageUrl,
        sku,
        mfg,
        tags,
        life,
        stock,
        description: {
            productDisc: productdisc,
            typeOfPacking: typeofpacking,
            color,
            quantityPerCase: quantitypercase,
            ethylAlcohol: ethylalcohol,
            pieceInOne: pieceinone,
            packagingAndDelivery: packaginganddelivery,
            suggestedUse: suggesteduse,
            otherIngredients: otheringredients,
            warnings
        },
        specifications: {
            standUp: standup,
            foldedWithoutWheels: foldedwithoutwheels,
            foldedWithWheels: foldedwithwheels,
            doorPassThrough: doorpassthrough,
            frame,
            weightWithoutWheels: weightwithoutwheels,
            weightCapacity: weightcapacity,
            width,
            handleHeight: handleheight,
            wheels,
            seatBackHeight: seatbackheight,
            headRoomInsideCanopy: headroominsidecanopy,
            color: productcolor,
            size
        }
    }

    const productMongooseInstance = new productModel(productToSave)
    await productMongooseInstance.save();

    res.status(200).send({
        status: true,
        data: imageUrl,
        message: "product added successfully"
    })
}

const getProducts = async (req, res) => {

}

const updateProduct = async (req, res) => {

}

const deleteProduct = async (req, res) => {

}

module.exports = { addProducts, getProducts, updateProduct, deleteProduct }