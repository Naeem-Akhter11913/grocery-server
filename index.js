require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { PORT } = require('./src/configuration/config');

// database connection
require('./src/database/dbConnectivy')

const allowedOrigins = ["http://localhost:3000", "https://g-admin-u8vf.vercel.app"];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization","apiKey","page", "limit","isadmin"],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies






const userRoute = require('./src/routes/user.routes');
const serviceRoute = require('./src/routes/servece.routes');

const errorHandler = require('./src/middleware/errorHandler');


// set routing

app.use('/api-1.0/naeem-grocery/auth', userRoute);
app.use('/api-1.0/naeem-grocery/product', serviceRoute);

// app.use(saveError)
app.use(errorHandler);

app.use((req,res) =>{
    res.status(200).send({
        status:true,
        message:"This is fallback response please check your endpoints or chaeck your logic"
    })
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
