const express = require('express');
const { registerUser, loginUser, logoutUser, updateAddresses, checksError, generateReferenceToken } = require('../controllers/auth.controller');
const asyncHandler = require('../middleware/asyncHandler');
const authorizedUser = require('../middleware/authHandler');
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');

const route = express.Router();


route.post('/register', asyncHandler(registerUser));
route.post('/login', asyncHandler(loginUser));
route.post('/logout', apiKeyMiddleware, asyncHandler(logoutUser));
route.put('/create-update-address', apiKeyMiddleware, authorizedUser, asyncHandler(updateAddresses));
route.get('/check-error', apiKeyMiddleware, asyncHandler(checksError));
route.get('/referesh-token', apiKeyMiddleware, asyncHandler(generateReferenceToken));
// route.get('/refresh', asyncHandler(checksError));

module.exports = route;