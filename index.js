require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { PORT } = require('./src/configuration/config');

// database connection
require('./src/database/dbConnectivy')

const app = express();
// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies


const userAuth = require('./src/routes/userRoutes');
const errorHandler = require('./src/middleware/errorHandler');
// const { saveError } = require('./src/middleware/error_console');


// Secret key for JWT
const SECRET_KEY = 'your_secret_key'; // Change this to a more secure key in production


// set routing

app.use('/api-1.0/naeem-grocery', userAuth);

// app.use(saveError)
app.use(errorHandler);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
