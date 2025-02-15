const express = require('express');
const { addProducts, getProducts, updateProduct, deleteProduct } = require('../controllers/service.controller');
const asyncHandler = require('../middleware/asyncHandler');
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');
const authorizedUser = require('../middleware/authHandler');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadFiles = upload.fields([
    { name: "frontImg", maxCount: 1 },
    { name: "backImg", maxCount: 1 },
    { name: "imgs", maxCount: 10 },
]);

const route = express.Router();
route.post('/add', apiKeyMiddleware, authorizedUser, uploadFiles, asyncHandler(addProducts));
route.get('/get', apiKeyMiddleware, authorizedUser, uploadFiles, asyncHandler(getProducts));
route.put('/update', apiKeyMiddleware, authorizedUser, uploadFiles, asyncHandler(updateProduct));
route.delete('/delete', apiKeyMiddleware, authorizedUser, asyncHandler(deleteProduct));

module.exports = route;