const express = require('express');
const { registerUser, loginUser, logoutUser, updateAddresses, checksError } = require('../controllers/authController');
const asyncHandler = require('../middleware/asyncHandler');
const authorizedUser = require('../middleware/authHandler');

const route = express.Router();


route.post('/user/register', asyncHandler(registerUser));
route.post('/user/login', asyncHandler(loginUser));
route.post('/user/logout', asyncHandler(logoutUser));
route.put('/user/create-update-address', authorizedUser, asyncHandler(updateAddresses));
route.get('/user/check-error', asyncHandler(checksError));

module.exports = route;