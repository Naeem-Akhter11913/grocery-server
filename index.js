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


const userRoute = require('./src/routes/user.routes');
const serviceRoute = require('./src/routes/server.routes');
const errorHandler = require('./src/middleware/errorHandler');


// set routing

app.use('/api-1.0/naeem-grocery/user', userRoute);
app.use('/api-1.0/naeem-grocery/product', serviceRoute);

// app.use(saveError)
app.use(errorHandler);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
