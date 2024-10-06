const express = require('express');
const { registerUser, loginUser, logoutUser, updateAddresses } = require('../controllers/authController');
const authenticateUser = require('../middleware/authMiddleware');

const route = express.Router();


route.post('/register', registerUser);
route.post('/login', loginUser);
route.post('/logout', authenticateUser, logoutUser);
route.post('/create-update-address', updateAddresses);


module.exports = route;