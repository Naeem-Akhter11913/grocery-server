const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadFiles = upload.fields([
    { name: "frontImage", maxCount: 1 },
    { name: "backImage", maxCount: 1 },
    { name: "sliderImage", maxCount: 1 },
    { name: "images", maxCount: 10 },
    { name: "image", maxCount: 1},
    { name: "secondHeadingImg", maxCount: 10},
]);


module.exports = uploadFiles