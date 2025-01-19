const express = require('express');
const { registerUser, loginUser, logoutUser, updateAddresses, checksError } = require('../controllers/authController');
const asyncHandler = require('../middleware/asyncHandler');

const route = express.Router();


route.post('/register', asyncHandler(registerUser));
route.post('/login', asyncHandler(loginUser));
route.post('/logout', asyncHandler(logoutUser));
route.post('/create-update-address', asyncHandler(updateAddresses));
route.get('/check-error', asyncHandler(checksError));

module.exports = route;