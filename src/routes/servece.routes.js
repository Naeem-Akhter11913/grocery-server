const express = require('express');
const { addProducts, getProducts, updateProduct, deleteProduct, addSliderContent, getSliderContent, editSliderContent, deleteSliderContent } = require('../controllers/admin.service.controller');
const asyncHandler = require('../middleware/asyncHandler');
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');
const authorizedUser = require('../middleware/authHandler');
const uploadFiles = require('../middleware/fileUpload');
// const multer = require('multer');
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// const uploadFiles = upload.fields([
//     { name: "frontImage", maxCount: 1 },
//     { name: "backImage", maxCount: 1 },
//     { name: "images", maxCount: 10 },
// ]);

const route = express.Router();

route.post('/add', apiKeyMiddleware, authorizedUser, uploadFiles, asyncHandler(addProducts));
route.get('/get', apiKeyMiddleware, authorizedUser, uploadFiles, asyncHandler(getProducts));
route.put('/update', apiKeyMiddleware, authorizedUser, uploadFiles, asyncHandler(updateProduct));
route.delete('/delete', apiKeyMiddleware, authorizedUser, asyncHandler(deleteProduct));



// SLIDER
route.post('/slider/add', apiKeyMiddleware, authorizedUser, uploadFiles, asyncHandler(addSliderContent));

route.get('/slider/get', apiKeyMiddleware, authorizedUser, asyncHandler(getSliderContent));

route.put('/slider/edit', apiKeyMiddleware, authorizedUser, uploadFiles, asyncHandler(editSliderContent));

route.delete('/slider/delete', apiKeyMiddleware, authorizedUser, asyncHandler(deleteSliderContent));


module.exports = route;