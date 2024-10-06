class CustomError extends Error {
    constructor(message, statusCode) {
        super(message); // Pass the message to the base Error class
        this.statusCode = statusCode; // Assign the HTTP status code
        Error.captureStackTrace(this, this.constructor); // Capture the stack trace for debugging
    }
}

module.exports = CustomError;
