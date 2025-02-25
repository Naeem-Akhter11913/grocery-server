const express = require('express');
const { registerUser, loginUser, logoutUser, updateAddresses, checksError } = require('../controllers/auth.controller');
const asyncHandler = require('../middleware/asyncHandler');
const authorizedUser = require('../middleware/authHandler');

const route = express.Router();


route.post('/register', asyncHandler(registerUser));
route.post('/login', asyncHandler(loginUser));
route.post('/logout', asyncHandler(logoutUser));
route.put('/create-update-address', authorizedUser, asyncHandler(updateAddresses));
route.get('/check-error', asyncHandler(checksError));
// route.get('/refresh', asyncHandler(checksError));

module.exports = route;