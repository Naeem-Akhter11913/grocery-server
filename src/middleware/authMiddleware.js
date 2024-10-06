const jwt = require('jsonwebtoken'); // If using JWT for token validation
const { SECRET_KEY } = require('../configuration/config');

// Middleware function to protect routes
const authenticateUser = (req, res, next) => {
  // Check if the authToken cookie exists
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }
  
  try {
    // Verify the token (assuming JWT is used)
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticateUser;
