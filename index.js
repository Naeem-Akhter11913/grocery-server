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
const { saveError } = require('./src/middleware/error_console');


// Secret key for JWT
const SECRET_KEY = 'your_secret_key'; // Change this to a more secure key in production


// set routing

app.use('/api-1.0/naeem-grocery/user', userAuth);

app.get('/', async (req, res) => {

    try { 
        res.status(200).send({
            status: true,
            message: 'Welcome to the Grocery API!',
            data: [ 
                {
                    name: "John", 
                    age: 30, 
                    city: "New York"
                }, 
                {
                    name: "Jane",
                    age: 28,
                    city: "Los Angeles"
                },
                {
                    name: "Mike",
                    age: 32,
                    city: "Chicago"
                },
                {
                    name: "Sarah",
                    age: 25,
                    city: "San Francisco"
                }
            ]
        })
    } catch (error) {
        res.status(500).send({
            status: false, 
            message: error.message
        })
    } 
}); 

app.use(saveError)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
