const logErrorToFile = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  // Log the error
  logErrorToFile(err);

  // Respond with a user-friendly message
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
