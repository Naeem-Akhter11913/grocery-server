const express = require('express');
const { addProducts, getProducts, updateProduct, deleteProduct, addSliderContent, getSliderContent, editSliderContent, deleteSliderContent, addBlogContent, getBlogContent, updateBlogContent, deleteBlogContent, addComment, getComment, updateComment, deleteComment } = require('../controllers/admin.service.controller');

const asyncHandler = require('../middleware/asyncHandler');
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');
const authorizedUser = require('../middleware/authHandler');
const uploadFiles = require('../middleware/fileUpload');

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


// Blog route
route.post('/blog/add', apiKeyMiddleware, authorizedUser, uploadFiles, asyncHandler(addBlogContent));

route.get('/blog/get', apiKeyMiddleware, authorizedUser, asyncHandler(getBlogContent));

route.put('/blog/update', apiKeyMiddleware, authorizedUser, uploadFiles, asyncHandler(updateBlogContent));

route.delete('/blog/delete', apiKeyMiddleware, authorizedUser, asyncHandler(deleteBlogContent));

module.exports = route;