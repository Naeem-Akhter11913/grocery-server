const mongoose = require('mongoose');
const { MONGODB_URI } = require('../configuration/config');

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => { 
        console.error('Failed to connect to MongoDB', error);
    });
